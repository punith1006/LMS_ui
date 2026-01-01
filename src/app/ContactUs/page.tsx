"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../../public/animation/c1.json";
import { axiosPublic } from "../common/axiosPublic";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      fullName: "",
      email: "",
      phoneNo:'',
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()

        .required("Please enter a valid first name")
        .matches(/^[A-Za-z\s]+$/, "Only letters are allowed"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a valid email"),
        phoneNo: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid  mobile number")
        .required("Mobile Number is required"),
      message: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {

      try{
      setLoading(true);
      let payload: any = {
        fullName: values.fullName,
        email: values.email, 
        phoneNo:values.phoneNo,
        message: values.message,
      };
      const result = await axiosPublic.post("/lms/contact-us", payload);
      
                    toast.success(result.data.message)

      setLoading(false);
      resetForm();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      
   
      toast.error(error.response.data.error);

  }
    },
  });

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header  />

      <section className="w-full bg-black px-4 md:px-8 lg:px-32  h-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div className="flex flex-col justify-start text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Let's Get in <span className="text-purple-500">Touch!</span>
            </h1>
            <p className="text-sm md:text-base text-white opacity-75">
              Have a question or need assistance? Reach out to us via email,
              phone, or this contact form. We're eager to assist you.
            </p>
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="h-48 md:h-64 lg:h-72 w-auto mx-auto md:mx-0"
            />
          </div>

          <div className="rounded-lg p-4 md:p-8">
            <form
              className="space-y-6"
              id="my-form"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-white font-medium mb-1"
                >
                  Full Name:
                </label>
                <input
                  {...formik.getFieldProps("fullName")}
                  type="text"
                  maxLength={50}
                  id="fullName"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-purple-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-1"
                >
                  Email:
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  maxLength={50}
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-purple-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-white font-medium mb-1"
                >
                  Phone No:
                </label>
                <input
                  {...formik.getFieldProps("phoneNo")}
                  type="text"
                  id="phoneNo"
                  placeholder="Enter your phoneNo"
                  className="w-full px-4 py-2 border border-purple-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-1"
                >
                  Message:
                </label>
                <textarea
                  {...formik.getFieldProps("message")}
                  maxLength={100}
                  id="message"
                  placeholder="Write your message"
                  rows={4}
                  className="w-full px-4 py-2 border border-purple-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              {formik.errors.fullName ? (
        <div className="text-red-400 text-xs mt-1">{formik.errors.fullName}</div>
      ) : formik.errors.email ? (
        <div className="text-red-400 text-xs mt-1">{formik.errors.email}</div>
      ) : formik.errors.phoneNo ? (
        <div className="text-red-400 text-xs mt-1">{formik.errors.phoneNo}</div>
      ) : formik.errors.message ? (
        <div className="text-red-400 text-xs mt-1">{formik.errors.message}</div>
      ): null}
              <button
                form="my-form"
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
