import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredCourses } from "@/constants/homepage";

const FeaturedCourses = () => {
  return (
    <Section size="lg" centered>
      <div className="text-center space-y-4 mb-12">
        <Heading level="h2" size="xl">
          Featured Courses
        </Heading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our most popular courses handpicked by our expert instructors
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <Card key={course.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300">
            {/* Thumbnail Placeholder */}
            <div className="aspect-video bg-secondary rounded-t-lg flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
            </div>

            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-brand bg-brand/10 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-muted-foreground">{course.level}</span>
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-brand transition-colors">
                {course.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{course.rating}</span>
                </div>
                <span className="text-muted-foreground">{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>👤 {course.instructor}</span>
                <span>⏱️ {course.duration}</span>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4">
              <div className="text-2xl font-bold text-foreground">
                ${course.price}
              </div>
              <Button variant="brand" size="sm">
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          View All Courses
        </Button>
      </div>
    </Section>
  );
};

export default FeaturedCourses;
