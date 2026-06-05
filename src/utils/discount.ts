export function getDiscountedValue(price: number, discount: number) {
  return (price * (1 - discount / 100)).toFixed(2);
}
