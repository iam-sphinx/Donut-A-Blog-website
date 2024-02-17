import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import RouteGuard from "../utils/RouteGuard";

const Layout = ({ children }) => {
  return (
    <RouteGuard>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-[1440px] min-h-screen flex flex-col relative justify-between">
          <Header />
          <div className="flex-1 flex justify-center">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </RouteGuard>
  );
};

export default Layout;
