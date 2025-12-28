import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import Analiyes from "@/pages/Analiyes";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
   { 
    // element : <App/>,
    Component: App,
    path: "/",
    children: [
        {
        Component: About,
        path: "about"
        }
    ]
    },
    {
        Component: AdminLayout,
        path: "/admin",
        children : [
            {
                Component: Analiyes,
                path: "analiyes"
            }
        ]
    },
    {
        Component: Login,
        path: "/login"       
    },
    {
        Component: Register,
        path: "/register"       
    },
    {
        Component: Verify,
        path: "/verify"       
    }
])