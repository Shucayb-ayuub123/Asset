"use client";
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

import { computer } from "@/app/UserType";
import axios from "axios";
import { useParams } from "next/navigation";
const page = () => {
  const [PC_info, setInfo] = useState<computer>({
    com_name: "",
    com_version: "",
    os_version: "",
    cpu: "",
    storage: "",
    ant_virus: "Active",
    days_remaining: 0,
    Time_added: new Date(),
  });
  const [Toggle, setToggle] = useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataWithDate = {
      ...PC_info,
      Time_added: new Date(),
    };
    try {
      const respons = await axios.post("/api/Asset-Register", dataWithDate);
    } catch (error: any) {
      alert(error?.respons?.data?.message);
    } finally {
      setToggle(false);
    }
  };
  return (
    <>
      {Toggle && (
        <div className="bg-white h-80 rounded-2xl px-3 flex z-auto   justify-center items-center p-5">
          <form
            className="flex-col space-y-3 gap-1 w-12/12"
            onSubmit={handleSubmit}
          >
            <div className=" grid  grid-cols-3 space-x-4 ">
              <div>
                <label htmlFor="">Computer Name</label>
                <Input
                  className="border-[0.4px] border-gray-400"
                  value={PC_info.com_name}
                  onChange={(e) =>
                    setInfo({ ...PC_info, com_name: e.target.value })
                  }
                ></Input>
              </div>
              <div>
                <label htmlFor="">Computer version</label>
                <Input
                  value={PC_info.com_version}
                  onChange={(e) =>
                    setInfo({ ...PC_info, com_version: e.target.value })
                  }
                  className="border-[0.4px] border-gray-400"
                ></Input>
              </div>
              <div>
                <label htmlFor="">OS Version</label>
                <Input
                  value={PC_info.os_version}
                  onChange={(e) =>
                    setInfo({ ...PC_info, os_version: e.target.value })
                  }
                  className="border-[0.4px] border-gray-400"
                ></Input>
              </div>
            </div>

            <div className="grid  grid-cols-3 space-x-4">
              <div>
                <label htmlFor="">CPU</label>
                <Input
                  value={PC_info.cpu}
                  onChange={(e) => setInfo({ ...PC_info, cpu: e.target.value })}
                  className="border-[0.5px] border-gray-400"
                ></Input>
              </div>
              <div>
                <label htmlFor="">Storage</label>
                <Input
                  value={PC_info.storage}
                  onChange={(e) =>
                    setInfo({ ...PC_info, storage: e.target.value })
                  }
                  className="border-[0.5px] border-gray-400"
                ></Input>
              </div>
              <div>
                <label htmlFor="">Antivirus Status</label>
                <Select
                  value={PC_info.ant_virus}
                  onValueChange={(
                    value: "Active" | "Expired" | "Expired-soon",
                  ) => setInfo({ ...PC_info, ant_virus: value })}
                >
                  <SelectTrigger className="w-full border-[0.5px] border-gray-400">
                    <SelectValue placeholder="status Anti virus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Expire-soon">Expire-soon</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <label htmlFor="">Days Remaining</label>
              <Input
                type="number"
                value={PC_info.days_remaining}
                onChange={(e) =>
                  setInfo({
                    ...PC_info,
                    days_remaining: Number(e.target.value),
                  })
                }
                className="w-2/5 border-[0.5px] border-gray-400"
              ></Input>
            </div>

            <div className="flex justify-end items-center space-x-10">
              <button className="bg-blue-500 px-4 py-1 rounded-md text-white">
                submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default page;
