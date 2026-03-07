"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import { Users } from "../UserType";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const page = () => {
  const [MSG, setMsg] = useState<String>("");

  const [userAuth, setAuth] = useState<Users>({
    username: "",
    password: "",
    role: "user",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin-register", userAuth);
      setMsg(response.data.message);

      router.push("/Admin");
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
   const timer =  setTimeout(() => {
      setMsg("");
    }, 3000);

    return () => clearTimeout(timer)
  }, [MSG]);
  return (
    <div className="bg-gray-100 h-screen w-full flex flex-col justify-center  items-center relative overflow-hidden px-4">
      <div className="bg-white w-12/12 lg:w-4/12 px-10 py-16 rounded-lg md:w-7/12  sm:w-7/12  ">
        <div className="mb-10">
          <h1 className="font-semibold text-2xl">Welcome Back</h1>
          <p className="text-sm text-gray-500">Please Regist new user</p>
        </div>
        <form action="" className="w-12/12 space-y-4" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="">Username</label>
            <Input
              placeholder="username"
              value={userAuth.username}
              onChange={(e) =>
                setAuth({ ...userAuth, username: e.target.value })
              }
              className="border-[0.5px] border-gray-300"
            />
          </div>
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="">Password</label>
            <Input
              type="password"
              placeholder="password "
              onChange={(e) =>
                setAuth({ ...userAuth, password: e.target.value })
              }
              value={userAuth.password}
              className="border-[0.5px] border-gray-300"
            />
          </div>

          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="">Role</label>
            <Select
              value={userAuth.role}
              onValueChange={(value: "admin" | "user") =>
                setAuth({ ...userAuth, role: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full mt-4 bg-cyan-600  hover:bg-cyan-500"
            type="submit"
          >
            Register User
          </Button>
        </form>
      </div>
      <div
        className={` absolute right-0 bottom-3   ${MSG ? "-translate-x-6" : " translate-x-20"} transform transition-all duration-100 ease-in-out `}
      >
        {MSG && (
          <Alert
            className="max-w-md"
            variant={MSG == "Login successfull" ? "default" : "destructive"}
          >
            {MSG == "Login successfull" ? (
              <CheckCircle2Icon />
            ) : (
              <CircleAlert />
            )}
            <AlertTitle
              className={`${MSG == "Login successfull" ? "text-green-500" : ""}`}
            >
              {MSG}
            </AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default page;
