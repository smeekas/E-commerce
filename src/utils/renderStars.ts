export function renderStars(rating: number) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}