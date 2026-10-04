import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-[68px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
