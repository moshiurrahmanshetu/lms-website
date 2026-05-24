// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "instructor" | "admin";
  avatar?: string;
  createdAt: Date;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  thumbnail?: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  price: number;
  enrolledCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

// Lesson types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isPreview: boolean;
}

// Enrollment types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number; // 0-100
  enrolledAt: Date;
  completedAt?: Date;
}

// Progress types
export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
}
