
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
const page = () => {
  const [PC_info, setInfo] = useState<printer>({
    printer_name: "",
    brand: "",
    model: "",
    scanner: "Yes",
    color: "Black & white",
    location: "",
    status: "Active",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respons = await axios.post("/api/Asset-Register", PC_info);
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
            <label htmlFor="">Printer Name</label>
            <Input
              className="border-[0.4px] border-gray-400"
              value={PC_info.printer_name}
              onChange={(e) =>
                setInfo({ ...PC_info, printer_name: e.target.value })
              }
            ></Input>
          </div>
          <div>
            <label htmlFor="">Brand</label>
            <Input
              value={PC_info.brand}
              onChange={(e) => setInfo({ ...PC_info, brand: e.target.value })}
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
          <div>
            <label htmlFor="">Model</label>
            <Input
              value={PC_info.model}
              onChange={(e) => setInfo({ ...PC_info, model: e.target.value })}
              className="border-[0.4px] border-gray-400"
            ></Input>
          </div>
        </div>

        <div className="grid  grid-cols-3 space-x-4">
          <div>
            <label htmlFor="">Scanner</label>
           <Select
                value={PC_info.scanner}
                onValueChange={(value: "No" | "Yes") =>
                  setInfo({ ...PC_info, scanner: value })
                }
              >
                <SelectTrigger className="w-full border-[0.5px] border-gray-400">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
       
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
          </div>
          <div>
            <div>
              <label htmlFor="">Color</label>

              <Select
                value={PC_info.color}
                onValueChange={(value: "Black & white" | "Color") =>
                  setInfo({ ...PC_info, color: value })
                }
              >
                <SelectTrigger className="w-full border-[0.5px] border-gray-400">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Color">Color</SelectItem>
                    <SelectItem value="Black & white">Black & white</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="">Location</label>

            <Input
              value={PC_info.location}
              onChange={(e) => setInfo({ ...PC_info, location: e.target.value })}
              className="border-[0.5px] border-gray-400"
            ></Input>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div>
            <label htmlFor="">Status</label>
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
                  <SelectItem value="Inactive">InActive</SelectItem>
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
