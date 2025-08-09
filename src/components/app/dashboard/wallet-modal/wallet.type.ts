export enum PaymentMethodTypeE {
  CARD = "CARD",
  PAYPAL = "PAYPAL",
}

export enum CardIssuerE {
  VISA = "VISA",
  MASTER_CARD = "MASTER_CARD",
  AMERICAN_EXPRESS = "AMERICAN_EXPRESS",
}

export type PaymentMethodI = {
  type: PaymentMethodTypeE;
  name: string;
  cardType?: CardIssuerE;
  reference: string;
  expirationDate?: Date;
  isDefault: boolean;
}