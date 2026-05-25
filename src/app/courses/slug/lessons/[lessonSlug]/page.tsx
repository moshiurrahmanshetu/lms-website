import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canAccessLesson } from "@/lib/enrollment";
import LessonViewerClient from "@/app/courses/slug/lessons/[lessonSlug]/LessonViewerClient";

export default async function LessonViewerPage({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      lessons: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course) {
    redirect("/courses");
  }

  const lesson = course.lessons.find((l) => l.slug === params.lessonSlug);

  if (!lesson) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <p className="text-muted-foreground">The lesson you're looking for doesn't exist.</p>
      </div>
    );
  }

  const accessResult = await canAccessLesson(session.user.id, course.id, lesson.id);

  return (
    <LessonViewerClient
      course={course}
      lesson={lesson}
      canAccess={accessResult.canAccess}
      accessReason={accessResult.reason}
      userId={session.user.id}
    />
  );
}
