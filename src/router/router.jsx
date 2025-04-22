import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { element } from "prop-types";
import Home from "../pages/Home/Home";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[

            path:index,
            element: <Home/>

        ]
    }
])