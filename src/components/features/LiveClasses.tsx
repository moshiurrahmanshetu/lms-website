import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { liveClasses } from "@/constants/homepage";

const LiveClasses = () => {
  return (
    <Section size="lg" centered>
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">
          🔴 Live Now
        </div>
        <Heading level="h2" size="xl">
          Upcoming Live Classes
        </Heading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join interactive sessions with expert instructors in real-time
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveClasses.map((liveClass) => (
          <Card key={liveClass.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300">
            {/* Thumbnail Placeholder */}
            <div className="aspect-video bg-secondary rounded-t-lg flex items-center justify-center overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/5 flex items-center justify-center">
                <span className="text-4xl">🎥</span>
              </div>
              <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/70 backdrop-blur px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-white font-medium">Live</span>
              </div>
            </div>

            <CardHeader className="space-y-2">
              <CardTitle className="line-clamp-2 group-hover:text-brand transition-colors">
                {liveClass.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>👤 {liveClass.instructor}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>📅 {liveClass.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>⏰ {liveClass.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">⏱️ {liveClass.duration}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground">
                    {liveClass.enrolled}/{liveClass.capacity}
                  </span>
                  <span className="text-muted-foreground">enrolled</span>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-brand h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(liveClass.enrolled / liveClass.capacity) * 100}%` }}
                ></div>
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="brand" size="sm" className="w-full">
                Register Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          View All Live Classes
        </Button>
      </div>
    </Section>
  );
};

export default LiveClasses;
