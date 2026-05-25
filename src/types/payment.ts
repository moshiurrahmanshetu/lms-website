import { PaymentGateway, PaymentMethod, PaymentStatus } from "@prisma/client";

export interface PaymentRequest {
  userId: string;
  amount: number;
  currency?: string;
  paymentMethod: PaymentMethod;
  paymentGateway: PaymentGateway;
  enrollmentId?: string;
  liveClassEnrollmentId?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export interface PaymentCallback {
  paymentId: string;
  transactionId: string;
  status: PaymentStatus;
  gatewayResponse?: any;
}

export interface GatewayConfig {
  apiKey: string;
  apiSecret: string;
  isSandbox: boolean;
  merchantId?: string;
  storeId?: string;
}

export interface GatewayPaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
}

export interface GatewayPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export interface GatewayVerificationRequest {
  transactionId: string;
  amount: number;
}

export interface GatewayVerificationResponse {
  success: boolean;
  status: PaymentStatus;
  transactionId: string;
  gatewayResponse?: any;
}
