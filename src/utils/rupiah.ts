export const rupiah = (number?: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    compactDisplay: "short",
  }).format(number ?? 0);
};
