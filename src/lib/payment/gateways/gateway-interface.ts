import type {
  GatewayConfig,
  GatewayPaymentRequest,
  GatewayPaymentResponse,
  GatewayVerificationRequest,
  GatewayVerificationResponse,
} from "@/types/payment";

/**
 * Base interface for all payment gateways
 */
export abstract class PaymentGateway {
  protected config: GatewayConfig;

  constructor(config: GatewayConfig) {
    this.config = config;
  }

  /**
   * Create a payment and return payment URL
   */
  abstract createPayment(
    request: GatewayPaymentRequest
  ): Promise<GatewayPaymentResponse>;

  /**
   * Verify payment status
   */
  abstract verifyPayment(
    request: GatewayVerificationRequest
  ): Promise<GatewayVerificationResponse>;

  /**
   * Process webhook callback
   */
  abstract processWebhook(data: any): Promise<{
    success: boolean;
    transactionId: string;
    status: string;
  }>;

  /**
   * Refund payment
   */
  abstract refundPayment(transactionId: string, amount?: number): Promise<{
    success: boolean;
    refundId?: string;
    error?: string;
  }>;

  /**
   * Get gateway name
   */
  abstract getGatewayName(): string;
}

/**
 * bKash Gateway Interface
 * Future implementation for bKash payment integration
 */
export class BkashGateway extends PaymentGateway {
  async createPayment(
    request: GatewayPaymentRequest
  ): Promise<GatewayPaymentResponse> {
    // TODO: Implement bKash payment creation
    // 1. Get bKash access token
    // 2. Create payment with bKash API
    // 3. Return payment URL

    return {
      success: false,
      error: "bKash gateway not yet implemented",
    };
  }

  async verifyPayment(
    request: GatewayVerificationRequest
  ): Promise<GatewayVerificationResponse> {
    // TODO: Implement bKash payment verification
    // 1. Call bKash execute API
    // 2. Verify payment status
    // 3. Return verification result

    return {
      success: false,
      status: "FAILED",
      transactionId: request.transactionId,
    };
  }

  async processWebhook(data: any): Promise<{
    success: boolean;
    transactionId: string;
    status: string;
  }> {
    // TODO: Implement bKash webhook processing
    return {
      success: false,
      transactionId: "",
      status: "FAILED",
    };
  }

  async refundPayment(transactionId: string, amount?: number): Promise<{
    success: boolean;
    refundId?: string;
    error?: string;
  }> {
    // TODO: Implement bKash refund
    return {
      success: false,
      error: "bKash refund not yet implemented",
    };
  }

  getGatewayName(): string {
    return "bKash";
  }
}

/**
 * SSLCommerz Gateway Interface
 * Future implementation for SSLCommerz payment integration
 */
export class SSLCommerzGateway extends PaymentGateway {
  async createPayment(
    request: GatewayPaymentRequest
  ): Promise<GatewayPaymentResponse> {
    // TODO: Implement SSLCommerz payment creation
    // 1. Create session with SSLCommerz API
    // 2. Get payment URL
    // 3. Return payment URL

    return {
      success: false,
      error: "SSLCommerz gateway not yet implemented",
    };
  }

  async verifyPayment(
    request: GatewayVerificationRequest
  ): Promise<GatewayVerificationResponse> {
    // TODO: Implement SSLCommerz payment verification
    // 1. Call SSLCommerz validation API
    // 2. Verify IPN signature
    // 3. Return verification result

    return {
      success: false,
      status: "FAILED",
      transactionId: request.transactionId,
    };
  }

  async processWebhook(data: any): Promise<{
    success: boolean;
    transactionId: string;
    status: string;
  }> {
    // TODO: Implement SSLCommerz IPN processing
    return {
      success: false,
      transactionId: "",
      status: "FAILED",
    };
  }

  async refundPayment(transactionId: string, amount?: number): Promise<{
    success: boolean;
    refundId?: string;
    error?: string;
  }> {
    // TODO: Implement SSLCommerz refund
    return {
      success: false,
      error: "SSLCommerz refund not yet implemented",
    };
  }

  getGatewayName(): string {
    return "SSLCommerz";
  }
}

/**
 * Gateway Factory
 * Factory pattern to create gateway instances
 */
export class GatewayFactory {
  static createGateway(
    gateway: string,
    config: GatewayConfig
  ): PaymentGateway {
    switch (gateway) {
      case "BKASH":
        return new BkashGateway(config);
      case "SSLCOMMERZ":
        return new SSLCommerzGateway(config);
      default:
        throw new Error(`Unsupported gateway: ${gateway}`);
    }
  }

  static getGatewayConfig(gateway: string): GatewayConfig {
    const envPrefix = gateway.toUpperCase();

    return {
      apiKey: process.env[`${envPrefix}_API_KEY`] || "",
      apiSecret: process.env[`${envPrefix}_API_SECRET`] || "",
      isSandbox: process.env[`${envPrefix}_SANDBOX`] === "true",
      merchantId: process.env[`${envPrefix}_MERCHANT_ID`],
      storeId: process.env[`${envPrefix}_STORE_ID`],
    };
  }
}
