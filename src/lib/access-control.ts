import { canAccessLesson, isUserEnrolled } from "@/lib/enrollment";

export interface AccessResult {
  granted: boolean;
  reason?: string;
  redirectUrl?: string;
}

export async function checkLessonAccess(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<AccessResult> {
  const result = await canAccessLesson(userId, courseId, lessonId);
  
  if (result.canAccess) {
    return { granted: true };
  }

  // Determine redirect based on reason
  switch (result.reason) {
    case "not_enrolled":
      return {
        granted: false,
        reason: "not_enrolled",
        redirectUrl: `/courses/${courseId}`,
      };
    case "lesson_locked":
      return {
        granted: false,
        reason: "lesson_locked",
        redirectUrl: `/courses/${courseId}`,
      };
    case "lesson_not_found":
      return {
        granted: false,
        reason: "lesson_not_found",
        redirectUrl: "/courses",
      };
    default:
      return {
        granted: false,
        reason: "access_denied",
        redirectUrl: "/courses",
      };
  }
}

export async function checkCourseAccess(
  userId: string,
  courseId: string
): Promise<AccessResult> {
  const enrolled = await isUserEnrolled(userId, courseId);
  
  if (enrolled) {
    return { granted: true };
  }

  return {
    granted: false,
    reason: "not_enrolled",
    redirectUrl: `/courses/${courseId}`,
  };
}

export async function requireLessonAccess(
  userId: string,
  courseId: string,
  lessonId: string
): Promise<void> {
  const result = await checkLessonAccess(userId, courseId, lessonId);
  
  if (!result.granted) {
    throw new Error(result.reason || "Access denied");
  }
}

export async function requireCourseAccess(
  userId: string,
  courseId: string
): Promise<void> {
  const result = await checkCourseAccess(userId, courseId);
  
  if (!result.granted) {
    throw new Error(result.reason || "Access denied");
  }
}
