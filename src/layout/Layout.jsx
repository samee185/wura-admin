import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AuthProvider from "../contexts/AuthContext";
import BlogProvider  from "../contexts/BlogContext";
// import ScrollToTop from "../components/ScrollToTop";
// import ProductProvider from "../contexts/ProductContext";
import Sidebar from "./Sidebar";
// import UserProvider from "../contexts/UserContext";

const Layout = () => {
  const location = useLocation();

  // Routes where Navbar & Sidebar should be hidden
  const hideLayout = location.pathname === "/signin";

  return (
    <AuthProvider>
        <BlogProvider>
      {/* <UserProvider> */}
        {/* <ProductProvider> */}
          {/* <ScrollToTop /> */}
          {hideLayout ? (
            // If layout is hidden, just show the Outlet
            <main className="w-full min-h-screen bg-[#fdf9f9]">
              <Outlet />
            </main>
          ) : (
            // Default layout with Navbar & Sidebar
            <>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 py-4 lg:py-6 bg-[#fdf9f9] max-h-[95vh] overflow-y-auto">
                  <Outlet />
                </main>
              </div>
            </>
          )}
        {/* </ProductProvider>  */}
      {/* </UserProvider> */}
      </BlogProvider>
    </AuthProvider>
  );
};

export default Layout;
