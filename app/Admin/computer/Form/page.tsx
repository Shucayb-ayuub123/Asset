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

type Props = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ setToggle }: Props) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataWithDate = {
      ...PC_info,
      Time_added: new Date(),
    };

    try {
      await axios.post("/api/Asset-Register", dataWithDate);
      setToggle(false); // close modal
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-white h-80 rounded-2xl px-3 flex justify-center items-center p-5">
      <form
        className="flex-col space-y-3 gap-1 w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-3 space-x-4">
          <div>
            <label>Computer Name</label>
            <Input
              value={PC_info.com_name}
              onChange={(e) =>
                setInfo({ ...PC_info, com_name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Computer Version</label>
            <Input
              value={PC_info.com_version}
              onChange={(e) =>
                setInfo({ ...PC_info, com_version: e.target.value })
              }
            />
          </div>

          <div>
            <label>OS Version</label>
            <Input
              value={PC_info.os_version}
              onChange={(e) =>
                setInfo({ ...PC_info, os_version: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-3 space-x-4">
          <div>
            <label>CPU</label>
            <Input
              value={PC_info.cpu}
              onChange={(e) =>
                setInfo({ ...PC_info, cpu: e.target.value })
              }
            />
          </div>

          <div>
            <label>Storage</label>
            <Input
              value={PC_info.storage}
              onChange={(e) =>
                setInfo({ ...PC_info, storage: e.target.value })
              }
            />
          </div>

          <div>
            <label>Antivirus Status</label>
            <Select
              value={PC_info.ant_virus}
              onValueChange={(value: "Active" | "Expired" | "Expired-soon") =>
                setInfo({ ...PC_info, ant_virus: value })
              }
            >
              <SelectTrigger>
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

        <div>
          <label>Days Remaining</label>
          <Input
            type="number"
            value={PC_info.days_remaining}
            onChange={(e) =>
              setInfo({
                ...PC_info,
                days_remaining: Number(e.target.value),
              })
            }
            className="w-2/5"
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-500 px-4 py-1 rounded-md text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;