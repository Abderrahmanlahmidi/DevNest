import { createBrowserRouter} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Contact from "../content/home/contact";
import NotFound from "../pages/error/notFound";
import {PrivateRoute} from "../private/privateRoute.jsx";
import {PublicRoute} from "../private/publicRoute.jsx";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
    {
        path:"/ATh7QDtfdodYQxXezXeRmKEoqDP9Qot1TFt/login", 
        element:(
          <PublicRoute>
              <Login/>
          </PublicRoute>
        )

    },
    {
        path:"/contact", 
        element:<Contact/>
    },
    {
        path:"*",
        element:<NotFound />
    }
])