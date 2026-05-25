import { prisma } from "@/lib/prisma";

export async function getUserEnrollment(userId: string, courseId: string) {
  return await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    include: {
      progress: true,
    },
  });
}

export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  const enrollment = await getUserEnrollment(userId, courseId);
  return !!enrollment && enrollment.status === "ACTIVE";
}

export async function canAccessLesson(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<{ canAccess: boolean; reason?: string }> {
  // Check if user is enrolled
  const isEnrolled = await isUserEnrolled(userId, courseId);
  
  if (!isEnrolled) {
    return { canAccess: false, reason: "not_enrolled" };
  }

  // Get lesson details
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    return { canAccess: false, reason: "lesson_not_found" };
  }

  // Free lessons are always accessible
  if (lesson.isFree && !lesson.isLocked) {
    return { canAccess: true };
  }

  // Premium lessons require enrollment (already checked above)
  if (lesson.isLocked) {
    return { canAccess: false, reason: "lesson_locked" };
  }

  return { canAccess: true };
}

export async function getUserEnrollments(userId: string) {
  return await prisma.enrollment.findMany({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
      progress: true,
    },
  });
}

export async function createEnrollment(userId: string, courseId: string) {
  return await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      status: "ACTIVE",
    },
  });
}

export async function updateLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string
) {
  const enrollment = await getUserEnrollment(userId, courseId);
  
  if (!enrollment) {
    throw new Error("User not enrolled in this course");
  }

  // Get or create progress
  let progress = enrollment.progress;
  
  if (!progress) {
    progress = await prisma.courseProgress.create({
      data: {
        userId,
        courseId,
        enrollmentId: enrollment.id,
        completedLessons: JSON.stringify([lessonId]),
        currentLessonId: lessonId,
        progressPercentage: 1,
        lastAccessedAt: new Date(),
      },
    });
  } else {
    const completedLessons = JSON.parse(progress.completedLessons || "[]");
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    // Get total lessons count
    const totalLessons = await prisma.lesson.count({
      where: { courseId },
    });

    const progressPercentage = Math.round(
      (completedLessons.length / totalLessons) * 100
    );

    progress = await prisma.courseProgress.update({
      where: { id: progress.id },
      data: {
        completedLessons: JSON.stringify(completedLessons),
        currentLessonId: lessonId,
        progressPercentage,
        lastAccessedAt: new Date(),
      },
    });
  }

  return progress;
}
