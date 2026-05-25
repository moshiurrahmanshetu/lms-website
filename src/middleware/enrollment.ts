import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkLessonAccess, checkCourseAccess } from "@/lib/access-control";
import { requireAuth } from "@/lib/helpers/auth";

export async function requireEnrollment(
  request: NextRequest,
  courseId: string,
  lessonId?: string
) {
  try {
    const user = await requireAuth();

    if (lessonId) {
      const result = await checkLessonAccess(user.id, courseId, lessonId);
      
      if (!result.granted) {
        return NextResponse.redirect(
          new URL(result.redirectUrl || `/courses/${courseId}`, request.url)
        );
      }
    } else {
      const result = await checkCourseAccess(user.id, courseId);
      
      if (!result.granted) {
        return NextResponse.redirect(
          new URL(result.redirectUrl || `/courses/${courseId}`, request.url)
        );
      }
    }

    return null; // Access granted
  } catch (error) {
    // User not authenticated or other error
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
