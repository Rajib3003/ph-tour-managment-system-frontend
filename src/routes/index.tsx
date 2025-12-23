import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import Analiyes from "@/pages/Analiyes";
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
    }
])