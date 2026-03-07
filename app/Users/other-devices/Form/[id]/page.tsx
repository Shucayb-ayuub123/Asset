"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { OtherDevices } from "@/app/UserType";
import axios from "axios";
import { useParams } from "next/navigation";
const page = () => {
  const [PC_info, setInfo] = useState<OtherDevices>({
    device_name: "",
    device_type: "",
    functions: "",
    location: "",

    status: "Active",
  });

  const { id } = useParams();
  const handleInfo = async () => {
    try {
      const response = await axios.get(`/api/otherDevice/${id}`);

     setInfo(response.data);
  
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respons = await axios.put(`/api/otherDevice/${id}`, PC_info);
      alert(respons.data.message);
    } catch (error: any) {
      alert(error?.respons?.data?.message);
    }
  };
  return (
    <div className="bg-white h-80 rounded-2xl px-3 flex z-auto   justify-center items-center p-5">
      <form
        className="flex-col space-y-3 gap-1 w-12/12"
        onSubmit={handleSubmit}
      >
        <div className=" grid  grid-cols-3 space-x-4 ">
          <div>
            <label htmlFor="">Computer Name</label>
            <Input
              value={PC_info.device_name}
              onChange={(e) =>
                setInfo({ ...PC_info, device_name: e.target.value })
              }
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
          <div>
            <label htmlFor="">Computer version</label>
            <Input
              value={PC_info.device_type}
              onChange={(e) =>
                setInfo({ ...PC_info, device_type: e.target.value })
              }
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
          <div>
            <label htmlFor="">OS Version</label>
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
            <label htmlFor="">CPU</label>
            <Input
              value={PC_info.location}
              onChange={(e) => setInfo({ ...PC_info, location: e.target.value })}
              className="border-[0.5px] border-gray-400"
            ></Input>
          </div>
          
          <div>
            <label htmlFor=""> Status</label>
            <Select
              value={PC_info.status}
              onValueChange={(value: "Active" | "Inactive" | "Maintenance") =>
                setInfo({ ...PC_info, status: value })
              }
            >
              <SelectTrigger className="w-full border-[0.5px] border-gray-400">
                <SelectValue placeholder="status Anti virus" />
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
          <button className="bg-blue-500 px-4 py-1 rounded-md text-white" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
