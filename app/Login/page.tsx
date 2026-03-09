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
import { Eye } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import { Metadata } from "next";

const metadata:Metadata = {
  title: "Login",
};
const page = () => {
  const [MSG, setMsg] = useState<String>("");

  const [userAuth, setAuth] = useState<Users>({
    username: "",
    password: "",
  });

  const [showPassword, setPassword] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user-login", userAuth);
      setMsg(response.data.message);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      if (response.data.role == "admin") {
        router.push("/Admin");
      } else if (response.data.role == "user") {
        router.push("/Users");
      } else {
        alert("something wrong");
      }
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [MSG]);
  return (
    <div className="bg-gray-100 h-screen w-full flex flex-col justify-center  items-center relative overflow-hidden px-4">
      <div className="bg-white w-12/12 lg:w-130 px-10 py-16 rounded-lg md:w-7/12  sm:w-7/12  ">
        <div className="mb-10">
          <h1 className="font-semibold text-2xl">Welcome Back</h1>
          <p className="text-sm text-gray-500">Please login to your account</p>
        </div>
        <form action="" className="w-12/12 space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              placeholder="username"
              value={userAuth.username}
              onChange={(e) =>
                setAuth({ ...userAuth, username: e.target.value })
              }
              className="border-[0.5px] border-gray-300"
            />
          </div>
          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={userAuth.password}
              onChange={(e) =>
                setAuth({ ...userAuth, password: e.target.value })
              }
              className="border-[0.5px] border-gray-300 "
            />

            {userAuth.password && (
              <button
                type="button"
                onClick={() => setPassword((prev) => !prev)}
                className="absolute right-0 mx-3 my-4 mt-2 text-gray-500"
              >
                {showPassword ? <Eye size={24} /> : <EyeOffIcon size={24} />}
              </button>
            )}
          </div>

          <Button
            className="w-full mt-4 bg-cyan-600  text-white hover:bg-cyan-500"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      <div
        className={` absolute right-0 bottom-3   ${MSG ? "-translate-x-6" : " translate-x-20"} transform transition-all duration-100 ease-in-out `}
      >
        {MSG && (
          <Alert
            className="max-w-md"
            variant={MSG == "Login successfull" ? "destructive" : "default"}
          >
            {MSG == "Login successfull" ? (
              <CheckCircle2Icon />
            ) : (
              <CircleAlert />
            )}
            <AlertTitle
              className={`${MSG == "Login successfull" ? "text-green-400 font-semibold text-md" : ""}`}
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
