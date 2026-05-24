"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleCourses, sampleInstructors } from "@/data/sampleCourses";
import { getCourseBySlug, formatPrice, calculateDiscount, formatDuration, calculateLiveClassEnrollment, formatLiveClassDate, formatLiveClassTime } from "@/lib/helpers/courseHelpers";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = getCourseBySlug(sampleCourses, slug);

  if (!course) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
      </div>
    );
  }

  const instructor = sampleInstructors.find((inst) => inst.id === course.instructorId);
  const upcomingLiveClasses = course.liveClasses?.filter(
    (lc) => lc.status === "scheduled" && new Date(lc.scheduledAt) > new Date()
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-brand bg-brand/10 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-muted-foreground capitalize">{course.level}</span>
                </div>
                <Heading level="h1" size="display">
                  {course.title}
                </Heading>
                {course.subtitle && (
                  <p className="text-xl text-muted-foreground">{course.subtitle}</p>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>👥</span>
                  <span>{course.enrolledCount.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>⏱️</span>
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>📚</span>
                  <span>{course.totalLessons} lessons</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-muted-foreground bg-background border border-border px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky Enrollment Card */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    {course.originalPrice && course.originalPrice > course.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(course.originalPrice)}
                        </span>
                        <span className="text-sm text-success font-medium">
                          {calculateDiscount(course.originalPrice, course.price)}% off
                        </span>
                      </div>
                    )}
                    <div className="text-3xl font-bold text-foreground">
                      {course.isFree ? "Free" : formatPrice(course.price)}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button variant="brand" size="lg" className="w-full">
                      {course.isFree ? "Start Learning Free" : "Enroll Now"}
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Add to Wishlist
                    </Button>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      💬 Contact on WhatsApp
                    </Button>
                  </div>

                  {/* Course Stats */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lessons</span>
                      <span className="font-medium">{course.totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium capitalize">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Language</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <section>
              <Heading level="h2" size="xl" className="mb-6">
                What You'll Learn
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                {course.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-muted-foreground">{objective}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <Heading level="h2" size="xl" className="mb-6">
                Course Content
              </Heading>
              <Card variant="default">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {course.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Lock/Unlock Icon */}
                          <div className="flex-shrink-0">
                            {lesson.isLocked ? (
                              <span className="text-muted-foreground">🔒</span>
                            ) : (
                              <span className="text-success">▶️</span>
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground truncate">
                                {lesson.order}. {lesson.title}
                              </h4>
                              {lesson.isFree && !lesson.isLocked && (
                                <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                  Free
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {lesson.description}
                            </p>
                          </div>

                          {/* Duration */}
                          {lesson.videoDuration && (
                            <span className="text-sm text-muted-foreground flex-shrink-0">
                              {formatDuration(lesson.videoDuration)}
                            </span>
                          )}
                        </div>

                        {/* Preview Button */}
                        {lesson.isFree && !lesson.isLocked && (
                          <Button variant="ghost" size="sm" className="ml-4 flex-shrink-0">
                            Preview
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Requirements */}
            {course.requirements.length > 0 && (
              <section>
                <Heading level="h2" size="xl" className="mb-6">
                  Requirements
                </Heading>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-brand mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Target Audience */}
            {course.targetAudience.length > 0 && (
              <section>
                <Heading level="h2" size="xl" className="mb-6">
                  Who This Course Is For
                </Heading>
                <ul className="space-y-2">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-brand mt-1">•</span>
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Instructor Section */}
            {instructor && (
              <section>
                <Heading level="h2" size="xl" className="mb-6">
                  Your Instructor
                </Heading>
                <Card variant="elevated">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                        {instructor.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-semibold">{instructor.name}</h3>
                        <p className="text-muted-foreground text-sm">{instructor.bio}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-medium">{instructor.averageRating}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {instructor.totalStudents.toLocaleString()} students
                          </div>
                          <div className="text-muted-foreground">{instructor.totalCourses} courses</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {instructor.expertise.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Live Classes Section */}
            {upcomingLiveClasses && upcomingLiveClasses.length > 0 && (
              <section>
                <Heading level="h2" size="xl" className="mb-6">
                  Upcoming Live Classes
                </Heading>
                <div className="space-y-4">
                  {upcomingLiveClasses.map((liveClass) => (
                    <Card key={liveClass.id} variant="elevated">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Thumbnail */}
                          <div className="w-32 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl">🎥</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold">{liveClass.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {liveClass.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>📅 {formatLiveClassDate(liveClass.scheduledAt)}</span>
                              <span>⏰ {formatLiveClassTime(liveClass.scheduledAt)}</span>
                              <span>⏱️ {formatDuration(liveClass.duration)}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <div
                                    className="bg-brand h-2 rounded-full"
                                    style={{ width: `${calculateLiveClassEnrollment(liveClass)}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {liveClass.enrolledCount}/{liveClass.maxCapacity} enrolled
                                </div>
                              </div>
                              <Button variant="brand" size="sm">
                                Register
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Stats Card */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-medium">{course.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{course.enrolledCount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Share This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
