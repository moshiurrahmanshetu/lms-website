"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sampleCourses } from "@/data/sampleCourses";
import { formatPrice, calculateDiscount, formatDuration } from "@/lib/helpers/courseHelpers";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(sampleCourses.map((course) => course.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return sampleCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <Heading level="h1" size="display">
          Explore Courses
        </Heading>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive library of courses taught by industry experts
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search courses by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "brand" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedLevel === "all" ? "brand" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("all")}
            >
              All Levels
            </Button>
            <Button
              variant={selectedLevel === "beginner" ? "brand" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("beginner")}
            >
              Beginner
            </Button>
            <Button
              variant={selectedLevel === "intermediate" ? "brand" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("intermediate")}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedLevel === "advanced" ? "brand" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel("advanced")}
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center text-muted-foreground">
          {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} variant="elevated" className="group hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Thumbnail */}
            <div className="aspect-video bg-secondary rounded-t-lg overflow-hidden relative">
              <Image
                src={course.thumbnail || "/img/developer.jpg"}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              {course.featured && (
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-brand/90 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-xs text-white font-medium">⭐ Featured</span>
                </div>
              )}
            </div>

            <CardHeader className="space-y-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-brand bg-brand/10 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-muted-foreground capitalize">{course.level}</span>
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-brand transition-colors">
                {course.title}
              </CardTitle>
              {course.subtitle && (
                <p className="text-sm text-muted-foreground line-clamp-1">{course.subtitle}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-3 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviewCount})</span>
                </div>
                <span className="text-muted-foreground">{course.enrolledCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>👤 {course.instructor?.name}</span>
                <span>⏱️ {formatDuration(course.duration)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 flex-shrink-0">
              <div className="flex flex-col">
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
                <div className="text-2xl font-bold text-foreground">
                  {course.isFree ? "Free" : formatPrice(course.price)}
                </div>
              </div>
              <Button variant="brand" size="sm">
                {course.isFree ? "Start Free" : "Enroll Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
