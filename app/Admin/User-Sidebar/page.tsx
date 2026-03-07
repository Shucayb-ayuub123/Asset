"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Server } from "lucide-react";
import { LayoutDashboard, Monitor, PrinterIcon, Cpu } from "lucide-react";
type Props = {
  isOpen: boolean;
  onClose?: () => void;
};
const page = ({ isOpen, onClose }: Props) => {
  const Pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/Admin", icons: LayoutDashboard },
    { name: "computers", href: "/Admin/computer", icons: Monitor },
    { name: "printers", href: "/Admin/printers", icons: PrinterIcon },
    { name: "other-devices", href: "/Admin/other-devices", icons: Cpu },
  ];
  return (
    <div>
     
      <div
        className={`fixed top-0 h-screen w-64 bg-blue-950 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0 " : "-translate-x-full"}
          lg:translate-x-0    lg:block`}
      >
        <div className="bg-transparent flex mb-4 py-3 space-x-4 p-4 border-b-[0.5px] pt-10  border-gray-500">
          <Server size={60} color="blue" />{" "}
          <h1 className="text-white font-semibold text-xl">IT Asset Manager</h1>
        </div>

        <ul className="mt-9 space-y-4">
          {links.map((link, index) => {
            const Icons = link.icons;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`p-3 
                   text-white flex 
                   text-md items-center gap-3  ${Pathname == link.href ? "bg-gray-700 border-l-blue-700 border-4 border-t-0 border-b-0 border-r-0 " : " hover:bg-gray-700"}
                    ${index == 0 && Pathname == link.href ? "bg-gray-700 border-l-blue-700 border-4 border-t-0 border-b-0 border-r-0" : "hover:bg-gray-700"}
                    hover:bg-gray-700 
                    hover:border-4 hover:border-t-0 
                    hover:border-b-0 hover:border-r-0
                     hover:border-l-blue-700  
                     transition-all duration-200`}
                >
                  <Icons size={17} />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default page;
