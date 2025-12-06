// Formatting stars count for better readability

export const formatStars = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(2)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(2)}k`;
  }
  return count.toString();
};