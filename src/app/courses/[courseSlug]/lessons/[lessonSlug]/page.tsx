"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleCourses } from "@/data/sampleCourses";
import { getCourseBySlug, getLessonBySlug, getNextLesson, getPreviousLesson, formatDuration } from "@/lib/helpers/courseHelpers";

export default function LessonViewerPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseSlug as string;
  const lessonSlug = params.lessonSlug as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const course = getCourseBySlug(sampleCourses, courseSlug);
  const lesson = course ? getLessonBySlug(course, lessonSlug) : undefined;

  if (!course || !lesson) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <p className="text-muted-foreground">The lesson you're looking for doesn't exist.</p>
      </div>
    );
  }

  const nextLesson = getNextLesson(course, lesson.id);
  const previousLesson = getPreviousLesson(course, lesson.id);
  const isLocked = lesson.isLocked;
  const isFree = lesson.isFree;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-border bg-background">
        <div className="container py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "✕ Close" : "☰ Lessons"}
          </Button>
          <Heading level="h2" size="md" className="truncate flex-1 mx-4">
            {lesson.title}
          </Heading>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background">
            <div className="container py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="mb-4"
              >
                ✕ Close
              </Button>
              <LessonList
                course={course}
                currentLessonId={lesson.id}
                onLessonClick={(lessonSlug) => {
                  router.push(`/courses/${courseSlug}/lessons/${lessonSlug}`);
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r border-border bg-background">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <LessonList
              course={course}
              currentLessonId={lesson.id}
              onLessonClick={(lessonSlug) =>
                router.push(`/courses/${courseSlug}/lessons/${lessonSlug}`)
              }
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player Section */}
          <div className="bg-black aspect-video flex items-center justify-center">
            {isLocked ? (
              <div className="text-center text-white space-y-4 p-8">
                <div className="text-6xl">🔒</div>
                <h3 className="text-2xl font-semibold">Lesson Locked</h3>
                <p className="text-gray-400 max-w-md">
                  This lesson is part of the premium content. Enroll in the course to unlock all lessons.
                </p>
                <Button variant="brand" size="lg">
                  Enroll Now to Unlock
                </Button>
              </div>
            ) : (
              <div className="text-center text-white space-y-4">
                <div className="text-6xl">▶️</div>
                <h3 className="text-2xl font-semibold">Video Player</h3>
                <p className="text-gray-400">
                  {lesson.videoUrl ? "Video content would play here" : "No video available"}
                </p>
                {lesson.videoDuration && (
                  <p className="text-gray-400">Duration: {formatDuration(lesson.videoDuration)}</p>
                )}
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="container py-8 max-w-4xl">
            <div className="space-y-6">
              {/* Lesson Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isFree && !isLocked && (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Lesson {lesson.order} of {course.totalLessons}
                  </span>
                </div>
                <Heading level="h1" size="xl">
                  {lesson.title}
                </Heading>
                <p className="text-muted-foreground mt-2">{lesson.description}</p>
              </div>

              {/* Lesson Content Body */}
              {lesson.content && !isLocked && (
                <Card variant="default">
                  <CardContent className="p-6">
                    <div className="prose prose-invert max-w-none">
                      <p>{lesson.content}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resources */}
              {lesson.resources && lesson.resources.length > 0 && !isLocked && (
                <Card variant="default">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Lesson Resources</h3>
                    <div className="space-y-3">
                      {lesson.resources.map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {resource.type === "pdf" ? "📄" : resource.type === "code" ? "💻" : "🔗"}
                            </span>
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              {resource.size && (
                                <div className="text-sm text-muted-foreground">
                                  {(resource.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex-1">
                  {previousLesson && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/courses/${courseSlug}/lessons/${previousLesson.slug}`)
                      }
                      disabled={isLocked}
                    >
                      ← Previous Lesson
                    </Button>
                  )}
                </div>
                <div className="flex-1 flex justify-end">
                  {nextLesson && (
                    <Button
                      variant={nextLesson.isLocked ? "outline" : "brand"}
                      onClick={() =>
                        router.push(`/courses/${courseSlug}/lessons/${nextLesson.slug}`)
                      }
                      disabled={isLocked}
                    >
                      {nextLesson.isLocked ? "🔒 Locked" : "Next Lesson →"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lesson List Component
function LessonList({
  course,
  currentLessonId,
  onLessonClick,
}: {
  course: any;
  currentLessonId: string;
  onLessonClick: (slug: string) => void;
}) {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between mb-4">
        <Heading level="h3" size="md">
          Course Content
        </Heading>
        <span className="text-sm text-muted-foreground">
          {course.lessons.length} lessons
        </span>
      </div>
      <div className="space-y-1">
        {course.lessons.map((lesson: any) => {
          const isActive = lesson.id === currentLessonId;
          const isLocked = lesson.isLocked;
          const isFree = lesson.isFree;

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && onLessonClick(lesson.slug)}
              disabled={isLocked}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-brand text-brand-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isLocked ? (
                    <span>🔒</span>
                  ) : isActive ? (
                    <span>▶️</span>
                  ) : (
                    <span>○</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{lesson.order}. {lesson.title}</span>
                    {isFree && !isLocked && (
                      <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded flex-shrink-0">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-80 truncate">{lesson.description}</p>
                  {lesson.videoDuration && (
                    <p className="text-xs opacity-60 mt-1">
                      {formatDuration(lesson.videoDuration)}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
