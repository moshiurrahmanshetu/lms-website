import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export class EnrollmentActivationService {
  /**
   * Activate course enrollment after successful payment
   */
  async activateCourseEnrollment(paymentId: string): Promise<boolean> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          enrollment: true,
        },
      });

      if (!payment || !payment.enrollmentId || !payment.enrollment) {
        console.error("Payment or enrollment not found");
        return false;
      }

      // Update enrollment status to ACTIVE
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: {
          status: "ACTIVE",
        },
      });

      // Create course progress entry
      const existingProgress = await prisma.courseProgress.findUnique({
        where: {
          userId_courseId: {
            userId: payment.userId,
            courseId: payment.enrollment.courseId,
          },
        },
      });

      if (!existingProgress) {
        await prisma.courseProgress.create({
          data: {
            userId: payment.userId,
            courseId: payment.enrollment.courseId,
            enrollmentId: payment.enrollmentId,
            completedLessons: "[]",
            progressPercentage: 0,
            lastAccessedAt: new Date(),
          },
        });
      }

      return true;
    } catch (error) {
      console.error("Course enrollment activation error:", error);
      return false;
    }
  }

  /**
   * Activate live class enrollment after successful payment
   */
  async activateLiveClassEnrollment(paymentId: string): Promise<boolean> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          liveClassEnrollment: true,
        },
      });

      if (!payment || !payment.liveClassEnrollmentId || !payment.liveClassEnrollment) {
        console.error("Payment or live class enrollment not found");
        return false;
      }

      // Update live class enrollment
      await prisma.liveClassEnrollment.update({
        where: { id: payment.liveClassEnrollmentId },
        data: {
          enrolledAt: new Date(),
        },
      });

      // Increment live class enrolled count
      await prisma.liveClass.update({
        where: { id: payment.liveClassEnrollment.liveClassId },
        data: {
          enrolledCount: {
            increment: 1,
          },
        },
      });

      return true;
    } catch (error) {
      console.error("Live class enrollment activation error:", error);
      return false;
    }
  }

  /**
   * Deactivate enrollment on payment failure
   */
  async deactivateEnrollment(paymentId: string): Promise<boolean> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        console.error("Payment not found");
        return false;
      }

      // Deactivate course enrollment if exists
      if (payment.enrollmentId) {
        await prisma.enrollment.update({
          where: { id: payment.enrollmentId },
          data: {
            status: "CANCELLED",
          },
        });
      }

      // Delete live class enrollment if exists
      if (payment.liveClassEnrollmentId) {
        await prisma.liveClassEnrollment.delete({
          where: { id: payment.liveClassEnrollmentId },
        });
      }

      return true;
    } catch (error) {
      console.error("Enrollment deactivation error:", error);
      return false;
    }
  }

  /**
   * Retry failed payment activation
   */
  async retryFailedActivation(paymentId: string): Promise<boolean> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment || payment.status !== PaymentStatus.COMPLETED) {
        console.error("Payment not found or not completed");
        return false;
      }

      // Check if enrollment is already active
      if (payment.enrollmentId) {
        const enrollment = await prisma.enrollment.findUnique({
          where: { id: payment.enrollmentId },
        });

        if (enrollment && enrollment.status === "ACTIVE") {
          return true; // Already active
        }

        return await this.activateCourseEnrollment(paymentId);
      }

      if (payment.liveClassEnrollmentId) {
        const liveClassEnrollment = await prisma.liveClassEnrollment.findUnique({
          where: { id: payment.liveClassEnrollmentId },
        });

        if (liveClassEnrollment && liveClassEnrollment.enrolledAt) {
          return true; // Already active
        }

        return await this.activateLiveClassEnrollment(paymentId);
      }

      return false;
    } catch (error) {
      console.error("Retry activation error:", error);
      return false;
    }
  }

  /**
   * Check enrollment status
   */
  async checkEnrollmentStatus(enrollmentId: string): Promise<{
    isActive: boolean;
    status: string;
  }> {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return { isActive: false, status: "NOT_FOUND" };
    }

    return {
      isActive: enrollment.status === "ACTIVE",
      status: enrollment.status,
    };
  }
}

export const enrollmentActivationService = new EnrollmentActivationService();
