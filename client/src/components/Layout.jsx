import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import RouteGuard from "../utils/RouteGuard";

const Layout = ({ children }) => {
  return (
    <RouteGuard>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="sm:w-[1440px] w-[390px] min-h-screen flex flex-col relative justify-between overflow-hidden">
          <Header />
          <div className="flex-1 flex">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </RouteGuard>
  );
};

export default Layout;
