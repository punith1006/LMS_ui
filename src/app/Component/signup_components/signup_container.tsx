"use client";
 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {axiosPublic} from "@/app/common/axiosPublic";
import { toast } from "react-toastify";
// import errorHelper from "@/common/error_helper";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { IoIosCloseCircle } from "react-icons/io";
import errorHelper from "@/app/common/error_helper";
 
interface SignupProps {
  onClose: () => void;
}
 
export default function Signup({ onClose }: SignupProps) {
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();
 
  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  const phoneRegExp = /^(?!.*\D).{10}$/;
 
  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      otp: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Please enter a valid user name")
        .matches(/^[A-Za-z\s]+$/, "Only letters are allowed"),
      password: Yup.string()
        .required("Please provide a password.")
        .min(8, "Password must be at least 8 characters long.")
        .matches(
          /[a-zA-Z0-9!@#$%^&*]/,
          "Password can only contain letters, numbers, and special characters like !@#$%^&*."
        ),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email"),
 
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter a valid phone number."),
 
      otp: showOTP
        ? Yup.string()
            .required("Please enter a valid OTP")
            .length(6, "Please enter a valid OTP")
            .matches(/^[0-9]+$/, "Only numbers are allowed")
        : Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!showOTP) {
        try {
          if (isLoading) return;
          setLoading(true);
          const result = await axiosPublic.post("/auth/otp-email", {
            email: values.email,
          });
 
          localStorage.setItem(
            "register",
            JSON.stringify({
              email: values.email,
              password: values.password,
              name: values.name,
              phone: values.phone,
            })
          );
 
          setLoading(false);
          setShowOTP(true);
        } catch (error: any) {
          setLoading(false);
          toast.error(errorHelper(error));
          
        }
      } else {
        try {
          if (isLoading) return;
          setLoading(true);
          const registerData = localStorage.getItem("register");
          const parsedData = JSON.parse(registerData!);
 
          const result = await axiosPublic.post("/auth/verify-otp-email", {
            otp: values.otp,
            email: parsedData.email,
          });
 
          await axiosPublic.post("/auth/add-user", {
            email: parsedData.email,
            password: parsedData.password,
            roleId: 1,
            username: parsedData.name,
            phoneNo: parsedData.phone,
          });
 
          localStorage.removeItem("register");
          setLoading(false);
          resetForm();
          router.push("/auth/signin");
        } catch (error: any) {
          setLoading(false);
          toast.error(error!.message);
        }
      }
    },
  });
 
  return (
    <>
      <div
        className="fixed flex inset-0 z-40 bg-black/50"
        onClick={onClose}
      ></div>
 
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <main className="w-full max-w-sm md:max-w-[430px] lg:max-w-[480px] sm:p-6 lg:p-2 mx-auto md:h-96 lg:h-auto overflow-y-auto bg-white p-4 rounded-lg relative">
          <button
            className="absolute top-4 right-3 text-black hover:text-blue transition-colors"
            onClick={() => router.push("/")}
          >
            <IoIosCloseCircle style={{ fontSize: "28px" }} />
          </button>
          <div className="sm:ml-2 lg:ml-5 lg:mr-5 sm:mr-5">
            <div className="flex flex-col justify-center items-center gap-2 mb-10">
              <h3 className="text-2xl md:text-3xl text-blue font-semibold">
                Create <span className="text-black">Account</span>
              </h3>
            </div>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              {/** Input Fields */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-black">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border border-black text-black rounded focus:outline-none ${
                    showOTP ? "bg-grey/5" : ""
                  }`}
                  placeholder="Enter your Name"
                  {...formik.getFieldProps("name")}
                  disabled={showOTP}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-black">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full mt-1 px-3 py-2 border border-black text-base text-black rounded focus:outline-none ${
                    showOTP ? "bg-grey/5" : ""
                  }`}
                  placeholder="Enter your Email"
                  {...formik.getFieldProps("email")}
                  disabled={showOTP}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNo" className="block text-sm text-black">
                  Phone
                </label>
                <input
                  id="phoneNo"
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border border-black text-base text-black rounded focus:outline-none ${
                    showOTP ? "bg-grey/5" : ""
                  }`}
                  placeholder="Enter your Phone number"
                  {...formik.getFieldProps("phone")}
                  disabled={showOTP}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-black">
                  Password
                </label>
                <div className="relative  md:w-ful lg:w-full ">
                  <input
                    id="password"
                    type={passwordType}
                    placeholder="Enter your Password"
                    className={`w-full  mt-1 px-3 py-2 border text-base border-black text-black rounded focus:outline-none ${
                      showOTP ? "bg-grey/5" : ""
                    }`}
                    {...formik.getFieldProps("password")}
                    disabled={showOTP}
                  />
                  <span className="absolute top-4 -ml-7 cursor-pointer"
                        onClick={togglePassword}
                  >
                      {passwordType === "password" ? (
                        <EyeSlashIcon className="h-5 w-5 text-black" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-black  lg:mr-0" />
                      )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
 
              {showOTP && (
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm text-black">
                    OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Check your Email and Enter OTP"
                    className="w-full mt-1 px-3 py-2 border border-black text-black rounded focus:outline-none"
                    {...formik.getFieldProps("otp")}
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>
              )}
 
                <button
                  type="submit"
                  className="bg-blue-400 w-full lg:w-full text-black md:w-[350px] p-3 rounded hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading.." : showOTP ? "Submit" : "Register"}
                </button>
 
              {!showOTP && (
                <div className="flex flex-row items-center justify-center mt-5">
                  <h4 className="text-sm font-normal text-black">
                    Already have an account?{" "}
                    <span
                      className="font-semibold text-blue cursor-pointer text-blue-400"
                      onClick={() => router.push("/auth/signin")}
                    >
                      Login
                    </span>
                  </h4>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
}