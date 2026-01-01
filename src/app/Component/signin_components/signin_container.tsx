'use client'
import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosPublic } from "@/app/common/axiosPublic";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import Signup from "../signup_components/signup_container";
import { basepath } from "@/app/common/constants";

interface SigninProps {
  onClose: () => void;
}

export default function SignInContainer({ onClose }: SigninProps) {
  const basePath = basepath;
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please provide a password."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isLoading) return;
        setLoading(true);
        const result = await axiosPublic.post("/auth/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("session", JSON.stringify(result.data));

        // Trigger event for Header/useUserData update
        window.dispatchEvent(new Event("userUpdated"));

        router.push("/");
        setTimeout(() => {
          setLoading(false);
          resetForm();
          window.location.reload();
        }, 2000);
      } catch (error: any) {
        setLoading(false);

      }
    },
  });

  const handleSignupClick = () => {
    router.push("/auth/signup");
    setIsPopupVisible(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70 justify-center items-center"
        onClick={onClose}
      />



      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div className="lg:w-full lg:max-w-md lg:h-auto mx-4 flex flex-col items-center md:h-96 overflow-y-auto bg-white rounded-lg p-6">          <main className="flex-1 flex flex-col justify-center items-center">
          <button
            className="self-end text-black hover:text-blue transition-colors"
            onClick={() => router.push("/")}
          >
            <IoIosCloseCircle style={{ fontSize: "30px" }} />
          </button>
          <div className="flex flex-row gap-2 mb-2 text-center">
            <h3 className="text-3xl text-blue-500 font-semibold">
              Welcome <span className="text-black">Back</span>
            </h3>
          </div>
          <p className="text-sm font-normal mb-10 text-black">
            Login to Continue
          </p>

          <form
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className="w-full md:w-[375px]"
          >
            <div className="mb-4 relative">
              <input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="Email *"
                maxLength={50}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-whiter"
              />
              <span className="absolute top-4 right-4">
                <img
                  alt="email icon"
                  className="text-blue-400 h-4 w-5"
                  src={`${basePath}/email.png`}
                />
              </span>
              {formik.errors.email && (
                <div className="text-sm text-red mt-2 ml-2">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-5 relative">
              <input
                type={passwordType}
                placeholder="Password *"
                maxLength={30}
                {...formik.getFieldProps("password")}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-whiter"
              />
              <span
                className="absolute top-4 right-4 cursor-pointer"
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <EyeIcon className="text-blue-500 h-4 w-4" />
                ) : (
                  <EyeSlashIcon className="text-blue-500 h-4 w-4" />
                )}
              </span>
              {formik.errors.password && (
                <div className="text-sm text-red mt-2 ml-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="mb-8 flex items-center justify-between">
              <label
                htmlFor="formCheckbox"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="relative pt-0.5">
                  <input
                    type="checkbox"
                    id="formCheckbox"
                    className="text-black"
                  />
                </div>
                <p className="text-sm text-black">Keep me signed in</p>
              </label>
            </div>

            <button className="mb-3 flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-black">
              {isLoading ? "Loading.." : "Login"}
            </button>
          </form>

          <div className="flex flex-row justify-center items-center">
            <p className="text-black">{"Don't have an account?"}</p>
            <div
              onClick={handleSignupClick}
              className="rounded text-blue-400 px-2 py-2 text-blue cursor-pointer"
            >
              Signup
            </div>
            {isPopupVisible && (
              <Signup onClose={() => setIsPopupVisible(false)} />
            )}
          </div>
        </main>
        </div>
      </div>
    </>
  );
}