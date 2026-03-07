"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
useRouter;
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  LayoutDashboard,
  Monitor,
  PrinterIcon,
  Cpu,
  RouterIcon,
  SquarePen,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { log } from "console";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState<string | null>("");
  const [role, setrole] = useState<string | null>("");
  const [computer, setComputer] = useState<any[]>([]);
  const [totalComputers, setTotalComputers] = useState<number>(0);
  const [printer, setPrinter] = useState<any[]>([]);
  const [totalPrinters, setTotalPrinters] = useState<number>(0);
  const [other, setOther] = useState<any[]>([]);
  const router = useRouter();
  const DisplayData = async () => {
    const res = await axios.get("/api/FetchData");
    setComputer(res.data.computers);
    setTotalComputers(res.data.totalComputers);
    setPrinter(res.data.printer);
    setTotalPrinters(res.data.totalPrinters);
    setOther(res.data.otherDevices);
  };
  useEffect(() => {
    DisplayData();
    const name = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    setUsername(name);
    setrole(role);
  }, []);

  return (
    <div className="px-1 lg:px-4 py-4">
      <div className=" flex justify-between items-center gap-4  border-b-[0.5px] pb-4 border-gray-400">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            overview of all IT asset in your organization
          </p>
        </div>

        <div className="bg-white flex justify-center items-center gap-4 w-31 p-2 rounded-md">
          {" "}
          <span className="bg-blue-500 flex justify-center items-center  w-8 rounded-2xl h-8 text-white">
            IT
          </span>{" "}
          <p>{role}</p>
        </div>
       
      </div>
         
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Computers Card */}
        <Card className="w-full">
          <div className="flex items-center justify-between px-3">
            <div className="space-y-3">
              <CardTitle className="text-2xl">{computer.length}</CardTitle>
              <CardDescription>Computers</CardDescription>
              <CardDescription>Total: {totalComputers}</CardDescription>
            </div>
            <div className="ml-9 bg-blue-100 py-2 px-2 rounded-lg">
              <Monitor size={24} color="blue" />
            </div>
          </div>
        </Card>

        {/* Printers Card */}
        <Card className="w-full">
          <div className="flex items-center px-3 justify-between">
            <div className="space-y-3">
              <CardTitle className="text-2xl">{printer.length}</CardTitle>
              <CardDescription>Printers</CardDescription>
              <CardDescription>Total: {totalPrinters}</CardDescription>
            </div>
            <div className="ml-9 bg-green-200 py-2 px-2 rounded-lg">
              <PrinterIcon size={24} color="green" />
            </div>
          </div>
        </Card>

        {/* Other Devices Card */}
        <Card className="w-full">
          <div className="flex items-center px-3 justify-between">
            <div className="space-y-3">
              <CardTitle className="text-2xl">{other.length}</CardTitle>
              <CardDescription>Other Devices</CardDescription>
              <CardDescription>Switches, servers, etc.</CardDescription>
            </div>
            <div className="ml-14 bg-red-100 py-2 px-2 rounded-lg">
              <Cpu size={24} color="red" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-7 overflow-x-auto">
        <Table className="min-w-200 bg-white shadow-md shadow-gray-300">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-100  font-bold text-xl px-3 py-3">
                Recent IT Assets
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableHeader>
            <TableRow className="py-4 bg-gray-50">
             
              <TableHead className="font-semibold">Name/Model</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="text-right font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Last Updated
              </TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...computer, ...printer, ...other].map(
              (item: any, index: number) => (
                <TableRow key={index}>
                  
                  <TableCell>
                    {item.name || item.model || item.com_name}
                  </TableCell>
                  <TableCell>{item.location || "-"}</TableCell>
                  <TableCell className="text-right">
                    {item.status || "Active"}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.Time_added.split("T")[0] || "-"}
                  </TableCell>
                  
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
