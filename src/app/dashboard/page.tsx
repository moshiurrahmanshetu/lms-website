import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getUserEnrollments, getUserUpcomingLiveClasses, getUserCertificates, getUserDashboardStats, getUserProfile } from "@/lib/queries/course-queries";
import { formatDuration } from "@/lib/helpers/courseHelpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-muted-foreground">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const [enrollments, upcomingLiveClasses, certificates, stats, user] = await Promise.all([
    getUserEnrollments(userId),
    getUserUpcomingLiveClasses(userId),
    getUserCertificates(userId),
    getUserDashboardStats(userId),
    getUserProfile(userId),
  ]);

  const userName = user?.name || "User";

  return (
    <DashboardShell>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div>
          <Heading level="h1" size="display">
            Welcome back, {userName}! 👋
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
                  <p className="text-3xl font-bold mt-1">{stats.enrolledCourses}</p>
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
                  <p className="text-3xl font-bold mt-1">{stats.completedCourses}</p>
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
                  <p className="text-3xl font-bold mt-1">{stats.hoursLearned}</p>
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
                  <p className="text-3xl font-bold mt-1">{stats.certificates}</p>
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
            {enrollments.slice(0, 4).map((enrollment) => {
              const course = enrollment.course;
              const progress = enrollment.progress?.progressPercentage || 0;
              
              return (
                <Card key={enrollment.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300">
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
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-brand h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
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
              );
            })}
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
            {upcomingLiveClasses.slice(0, 4).map((liveClass) => {
              const isEnrolled = liveClass.enrollments.length > 0;
              const date = new Date(liveClass.scheduledAt);
              const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
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
                          {liveClass.course.instructor.name}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>📅 {date.toLocaleDateString()}</span>
                          <span>⏰ {time}</span>
                        </div>
                        <Button
                          variant={isEnrolled ? "outline" : "brand"}
                          size="sm"
                          className="w-full"
                        >
                          {isEnrolled ? "Registered" : "Register Now"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
                      <h3 className="font-semibold text-lg">{certificates[0].course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Issued on {new Date(certificates[0].issuedAt).toLocaleDateString()}
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
