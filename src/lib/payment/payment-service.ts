import { prisma } from "@/lib/prisma";
import { PaymentGateway, PaymentMethod, PaymentStatus } from "@prisma/client";
import type {
  PaymentRequest,
  PaymentResponse,
  PaymentCallback,
} from "@/types/payment";

export class PaymentService {
  /**
   * Create a new payment record
   */
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Validate request
      if (!request.enrollmentId && !request.liveClassEnrollmentId) {
        return {
          success: false,
          error: "Either enrollmentId or liveClassEnrollmentId is required",
        };
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          userId: request.userId,
          enrollmentId: request.enrollmentId,
          liveClassEnrollmentId: request.liveClassEnrollmentId,
          amount: request.amount,
          currency: request.currency || "BDT",
          paymentMethod: request.paymentMethod,
          paymentGateway: request.paymentGateway,
          status: PaymentStatus.PENDING,
        },
      });

      // Get gateway payment URL
      const gatewayService = this.getGatewayService(request.paymentGateway);
      const gatewayResponse = await gatewayService.createPayment({
        amount: request.amount,
        currency: request.currency || "BDT",
        orderId: payment.id,
        customerName: "", // Will be fetched from user
        customerEmail: "", // Will be fetched from user
        customerPhone: "", // Will be fetched from user
        returnUrl: request.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        cancelUrl: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        metadata: {
          paymentId: payment.id,
          userId: request.userId,
        },
      });

      if (!gatewayResponse.success) {
        // Update payment status to failed
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            failedAt: new Date(),
          },
        });

        return {
          success: false,
          error: gatewayResponse.error,
        };
      }

      // Update payment with transaction ID
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          transactionId: gatewayResponse.transactionId,
          status: PaymentStatus.PROCESSING,
        },
      });

      return {
        success: true,
        paymentId: payment.id,
        paymentUrl: gatewayResponse.paymentUrl,
        transactionId: gatewayResponse.transactionId,
      };
    } catch (error) {
      console.error("Payment creation error:", error);
      return {
        success: false,
        error: "Failed to create payment",
      };
    }
  }

  /**
   * Handle payment callback from gateway
   */
  async handlePaymentCallback(callback: PaymentCallback): Promise<boolean> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: callback.paymentId },
        include: {
          enrollment: true,
          liveClassEnrollment: true,
        },
      });

      if (!payment) {
        console.error("Payment not found:", callback.paymentId);
        return false;
      }

      // Verify payment with gateway
      const gatewayService = this.getGatewayService(payment.paymentGateway);
      const verification = await gatewayService.verifyPayment({
        transactionId: callback.transactionId,
        amount: Number(payment.amount),
      });

      if (!verification.success) {
        // Update payment status to failed
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            failedAt: new Date(),
            gatewayResponse: JSON.stringify(callback.gatewayResponse),
          },
        });

        return false;
      }

      // Update payment status to completed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: verification.status,
          paidAt: new Date(),
          gatewayResponse: JSON.stringify(callback.gatewayResponse),
        },
      });

      // Activate enrollment if payment is successful
      if (verification.status === PaymentStatus.COMPLETED) {
        await this.activateEnrollment(payment.id);
      }

      return true;
    } catch (error) {
      console.error("Payment callback error:", error);
      return false;
    }
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string) {
    return await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        enrollment: {
          include: {
            course: true,
          },
        },
        liveClassEnrollment: {
          include: {
            liveClass: true,
          },
        },
      },
    });
  }

  /**
   * Get user payments
   */
  async getUserPayments(userId: string) {
    return await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
        liveClassEnrollment: {
          include: {
            liveClass: true,
          },
        },
      },
    });
  }

  /**
   * Activate enrollment after successful payment
   */
  private async activateEnrollment(paymentId: string): Promise<void> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Activate course enrollment
    if (payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: {
          status: "ACTIVE",
        },
      });
    }

    // Activate live class enrollment
    if (payment.liveClassEnrollmentId) {
      await prisma.liveClassEnrollment.update({
        where: { id: payment.liveClassEnrollmentId },
        data: {
          enrolledAt: new Date(),
        },
      });
    }
  }

  /**
   * Get gateway service based on payment gateway
   */
  private getGatewayService(gateway: PaymentGateway) {
    switch (gateway) {
      case PaymentGateway.BKASH:
        // Will be implemented with bKash integration
        throw new Error("bKash gateway not yet implemented");
      case PaymentGateway.SSLCOMMERZ:
        // Will be implemented with SSLCommerz integration
        throw new Error("SSLCommerz gateway not yet implemented");
      case PaymentGateway.STRIPE:
        // Will be implemented with Stripe integration
        throw new Error("Stripe gateway not yet implemented");
      case PaymentGateway.MANUAL:
        // Manual payment processing
        return new ManualGatewayService();
      default:
        throw new Error("Unsupported payment gateway");
    }
  }
}

/**
 * Manual gateway service for testing and manual payments
 */
class ManualGatewayService {
  async createPayment(request: any) {
    return {
      success: true,
      paymentUrl: undefined,
      transactionId: `MANUAL-${Date.now()}`,
      error: undefined,
    };
  }

  async verifyPayment(request: any) {
    return {
      success: true,
      status: PaymentStatus.COMPLETED,
      transactionId: request.transactionId,
      error: undefined,
    };
  }
}

export const paymentService = new PaymentService();
