import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiPython, 
  SiMongodb, 
  SiAmazoncloudwatch,
  SiGit, 
  SiDocker 
} from 'react-icons/si';
import { 
  FiCode, 
  FiSmartphone, 
  FiServer, 
  FiLayers,
  FiCloud
} from 'react-icons/fi';



export const getIcon = (iconName) => {
  const baseClasses = "text-2xl";
  
  switch (iconName) {
    case "JavaScript":
      return <SiJavascript className={`${baseClasses} text-yellow-500`} />;
    case "React":
      return <SiReact className={`${baseClasses} text-cyan-500`} />;
    case "Node":
      return <SiNodedotjs className={`${baseClasses} text-green-600`} />;
    case "TypeScript":
      return <SiTypescript className={`${baseClasses} text-blue-600`} />;
    case "Python":
      return <SiPython className={`${baseClasses} text-blue-500`} />;
    case "MongoDB":
      return <SiMongodb className={`${baseClasses} text-green-500`} />;
    case "AWS":
      return <FiCloud className={`${baseClasses} text-orange-500`} />;
    case "Git":
      return <SiGit className={`${baseClasses} text-orange-600`} />;
    case "Docker":
      return <SiDocker className={`${baseClasses} text-blue-400`} />;
    case "Responsive Design":
      return <FiSmartphone className={`${baseClasses} text-purple-500`} />;
    case "RESTful APIs":
      return <FiServer className={`${baseClasses} text-emerald-500`} />;
    case "UI/UX Design":
      return <FiLayers className={`${baseClasses} text-pink-500`} />;
    default:
      return <FiCode className={`${baseClasses} text-gray-500`} />;
  }
};



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

export const getCategoryColor = (category) => {
  switch (category) {
    case "Frontend":
      return "text-blue-600";
    case "Backend":
      return "text-green-600";
    case "Database":
      return "text-orange-600";
    case "Cloud":
      return "text-purple-600";
    case "DevOps":
      return "text-red-600";
    case "Design":
      return "text-pink-600";
    default:
      return "text-gray-600";
  }
};

