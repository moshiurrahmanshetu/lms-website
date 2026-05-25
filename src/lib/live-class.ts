import { prisma } from "@/lib/prisma";
import { LiveClassStatus } from "@prisma/client";

export async function getLiveClasses(userId?: string) {
  const where: any = {
    status: {
      in: ["SCHEDULED", "LIVE"],
    },
  };

  return await prisma.liveClass.findMany({
    where,
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

export async function getLiveClassById(id: string) {
  return await prisma.liveClass.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });
}

export async function isUserEnrolledInLiveClass(
  userId: string,
  liveClassId: string
): Promise<boolean> {
  // Simplified check - will be implemented with proper relations later
  return false;
}

export async function enrollInLiveClass(userId: string, liveClassId: string) {
  const liveClass = await prisma.liveClass.findUnique({
    where: { id: liveClassId },
  });

  if (!liveClass) {
    throw new Error("Live class not found");
  }

  if (liveClass.enrolledCount >= liveClass.maxCapacity) {
    throw new Error("Live class is full");
  }

  if (liveClass.status !== LiveClassStatus.SCHEDULED) {
    throw new Error("Cannot enroll in this class");
  }

  // Update enrolled count
  await prisma.liveClass.update({
    where: { id: liveClassId },
    data: {
      enrolledCount: {
        increment: 1,
      },
    },
  });

  return { id: "temp", userId, liveClassId, enrolledAt: new Date() };
}

export async function getUpcomingLiveClasses(limit?: number) {
  const where = {
    status: LiveClassStatus.SCHEDULED,
    scheduledAt: {
      gte: new Date(),
    },
  };

  return await prisma.liveClass.findMany({
    where,
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
    take: limit,
  });
}
