import { getUserEnrollment, isUserEnrolled, canAccessLesson } from "@/lib/enrollment";

export async function getEnrollmentStatus(userId: string, courseId: string) {
  const enrollment = await getUserEnrollment(userId, courseId);
  
  if (!enrollment) {
    return {
      enrolled: false,
      status: null,
      progress: null,
    };
  }

  return {
    enrolled: true,
    status: enrollment.status,
    progress: enrollment.progress,
  };
}

export async function getAccessibleLessons(userId: string, courseId: string) {
  const { prisma } = await import("@/lib/prisma");
  
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  });

  const enrolled = await isUserEnrolled(userId, courseId);

  return lessons.map((lesson) => ({
    ...lesson,
    accessible: lesson.isFree || enrolled,
  }));
}

export async function getNextAccessibleLesson(
  userId: string,
  courseId: string,
  currentLessonId: string
) {
  const { prisma } = await import("@/lib/prisma");
  
  const currentLesson = await prisma.lesson.findUnique({
    where: { id: currentLessonId },
  });

  if (!currentLesson) {
    return null;
  }

  const nextLesson = await prisma.lesson.findFirst({
    where: {
      courseId,
      order: {
        gt: currentLesson.order,
      },
    },
    orderBy: { order: "asc" },
  });

  if (!nextLesson) {
    return null;
  }

  const canAccess = await canAccessLesson(userId, courseId, nextLesson.id);

  return canAccess.canAccess ? nextLesson : null;
}

export async function getCourseProgress(userId: string, courseId: string) {
  const enrollment = await getUserEnrollment(userId, courseId);
  
  if (!enrollment || !enrollment.progress) {
    return {
      completedLessons: [],
      currentLessonId: null,
      progressPercentage: 0,
      totalLessons: 0,
    };
  }

  const { prisma } = await import("@/lib/prisma");
  const totalLessons = await prisma.lesson.count({
    where: { courseId },
  });

  return {
    completedLessons: JSON.parse(enrollment.progress.completedLessons || "[]"),
    currentLessonId: enrollment.progress.currentLessonId,
    progressPercentage: enrollment.progress.progressPercentage,
    totalLessons,
  };
}
