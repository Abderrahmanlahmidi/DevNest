export const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Planning":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features user authentication, payment processing, and admin dashboard.",
    technologies: "React, Node.js, MongoDB, Stripe, JWT",
    startDate: "2024-01",
    status: "Completed",
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: "Next.js, TypeScript, Socket.io, PostgreSQL",
    startDate: "2024-03",
    status: "In Progress",
    githubUrl: "https://github.com/username/taskapp",
    liveUrl: "",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    technologies: "Vue.js, Express, OpenWeather API, Chart.js",
    startDate: "2023-11",
    status: "Completed",
    githubUrl: "https://github.com/username/weather-app",
    liveUrl: "https://weather-demo.com",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Portfolio Website",
    description:
      "A minimalist portfolio website built with modern web technologies and optimized for performance and SEO.",
    technologies: "React, Tailwind CSS, Framer Motion, Vite",
    startDate: "2024-02",
    status: "Completed",
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://myname.dev",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Social Media Analytics",
    description:
      "Dashboard for tracking social media metrics and engagement across multiple platforms with customizable reports.",
    technologies: "React, D3.js, Node.js, MySQL",
    startDate: "2024-04",
    status: "In Progress",
    githubUrl: "https://github.com/username/social-analytics",
    liveUrl: "",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Fitness Tracking App",
    description:
      "Mobile-first fitness application with workout planning, progress tracking, and social features.",
    technologies: "React Native, Firebase, Redux, Chart.js",
    startDate: "2023-12",
    status: "Completed",
    githubUrl: "https://github.com/username/fitness-app",
    liveUrl: "https://fitness-app.com",
    image: "/api/placeholder/600/400",
  },
];
