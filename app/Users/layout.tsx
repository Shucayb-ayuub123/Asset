"use client"
import React from "react";
import { useState } from "react";
import Sidebar from "./User-Sidebar/page";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
const layout = ({ children }: { children: React.ReactNode }) => {
  const [SidebarOpen, setSidebar] = useState(false);
  return (
    <div className="flex w-full">

      
      <Sidebar isOpen={SidebarOpen}  />

      <div className="lg:ml-64 w-full bg-[#f1f5f9] p-9 min-h-screen">
        <button
          className={` lg:hidden p-2 rounded  bg-gray-200 mb-4 ${SidebarOpen ? "ml-57" : "ml-0"} `}
          onClick={() => setSidebar(!SidebarOpen)}
        >
          {SidebarOpen  ? <X /> :  <Menu />}
        </button>

        {children}
      </div>
    </div>
  );
};

export default layout;
