"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Form from "./Form/page";

import { printer } from "@/app/UserType";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  const [Toggle, setToggle] = useState<boolean>(false);
  const [PC_info, setInfo] = useState<printer[]>([]);
  const router = useRouter()
  const HandleEdit = (id:number | undefined) => {
    router.push(`printers/Form/${id}`)
  }

  const DeleteItem = async (id : number | undefined) => {
    await  axios.delete(`/api/otherDevice/${id}`)

    setInfo(prev => prev.filter((item) => item.id !== id))
  }

  const fetchData = async () => {
    try {
      const respons = await axios.get("/api/printer");
      setInfo(respons.data);
    } catch (error: any) {
      alert(error?.respons?.data?.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-4 py-4">
      {Toggle && (
        <div
          className="bg-gray-300/70 backdrop-blur-[1px]  z-40 w-281 h-140  absolute  px-10 py-30 "
          onClick={() => setToggle(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Form />
          </div>
        </div>
      )}
      <div className="flex w-12/12 items-center justify-between border-b-[0.5px] pb-4 border-gray-400">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">Printers</h1>
          <p className="text-sm text-gray-500">
            Manage of all Printers asset in your organization
          </p>
        </div>
      </div>

      <div className="mt-7">
        <Table className="bg-white shadow-md shadow-gray-300 rounded-md">
          <TableCaption>A list of yaour recent invoices.</TableCaption>

          <TableHeader>
            <TableRow className="h-14">
              <TableHead>
                {" "}
                <h1 className="text-xl font-bold">All printer</h1>
              </TableHead>
              <TableHead className="text-end" colSpan={20}>
                <Button
                  className="bg-blue-700 hover:bg-blue-600 active:bg-blue-500"
                  onClick={() => setToggle(true)}
                >
                  + Add New Printter
                </Button>
              </TableHead>
            </TableRow>
            <TableRow className="py-4 bg-gray-50">
              <TableHead className="font-semibold">Printer Name</TableHead>
              <TableHead className="font-semibold">Brand</TableHead>
              <TableHead className="font-semibold">Model</TableHead>
              <TableHead className="font-semibold">
                Scanner
              </TableHead>
              <TableHead className="font-semibold">Color</TableHead>
              <TableHead className="font-semibold">
                Location
              </TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PC_info.map((pc) => (
              <TableRow key={pc.id}>
                <TableCell>{pc.printer_name}</TableCell>
                <TableCell>{pc.brand}</TableCell>
                <TableCell>{pc.model}</TableCell>
                <TableCell>{pc.scanner}</TableCell>
                <TableCell>{pc.color}</TableCell>
                <TableCell>{pc.location}</TableCell>
                <TableCell>{pc.status}</TableCell>
                <TableCell className="text-right space-x-4">
                  <button className=" bg-blue-500 border-[1]  p-1 rounded-2xl" onClick={() => HandleEdit(pc.id)}>
                    <SquarePen size={19} color="white"></SquarePen>
                  </button>
                  <button className=" bg-red-600 border-[1]  p-1 rounded-2xl" onClick={() => DeleteItem(pc.id)}>
                    <Trash2 size={19} color="white"></Trash2>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
