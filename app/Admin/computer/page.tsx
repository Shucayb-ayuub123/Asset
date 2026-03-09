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
import axios from "axios";
import { computer } from "@/app/UserType";
import { useRouter } from "next/navigation";

const page = () => {
  const [Toggle, setToggle] = useState(false);
  const [PC_info, setInfo] = useState<computer[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    const res = await axios.get("/api/Asset-Register");
    setInfo(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleEdit = (id: number | undefined) => {
    router.push(`computer/Form/${id}`);
  };

  const DeleteItem = async (id: number | undefined) => {
    await axios.delete(`/api/Asset-Register/${id}`);
    setInfo((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="px-4 py-4">
      {Toggle && (
        <div
          className="bg-gray-300/70 backdrop-blur w-full h-screen fixed top-0 left-0 flex justify-center items-center"
          onClick={() => setToggle(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Form setToggle={setToggle} />
          </div>
        </div>
      )}

      <div className="flex justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Computers</h1>
          <p className="text-sm text-gray-500">
            Manage all computer assets
          </p>
        </div>

        <Button onClick={() => setToggle(true)}>
          + Add New Computer
        </Button>
      </div>

      <div className="mt-7">
        <Table className="bg-white shadow">
          <TableCaption>List of computers</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>CPU</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Antivirus</TableHead>
              <TableHead>Days</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {PC_info.map((pc) => (
              <TableRow key={pc.id}>
                <TableCell>{pc.com_name}</TableCell>
                <TableCell>{pc.com_version}</TableCell>
                <TableCell>{pc.os_version}</TableCell>
                <TableCell>{pc.cpu}</TableCell>
                <TableCell>{pc.storage}</TableCell>
                <TableCell>{pc.ant_virus}</TableCell>
                <TableCell>{pc.days_remaining}</TableCell>

                <TableCell className="text-right space-x-3">
                  <button
                    className="bg-blue-500 p-1 rounded-xl"
                    onClick={() => HandleEdit(pc.id)}
                  >
                    <SquarePen size={18} color="white" />
                  </button>

                  <button
                    className="bg-red-500 p-1 rounded-xl"
                    onClick={() => DeleteItem(pc.id)}
                  >
                    <Trash2 size={18} color="white" />
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