export interface PriceCardProps {
  title: string;
  subtitle?: string;
  price: string;
  billingPeriod?: string;
  features: string[];
  buttonLabel: string;
  highlight?: boolean;
  note?: string;
  link?: string;
}
