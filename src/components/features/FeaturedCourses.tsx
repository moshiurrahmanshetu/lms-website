"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/helpers/courseHelpers";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  level: string;
  price: number;
  rating: number;
  enrolledCount: number;
  duration: number;
  instructor: {
    name: string | null;
  };
}

interface FeaturedCoursesProps {
  courses: Course[];
}

const FeaturedCourses = ({ courses }: FeaturedCoursesProps) => {
  return (
    <section className="section-py">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2 variants={staggerItem} className="text-h2 text-foreground">
            Featured Courses
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Explore our most popular courses handpicked by our expert instructors
          </motion.p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <motion.div key={course.id} variants={staggerItem}>
              <Card
                variant="glass"
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-100 to-violet-100 dark:from-slate-800 dark:to-slate-700">
                  <Image
                    src={course.thumbnail || "/img/developer.jpg"}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-brand-600 dark:text-brand-400 shadow-sm">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-foreground shadow-sm capitalize">
                      {course.level}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolledCount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.instructor.name || 'Instructor'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(course.duration)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Price</span>
                    <span className="text-2xl font-bold text-foreground">{formatPrice(course.price)}</span>
                  </div>
                  <Button
                    variant="brand-gradient"
                    size="sm"
                    className="shadow-lg shadow-brand-500/25 group-hover:shadow-xl group-hover:shadow-brand-500/30 transition-all"
                  >
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            View All Courses
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
