"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date | string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate);
    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  const hasTimeLeft = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  if (!hasTimeLeft) {
    return (
      <div className="text-sm text-muted-foreground">
        Class starting soon...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {timeLeft.days > 0 && (
        <div className="flex items-center gap-1">
          <span className="bg-brand/10 text-brand px-2 py-1 rounded font-medium">
            {formatTime(timeLeft.days)}d
          </span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <span className="bg-brand/10 text-brand px-2 py-1 rounded font-medium">
          {formatTime(timeLeft.hours)}h
        </span>
        <span className="bg-brand/10 text-brand px-2 py-1 rounded font-medium">
          {formatTime(timeLeft.minutes)}m
        </span>
        <span className="bg-brand/10 text-brand px-2 py-1 rounded font-medium">
          {formatTime(timeLeft.seconds)}s
        </span>
      </div>
    </div>
  );
}
