
"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { printer } from "@/app/UserType";
import axios from "axios";
import { OtherDevices } from "@/app/UserType";
const page = () => {
  const [PC_info, setInfo] = useState<OtherDevices>({
    device_name: "",
    device_type: "",
    functions: "",
    location: "",
    status: "Active",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respons = await axios.post("/api/otherDevice", PC_info);
      alert(respons.data.message);
    } catch (error: any) {
      alert(error?.respons?.data?.message);
    }
  };
  return (
    <div className="bg-white h-90 w-full rounded-2xl px-3 flex z-auto   justify-center items-center p-5">
      <form
        className="flex-col space-y-3 gap-1 w-12/12"
        onSubmit={handleSubmit}
      >
        <div className=" grid  grid-cols-3 space-x-4 ">
          <div>
            <label htmlFor="">Device Name</label>
            <Input
              className="border-[0.4px] border-gray-400"
              value={PC_info.device_name}
              onChange={(e) =>
                setInfo({ ...PC_info, device_name: e.target.value })
              }
            ></Input>
          </div>
          <div>
            <label htmlFor="">Device Type</label>
            <Input
              value={PC_info.device_type}
              onChange={(e) =>
                setInfo({ ...PC_info, device_type: e.target.value })
              }
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
          <div>
            <label htmlFor="">Function</label>
            <Input
              value={PC_info.functions}
              onChange={(e) =>
                setInfo({ ...PC_info, functions: e.target.value })
              }
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
        </div>

        <div className="grid  grid-cols-3 space-x-4">
          <div>
            <label htmlFor="">Location</label>
            <Input
              value={PC_info.location}
              onChange={(e) =>
                setInfo({ ...PC_info, location: e.target.value })
              }
              className="border-[0.5px] border-gray-400"
            ></Input>
          </div>
          <div>
            <label htmlFor="">status</label>
            <Select
              value={PC_info.status}
              onValueChange={(value: "Active" | "Inactive" | "Maintenance") =>
                setInfo({ ...PC_info, status: value })
              }
            >
              <SelectTrigger className="w-full border-[0.5px] border-gray-400">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-10">
          <button className="bg-blue-500 px-4 py-1 rounded-md text-white">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
