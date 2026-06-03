import React from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getPublishedCourses, getCourseCategories } from "@/lib/queries/course-queries";
import { formatPrice, formatDuration } from "@/lib/helpers/courseHelpers";
import CoursesFilter from "@/components/courses/CoursesFilter";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  const categories = await getCourseCategories();

  return <CoursesFilter initialCourses={courses} categories={categories} />;
}
