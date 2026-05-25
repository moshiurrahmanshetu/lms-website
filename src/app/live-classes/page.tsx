"use client";

import React, { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LiveClassSchedule from "@/components/live-class/LiveClassSchedule";
import LiveClassCard from "@/components/live-class/LiveClassCard";

// Mock data - replace with Prisma data
const mockLiveClasses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and best practices for building scalable applications.",
    instructor: "Sarah Johnson",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    duration: 90,
    thumbnail: "/live/react-patterns.jpg",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    platform: "google-meet" as const,
    enrolled: true,
    maxCapacity: 100,
    enrolledCount: 78,
    status: "scheduled" as const,
  },
  {
    id: "2",
    title: "Figma Design Workshop",
    description: "Master Figma design system creation and component library management.",
    instructor: "Michael Chen",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    duration: 120,
    thumbnail: "/live/figma-workshop.jpg",
    meetingUrl: "https://zoom.us/j/123456789",
    platform: "zoom" as const,
    enrolled: false,
    maxCapacity: 50,
    enrolledCount: 32,
    status: "scheduled" as const,
  },
  {
    id: "3",
    title: "TypeScript Deep Dive",
    description: "Deep dive into TypeScript advanced types, generics, and type system.",
    instructor: "Emily Davis",
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    duration: 60,
    thumbnail: "/live/typescript-deep-dive.jpg",
    meetingUrl: "https://meet.google.com/xyz-abc-def",
    platform: "google-meet" as const,
    enrolled: false,
    maxCapacity: 75,
    enrolledCount: 45,
    status: "scheduled" as const,
  },
  {
    id: "4",
    title: "Node.js Performance Optimization",
    description: "Learn techniques to optimize Node.js applications for high performance.",
    instructor: "David Wilson",
    scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    duration: 90,
    thumbnail: "/live/nodejs-performance.jpg",
    meetingUrl: "https://zoom.us/j/987654321",
    platform: "zoom" as const,
    enrolled: true,
    maxCapacity: 80,
    enrolledCount: 65,
    status: "completed" as const,
  },
];

export default function LiveClassesPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");

  const filteredClasses = mockLiveClasses.filter((lc) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return lc.status === "scheduled";
    if (filter === "completed") return lc.status === "completed";
    return true;
  });

  const upcomingClasses = mockLiveClasses.filter(
    (lc) => lc.status === "scheduled"
  );

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <Heading level="h1" size="display">
          Live Classes
        </Heading>
        <p className="text-muted-foreground mt-2">
          Join interactive live sessions with expert instructors
        </p>
      </div>

      {/* Featured Upcoming Class */}
      {upcomingClasses.length > 0 && (
        <Card variant="elevated" className="bg-gradient-to-r from-brand/10 to-brand/5 border-brand/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-brand text-brand-foreground text-sm font-medium rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full">
                    Upcoming
                  </span>
                </div>
                <Heading level="h2" size="xl">
                  {upcomingClasses[0].title}
                </Heading>
                <p className="text-muted-foreground">{upcomingClasses[0].description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>👨‍🏫 {upcomingClasses[0].instructor}</span>
                  <span>📅 {new Date(upcomingClasses[0].scheduledAt).toLocaleDateString()}</span>
                  <span>⏰ {new Date(upcomingClasses[0].scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <div className="flex gap-3">
                  {upcomingClasses[0].enrolled ? (
                    <Button variant="brand" size="lg" disabled>
                      Registered
                    </Button>
                  ) : (
                    <Button variant="brand" size="lg">
                      Register Now
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-64 h-48 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-6xl">
                  {upcomingClasses[0].platform === "google-meet" ? "🎥" : "📹"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        <Button
          variant={filter === "upcoming" ? "brand" : "ghost"}
          size="sm"
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant={filter === "completed" ? "brand" : "ghost"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "all" ? "brand" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
      </div>

      {/* Live Classes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredClasses.map((liveClass) => (
          <LiveClassCard key={liveClass.id} {...liveClass} />
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card variant="default">
          <CardContent className="p-12 text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">No Classes Found</h3>
            <p className="text-muted-foreground">
              {filter === "upcoming"
                ? "No upcoming classes scheduled."
                : filter === "completed"
                ? "No completed classes yet."
                : "No classes available."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
