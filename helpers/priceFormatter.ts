export function formatPrice(amount: number, currency: string = "USD", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol", // can be 'narrowSymbol', 'code', 'name'
  }).format(amount);
}
