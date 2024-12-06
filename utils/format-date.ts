const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date
    .toLocaleDateString("en-US", options)
    .toUpperCase()
    .replace(/ ,/g, "-"); // Replace spaces with hyphens
};
export default formatDate;
