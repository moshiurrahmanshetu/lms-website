"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { sampleCourses } from "@/data/sampleCourses";
import { formatPrice, formatDuration, calculateCourseProgress } from "@/lib/helpers/courseHelpers";

export default function DashboardPage() {
  // Mock enrolled courses with progress
  const enrolledCourses = sampleCourses.slice(0, 2).map((course) => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    completedLessons: Math.floor(Math.random() * course.totalLessons),
  }));

  // Mock upcoming live classes
  const upcomingLiveClasses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      date: "Dec 15, 2024",
      time: "2:00 PM EST",
      thumbnail: "/live/react-patterns.jpg",
      enrolled: true,
    },
    {
      id: "2",
      title: "Figma Design Workshop",
      instructor: "Michael Chen",
      date: "Dec 18, 2024",
      time: "11:00 AM EST",
      thumbnail: "/live/figma-workshop.jpg",
      enrolled: false,
    },
  ];

  // Mock certificates
  const certificates = [
    {
      id: "1",
      courseTitle: "Web Development Fundamentals",
      issuedDate: "Nov 15, 2024",
      certificateUrl: "/certificates/web-dev.pdf",
    },
  ];

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div>
          <Heading level="h1" size="display">
            Welcome back, John! 👋
          </Heading>
          <p className="text-muted-foreground mt-2">
            Continue your learning journey. You're making great progress!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="text-3xl font-bold mt-1">{enrolledCourses.length}</p>
                </div>
                <div className="text-4xl">📚</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold mt-1">1</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours Learned</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <div className="text-4xl">⏱️</div>
              </div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-3xl font-bold mt-1">{certificates.length}</p>
                </div>
                <div className="text-4xl">🏆</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Heading level="h2" size="xl">
              Continue Learning
            </Heading>
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-32 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl">📚</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-brand transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {course.instructor?.name}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-brand h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button variant="brand" size="sm" className="w-full">
                        Continue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Live Classes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Heading level="h2" size="xl">
              Upcoming Live Classes
            </Heading>
            <Button variant="outline" size="sm">
              View Schedule
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingLiveClasses.map((liveClass) => (
              <Card key={liveClass.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-32 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-4xl">🎥</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-brand transition-colors">
                        {liveClass.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {liveClass.instructor}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>📅 {liveClass.date}</span>
                        <span>⏰ {liveClass.time}</span>
                      </div>
                      <Button
                        variant={liveClass.enrolled ? "outline" : "brand"}
                        size="sm"
                        className="w-full"
                      >
                        {liveClass.enrolled ? "Registered" : "Register Now"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <Heading level="h2" size="xl">
                Your Certificates
              </Heading>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-light rounded-lg flex items-center justify-center text-white text-2xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{certificates[0].courseTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        Issued on {certificates[0].issuedDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
