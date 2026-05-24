import React from "react";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout = ({ children, showFooter = true }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
