import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { element } from "prop-types";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Ride from "../pages/Ride/Ride";
import NotFound from "../pages/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[

            {

                index:true,
                element: <Home/>,
            },
            {
                path:'/about',
                element: <About/>,
            },

            {
                path:'/contact',
                element:<Contact/>,
            },

            {
                path:'/ride',
                element: <Ride/>,
            },

            {
                path:'*',
                element:<NotFound/>,
            }

        ]
    }
])

export default router;