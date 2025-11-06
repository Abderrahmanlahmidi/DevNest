import { FiCode, FiDatabase, FiCloud, FiLayers, FiSmartphone, FiServer, FiUsers, FiTool } from 'react-icons/fi';

export const getLevelColor = (level) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-blue-100 text-blue-800";
    case "Advanced":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getCategoryIcon = (category) => {
  switch (category) {
    case "Development":
      return <FiCode className="text-2xl" />;
    case "Database":
      return <FiDatabase className="text-2xl" />;
    case "DevOps":
      return <FiCloud className="text-2xl" />;
    case "Design":
      return <FiLayers className="text-2xl" />;
    case "Soft Skills":
      return <FiUsers className="text-2xl" />;
    default:
      return <FiTool className="text-2xl" />;
  }
};

export const getCategoryColor = (category) => {
  switch (category) {
    case "Development":
      return "text-blue-600";
    case "Database":
      return "text-green-600";
    case "DevOps":
      return "text-purple-600";
    case "Design":
      return "text-pink-600";
    case "Soft Skills":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};
