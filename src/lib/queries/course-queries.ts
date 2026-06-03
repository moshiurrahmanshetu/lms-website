import { prisma } from "@/lib/prisma";
import { Course, Lesson, User, LiveClass } from "@prisma/client";

export type CourseWithInstructor = Omit<Course, 'price' | 'originalPrice'> & {
  instructor: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
  };
  lessons: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    order: number;
    isFree: boolean;
    isLocked: boolean;
    videoDuration: number | null;
  }>;
  liveClasses: Array<{
    id: string;
    title: string;
    description: string;
    scheduledAt: Date;
    duration: number;
    enrolledCount: number;
    maxCapacity: number;
  }>;
  price: number;
  originalPrice: number | null;
};

export type LessonWithResources = Lesson & {
  resources: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
    size: bigint | null;
  }>;
};

export type EnrollmentWithCourse = {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  expiresAt: Date | null;
  status: string;
  completedAt: Date | null;
  course: Omit<Course, 'price' | 'originalPrice'> & {
    instructor: {
      id: string;
      name: string | null;
      email: string;
      avatar: string | null;
    };
    lessons: Array<{
      id: string;
      slug: string;
      title: string;
      order: number;
    }>;
    price: number;
    originalPrice: number | null;
  };
  progress?: {
    progressPercentage: number;
    lastAccessedAt: Date;
  };
};

export type LiveClassWithEnrollment = LiveClass & {
  course: {
    title: string;
    instructor: {
      name: string | null;
    };
  };
  enrollments: Array<{
    userId: string;
  }>;
};

/**
 * Get all published courses
 */
