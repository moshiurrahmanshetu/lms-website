// Course-related types for the LMS platform

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  totalStudents: number;
  averageRating: number;
  totalCourses: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  description: string;
  content?: string; // Rich text content
  videoUrl?: string;
  videoDuration?: number; // in seconds
  thumbnail?: string;
  order: number;
  isFree: boolean;
  isLocked: boolean;
  resources?: LessonResource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonResource {
  id: string;
  title: string;
  url: string;
  type: "pdf" | "code" | "link" | "other";
  size?: number; // in bytes
}

export interface LiveClass {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  description: string;
  instructorId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  thumbnail?: string;
  meetingUrl?: string;
  recordingUrl?: string;
  maxCapacity: number;
  enrolledCount: number;
  status: "scheduled" | "live" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  instructorId: string;
  instructor?: Instructor;
  category: string;
  tags: string[];
  level: "beginner" | "intermediate" | "advanced";
  language: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  duration: number; // total course duration in minutes
  totalLessons: number;
  totalHours: number;
  lessons: Lesson[];
  liveClasses?: LiveClass[];
  requirements: string[];
  learningObjectives: string[];
  targetAudience: string[];
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  completedLessons: string[]; // Array of lesson IDs
  currentLessonId?: string;
  progressPercentage: number; // 0-100
  lastAccessedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  expiresAt?: Date;
  status: "active" | "completed" | "expired" | "cancelled";
  progress?: CourseProgress;
  certificate?: {
    issuedAt: Date;
    certificateUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
