import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLessonBySlug } from "@/lib/queries/course-queries";
import { formatDuration } from "@/lib/helpers/courseHelpers";
import { notFound } from "next/navigation";
import LessonViewer from "@/components/lessons/LessonViewer";

export default async function LessonViewerPage({
  params,
}: {
  params: { slug: string; lessonSlug: string };
}) {
  const lesson = await getLessonBySlug(params.slug, params.lessonSlug);

  if (!lesson) {
    notFound();
  }

  const course = lesson.course as any;
  const lessons = course.lessons || [];

  // Calculate next and previous lessons
  const currentIndex = lessons.findIndex((l: any) => l.id === lesson.id);
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  return (
    <LessonViewer
      lesson={{
        ...lesson,
        content: lesson.content || "",
        videoUrl: lesson.videoUrl || "",
      }}
      course={course}
      lessons={lessons}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
      courseSlug={params.slug}
    />
  );
}
