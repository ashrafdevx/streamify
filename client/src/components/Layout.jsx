import React from "react";
import { Outlet } from "react-router";
import { SideBar } from "./sideBar";
import Navbar from "./navbar";
import { useThemeStore } from "../zustand/themeSelector";

const Layout = ({ children }) => {
  const { theme } = useThemeStore();
  return (
    <div className="flex bg-base-100 min-h-screen" data-theme={theme}>
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar /> {children}
      </div>
    </div>
  );
};

export default Layout;
