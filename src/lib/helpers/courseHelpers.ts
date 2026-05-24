import { Course, Lesson, LiveClass, CourseProgress } from "@/types/course";

// Format duration in minutes to human-readable format
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

// Format price to currency
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Get free lessons from a course
export function getFreeLessons(course: Course): Lesson[] {
  return course.lessons.filter((lesson) => lesson.isFree && !lesson.isLocked);
}

// Get locked lessons from a course
export function getLockedLessons(course: Course): Lesson[] {
  return course.lessons.filter((lesson) => !lesson.isFree || lesson.isLocked);
}

// Get lesson by slug
export function getLessonBySlug(course: Course, slug: string): Lesson | undefined {
  return course.lessons.find((lesson) => lesson.slug === slug);
}

// Get next lesson in course
export function getNextLesson(course: Course, currentLessonId: string): Lesson | undefined {
  const currentIndex = course.lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === course.lessons.length - 1) {
    return undefined;
  }
  return course.lessons[currentIndex + 1];
}

// Get previous lesson in course
export function getPreviousLesson(course: Course, currentLessonId: string): Lesson | undefined {
  const currentIndex = course.lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return course.lessons[currentIndex - 1];
}

// Calculate course progress percentage
export function calculateCourseProgress(course: Course, completedLessonIds: string[]): number {
  if (course.lessons.length === 0) return 0;
  const completedCount = completedLessonIds.length;
  return Math.round((completedCount / course.lessons.length) * 100);
}

// Check if lesson is accessible (free or enrolled)
export function isLessonAccessible(
  lesson: Lesson,
  isEnrolled: boolean = false
): boolean {
  return lesson.isFree || isEnrolled;
}

// Get course by slug
export function getCourseBySlug(courses: Course[], slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

// Filter courses by category
export function filterCoursesByCategory(courses: Course[], category: string): Course[] {
  return courses.filter((course) => course.category.toLowerCase() === category.toLowerCase());
}

// Filter courses by level
export function filterCoursesByLevel(courses: Course[], level: string): Course[] {
  return courses.filter((course) => course.level === level);
}

// Filter courses by price (free or paid)
export function filterCoursesByPrice(courses: Course[], isFree: boolean): Course[] {
  return courses.filter((course) => course.isFree === isFree);
}

// Search courses by query
export function searchCourses(courses: Course[], query: string): Course[] {
  const lowerQuery = query.toLowerCase();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      course.instructor?.name.toLowerCase().includes(lowerQuery)
  );
}

// Sort courses by rating
export function sortCoursesByRating(courses: Course[], descending: boolean = true): Course[] {
  return [...courses].sort((a, b) =>
    descending ? b.rating - a.rating : a.rating - b.rating
  );
}

// Sort courses by enrollment count
export function sortCoursesByEnrollment(courses: Course[], descending: boolean = true): Course[] {
  return [...courses].sort((a, b) =>
    descending ? b.enrolledCount - a.enrolledCount : a.enrolledCount - b.enrolledCount
  );
}

// Sort courses by price
export function sortCoursesByPrice(courses: Course[], ascending: boolean = true): Course[] {
  return [...courses].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price
  );
}

// Sort courses by newest
export function sortCoursesByNewest(courses: Course[]): Course[] {
  return [...courses].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Get upcoming live classes
export function getUpcomingLiveClasses(course: Course): LiveClass[] {
  const now = new Date();
  return (course.liveClasses || []).filter(
    (liveClass) => liveClass.scheduledAt > now && liveClass.status === "scheduled"
  );
}

// Get live class by slug
export function getLiveClassBySlug(course: Course, slug: string): LiveClass | undefined {
  return (course.liveClasses || []).find((liveClass) => liveClass.slug === slug);
}

// Format live class date
export function formatLiveClassDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Format live class time
export function formatLiveClassTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

// Check if live class is currently live
export function isLiveClassNow(liveClass: LiveClass): boolean {
  const now = new Date();
  const startTime = liveClass.scheduledAt;
  const endTime = new Date(startTime.getTime() + liveClass.duration * 60000);
  return now >= startTime && now <= endTime && liveClass.status === "live";
}

// Calculate live class enrollment percentage
export function calculateLiveClassEnrollment(liveClass: LiveClass): number {
  return Math.round((liveClass.enrolledCount / liveClass.maxCapacity) * 100);
}

// Generate course URL
export function getCourseUrl(slug: string): string {
  return `/courses/${slug}`;
}

// Generate lesson URL
export function getLessonUrl(courseSlug: string, lessonSlug: string): string {
  return `/courses/${courseSlug}/lessons/${lessonSlug}`;
}

// Generate instructor URL
export function getInstructorUrl(slug: string): string {
  return `/instructors/${slug}`;
}

// Validate course slug format
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
