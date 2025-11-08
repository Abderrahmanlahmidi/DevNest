export const handleDate = (date) => {
  return new Date(Number(date)).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
