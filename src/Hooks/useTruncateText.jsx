export const truncateText = (text, maxLength) => {
  const words = text.split(" ");
  const truncated = words.slice(0, maxLength).join(" ");
  return truncated + (words.length > maxLength ? "..." : "");
};
