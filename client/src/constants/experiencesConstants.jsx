export const getTypeColor = (type) => {
  switch (type) {
    case "Full-time":
      return "bg-blue-100 text-blue-800";
    case "Part-time":
      return "bg-green-100 text-green-800";
    case "Internship":
      return "bg-purple-100 text-purple-800";
    case "Freelance":
      return "bg-orange-100 text-orange-800";
    case "Education":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDate = (dateString) => {
  if (dateString === "Present") return "Present";
  const date = new Date(dateString + "-01");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
