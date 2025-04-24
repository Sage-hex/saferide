

// import { RouterProvider } from "react-router-dom";
// import router from "./router/router";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const App = () => {

//   return(
//     <>
    
//     <RouterProvider router={router}/>
//     <ToastContainer/>
//     </>
//   )
// }

// export default App;

// src/App.jsx
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

const App = () => {
  const initializeAuthListener = useAuthStore((state) => state.initializeAuthListener);

  useEffect(() => {
    initializeAuthListener(); // Call the listener once on app mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  )
}

export default App;