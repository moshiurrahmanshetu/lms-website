"use client";

import React, { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CountdownTimer from "@/components/live-class/CountdownTimer";

interface LiveClassCardProps {
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

const platformIcons = {
  "google-meet": "🎥",
  zoom: "📹",
};

export default function LiveClassCard({
  id,
  title,
  description,
  instructor,
  scheduledAt,
  duration,
  thumbnail,
  meetingUrl,
  platform,
  enrolled,
  maxCapacity,
  enrolledCount,
  status,
}: LiveClassCardProps) {
  const [isLive, setIsLive] = useState(status === "live");
  const scheduledDate = new Date(scheduledAt);
  const now = new Date();
  const isPast = scheduledDate < now;

  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const scheduledDate = new Date(scheduledAt);
      const endTime = new Date(scheduledDate.getTime() + duration * 60000);
      
      if (now >= scheduledDate && now <= endTime) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [scheduledAt, duration]);

  const enrollmentPercentage = Math.round((enrolledCount / maxCapacity) * 100);

  return (
    <Card variant="elevated" className="group hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-32 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">{platformIcons[platform]}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-brand transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{instructor}</p>
              </div>
              {isLive && (
                <span className="flex-shrink-0 px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>📅 {scheduledDate.toLocaleDateString()}</span>
              <span>⏰ {scheduledDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              <span>⏱️ {duration} min</span>
            </div>

            {/* Countdown for upcoming classes */}
            {!isPast && status === "scheduled" && (
              <div className="pt-2">
                <CountdownTimer targetDate={scheduledAt} />
              </div>
            )}

            {/* Enrollment Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {enrolledCount}/{maxCapacity} enrolled
                </span>
                <span className="font-medium">{enrollmentPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-brand h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrollmentPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              {isLive && enrolled && meetingUrl ? (
                <a
                  href={meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="brand" size="sm" className="w-full">
                    Join Now
                  </Button>
                </a>
              ) : enrolled ? (
                <Button variant="outline" size="sm" className="w-full" disabled>
                  {isPast ? "Class Ended" : "Registered"}
                </Button>
              ) : (
                <Button variant="brand" size="sm" className="w-full">
                  Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
