import { createBrowserRouter} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Contact from "../content/home/contact";
import NotFound from "../pages/error/notFound";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/ATh7QDtfdodYQxXezXeRmKEoqDP9Qot1TFt/login", 
        element:<Login/>
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