// import { createBrowserRouter } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
// import { element } from "prop-types";
// import Home from "../pages/Home/Home";
// import About from "../pages/About/About";
// import Contact from "../pages/Contact/Contact";
// import RideBooking from "../pages/Ride/RideBooking";
// import NotFound from "../pages/NotFound/NotFound";
// import Signup from "../pages/Signup/Signup";
// import Login from "../pages/Login/Login";


// const router = createBrowserRouter([
//     {
//         path:"/",
//         element:<Layout/>,
//         children:[

//             {

//                 index:true,
//                 element: <Home/>,
//             },
//             {
//                 path:'/about',
//                 element: <About/>,
//             },

//             {
//                 path:'/contact',
//                 element:<Contact/>,
//             },

            

//             {
//                 path:'*',
//                 element:<NotFound/>,
//             }

//         ]
//     },

//     {
//         path:'/signup',
//         element:<Signup/>
//     },
//     {
//         path:'/login',
//         element:<Login/>
//     },
//     {
//         path:'/ride',
//         element: <RideBooking/>,
//     },
// ])

// export default router;



// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import RideBooking from "../pages/Ride/RideBooking";
import NotFound from "../pages/NotFound/NotFound";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

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
        path:'*',
        element:<NotFound/>,
      }
    ]
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/ride',
    element: <PrivateRoute><RideBooking /></PrivateRoute>, // Wrap RideBooking
  },
]);

export default router;