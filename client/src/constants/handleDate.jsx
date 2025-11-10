export const handleDate = (date) => {
  return new Date(Number(date)).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


export const convertTimestampToInputDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
