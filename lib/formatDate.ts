export const formatMonthYear = (
  dateInput: string | Date | undefined,
  short: boolean = false
) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: short ? "numeric" : "long", // "12" vs "December"
    year: "numeric",
  }).format(date);
};
