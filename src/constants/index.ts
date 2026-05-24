// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
  },
  COURSES: {
    LIST: "/api/courses",
    DETAIL: (id: string) => `/api/courses/${id}`,
    CREATE: "/api/courses",
    UPDATE: (id: string) => `/api/courses/${id}`,
    DELETE: (id: string) => `/api/courses/${id}`,
  },
  LESSONS: {
    LIST: (courseId: string) => `/api/courses/${courseId}/lessons`,
    DETAIL: (id: string) => `/api/lessons/${id}`,
  },
  ENROLLMENTS: {
    LIST: "/api/enrollments",
    CREATE: "/api/enrollments",
    PROGRESS: (id: string) => `/api/enrollments/${id}/progress`,
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Course categories
export const COURSE_CATEGORIES = [
  "Programming",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
  "Personal Development",
  "Photography",
  "Music",
] as const;

// Course levels
export const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

// User roles
export const USER_ROLES = ["student", "instructor", "admin"] as const;
