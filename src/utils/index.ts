export function FormatCurrency(amount: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function toBoolean(str: string) {
  return str.toLowerCase() === "true";
}
