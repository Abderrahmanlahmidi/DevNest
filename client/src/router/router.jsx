import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Contact from "../content/home/contact";
import NotFound from "../pages/error/notFound";

// dashboard
import Statics from "../content/admin/main/statics.jsx";
import Skills from "../content/admin/skills/skills.jsx";
import Projects from "../content/admin/projects/projects.jsx";
import Competences from "../content/admin/competences/competences.jsx";
import Experiences from "../content/admin/experiences/experiences.jsx";


// protect
import { PrivateRoute } from "../private/privateRoute.jsx";
import { PublicRoute } from "../private/publicRoute.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statics />,
      },
      {
        path:"/dashboard/skills",
        element: <Skills />,
      },
      {
        path:"/dashboard/projects",
        element: <Projects />,
      },
      {
        path:"/dashboard/competences",
        element: <Competences />,
      },
      {
        path:"/dashboard/experiences",
        element: <Experiences />,
      },
    ],
  },
  {
    path: "/ATh7QDtfdodYQxXezXeRmKEoqDP9Qot1TFt/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
