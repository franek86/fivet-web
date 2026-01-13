import { formatPrice } from "@/helpers/priceFormatter";

type PriceProps = {
  amount: number;
  currency: string; // e.g., "USD", "EUR", "JPY"
};

export function Price({ amount, currency }: PriceProps) {
  return <span>{formatPrice(amount, currency)}</span>;
}
