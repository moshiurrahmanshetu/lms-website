"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import LiveClassCard from "./LiveClassCard";

interface LiveClass {
  id: string;
  title: string;
  description: string;
  instructor: string;
  scheduledAt: string;
  duration: number;
  thumbnail?: string;
  meetingUrl?: string;
  platform: "google-meet" | "zoom";
  enrolled: boolean;
  maxCapacity: number;
  enrolledCount: number;
  status: "scheduled" | "live" | "completed" | "cancelled";
}

interface LiveClassScheduleProps {
  liveClasses: LiveClass[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function LiveClassSchedule({
  liveClasses,
  title = "Upcoming Live Classes",
  showViewAll = true,
  viewAllLink = "/live-classes",
}: LiveClassScheduleProps) {
  // Filter for upcoming and live classes
  const upcomingClasses = liveClasses.filter(
    (lc) => lc.status === "scheduled" || lc.status === "live"
  );

  if (upcomingClasses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📅</div>
        <h3 className="text-lg font-semibold mb-2">No Upcoming Classes</h3>
        <p className="text-muted-foreground">
          Check back later for new live class schedules.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading level="h2" size="xl">
          {title}
        </Heading>
        {showViewAll && (
          <a href={viewAllLink}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {upcomingClasses.map((liveClass) => (
          <LiveClassCard key={liveClass.id} {...liveClass} />
        ))}
      </div>
    </div>
  );
}
