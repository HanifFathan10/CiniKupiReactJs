export const truncateText = (text: string, maxLength: number) => {
  const words = text.split(" ");
  const truncated = words.slice(0, maxLength).join(" ");
  return truncated + (words.length > maxLength ? "..." : "");
};
