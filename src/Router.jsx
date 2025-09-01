import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layout/Layout";
import Home from "./pages/Home";        
import Blogs from "./pages/Blogs";
import Event from "./pages/Event"
import Newsletter from "./pages/Newsletter";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";    
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      
      {
        element: <PrivateRoute />,
        children: [
          {path: "/", element: <Home /> },
          { path: "blogs", element: <Blogs /> },
          { path: "event", element: <Event /> },
          { path: "newsletter", element: <Newsletter /> },
          { path: "projects", element: <Projects /> },
        ],
      },
      { path: "signin", element: <SignIn /> },
    ],
  },
]);

export default router;