export async function getPublishedCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        lessons: {
          where: {
            isFree: true,
          },
          select: {
            id: true,
            slug: true,
            title: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
          take: 3,
        },
        liveClasses: {
          where: {
            status: 'SCHEDULED',
          },
          select: {
            id: true,
            title: true,
            scheduledAt: true,
            duration: true,
          },
          take: 2,
          orderBy: {
            scheduledAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert Decimal to number
    return courses.map(course => ({
      ...course,
      price: Number(course.price),
      originalPrice: course.originalPrice ? Number(course.originalPrice) : null,
    })) as CourseWithInstructor[];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

/**
 * Get course by slug
 */
export async function getCourseBySlug(slug: string): Promise<CourseWithInstructor | null> {
  try {
    const course = await prisma.course.findUnique({
      where: {
        slug,
        published: true,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        lessons: {
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            order: true,
            isFree: true,
            isLocked: true,
            videoDuration: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        liveClasses: {
          where: {
            status: {
              in: ['SCHEDULED', 'LIVE'],
            },
          },
          orderBy: {
            scheduledAt: 'asc',
          },
        },
      },
    });

    if (!course) return null;

    // Convert Decimal to number
    return {
      ...course,
      price: Number(course.price),
      originalPrice: course.originalPrice ? Number(course.originalPrice) : null,
    } as CourseWithInstructor;
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return null;
  }
}

/**
 * Get lesson by course slug and lesson slug
 */
export async function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  try {
    const lesson = await prisma.lesson.findFirst({
      where: {
        slug: lessonSlug,
        course: {
          slug: courseSlug,
        },
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
            lessons: {
              select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                order: true,
                isFree: true,
                isLocked: true,
                videoDuration: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        resources: {
          select: {
            id: true,
            title: true,
            url: true,
            type: true,
            size: true,
          },
        },
      },
    });

    return lesson;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}

/**
 * Get all lessons for a course
 */
export async function getCourseLessons(courseSlug: string) {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        course: {
          slug: courseSlug,
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        order: true,
        isFree: true,
        isLocked: true,
        videoDuration: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return lessons;
  } catch (error) {
    console.error("Error fetching course lessons:", error);
    return [];
  }
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true,
        featured: true,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert Decimal to number
    return courses.map(course => ({
      ...course,
      price: Number(course.price),
      originalPrice: course.originalPrice ? Number(course.originalPrice) : null,
    })) as CourseWithInstructor[];
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }
}

/**
 * Search courses
 */
export async function searchCourses(params: {
  query?: string;
  category?: string;
  level?: string;
}) {
  try {
    const where: any = {
      published: true,
    };

    if (params.query) {
      where.OR = [
        { title: { contains: params.query, mode: 'insensitive' } },
        { description: { contains: params.query, mode: 'insensitive' } },
        { tags: { contains: params.query, mode: 'insensitive' } },
      ];
    }

    if (params.category && params.category !== 'all') {
      where.category = params.category;
    }

    if (params.level && params.level !== 'all') {
      where.level = params.level.toUpperCase();
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert Decimal to number
    return courses.map(course => ({
      ...course,
      price: Number(course.price),
      originalPrice: course.originalPrice ? Number(course.originalPrice) : null,
    })) as CourseWithInstructor[];
  } catch (error) {
    console.error("Error searching courses:", error);
    return [];
  }
}

/**
 * Get course categories
 */
export async function getCourseCategories() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true,
      },
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    const categories = courses.map((c) => c.category);
    return categories;
  } catch (error) {
    console.error("Error fetching course categories:", error);
    return [];
  }
}

/**
 * Get user's enrolled courses with progress
 */
export async function getUserEnrollments(userId: string) {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
            lessons: {
              select: {
                id: true,
                slug: true,
                title: true,
                order: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        progress: true,
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    // Convert Decimal to number for courses
    return enrollments.map(enrollment => ({
      ...enrollment,
      course: {
        ...enrollment.course,
        price: Number(enrollment.course.price),
        originalPrice: enrollment.course.originalPrice ? Number(enrollment.course.originalPrice) : null,
      },
    })) as EnrollmentWithCourse[];
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    return [];
  }
}

/**
 * Get user's upcoming live classes
 */
export async function getUserUpcomingLiveClasses(userId: string) {
  try {
    const now = new Date();
    const liveClasses = await prisma.liveClass.findMany({
      where: {
        scheduledAt: {
          gte: now,
        },
        status: {
          in: ['SCHEDULED', 'LIVE'],
        },
      },
      include: {
        course: {
          select: {
            title: true,
            instructor: {
              select: {
                name: true,
              },
            },
          },
        },
        enrollments: {
          where: {
            userId,
          },
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
      take: 10,
    });

    return liveClasses as LiveClassWithEnrollment[];
  } catch (error) {
    console.error("Error fetching upcoming live classes:", error);
    return [];
  }
}

/**
 * Get user's certificates count
 */
export async function getUserCertificatesCount(userId: string) {
  try {
    const count = await prisma.certificate.count({
      where: {
        userId,
      },
    });

    return count;
  } catch (error) {
    console.error("Error fetching certificates count:", error);
    return 0;
  }
}

/**
 * Get user's certificates
 */
export async function getUserCertificates(userId: string) {
  try {
    const certificates = await prisma.certificate.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        issuedAt: 'desc',
      },
    });

    return certificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

/**
 * Get user profile information
 */
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/**
 * Get user dashboard statistics
 */
export async function getUserDashboardStats(userId: string) {
  try {
    const [enrollments, certificates, completedEnrollments] = await Promise.all([
      prisma.enrollment.count({
        where: { userId },
      }),
      prisma.certificate.count({
        where: { userId },
      }),
      prisma.enrollment.count({
        where: {
          userId,
          completedAt: {
            not: null,
          },
        },
      }),
    ]);

    // Calculate total hours learned (sum of course durations for enrolled courses)
    const enrollmentsWithCourses = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            duration: true,
          },
        },
      },
    });

    const totalHours = enrollmentsWithCourses.reduce(
      (acc, enrollment) => acc + (enrollment.course.duration / 60),
      0
    );

    return {
      enrolledCourses: enrollments,
      completedCourses: completedEnrollments,
      certificates,
      hoursLearned: Math.round(totalHours),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      enrolledCourses: 0,
      completedCourses: 0,
      certificates: 0,
      hoursLearned: 0,
    };
  }
}
