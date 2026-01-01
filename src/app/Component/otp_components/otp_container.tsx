"use client"
import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { axiosPublic } from '@/app/common/axiosPublic';
import { toast } from 'react-toastify';

export default function OtpContainer() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()
  const formik = useFormik({
    validateOnBlur:false,
    initialValues: {
      otp: '',

    },
    validationSchema: Yup.object({
      otp: Yup.string()

        .required('Please enter a valid otp').length(6, 'Please enter a valid otp') .matches(/^[0-9]+$/, 'Only numbers are allowed'),

    }),
    onSubmit: async (values, { resetForm }) => {


      try {
        if (isLoading) {
          return;
        }
        setLoading(true);
        const registerData = localStorage.getItem("register");
        const result = await axiosPublic.post('/auth/verify-otp-email', {
          "otp": values.otp,
          "email": JSON.parse(registerData!).email,
        });

        const addUserResult = await axiosPublic.post('/auth/add-user', {
          "email": JSON.parse(registerData!).email,
          "password": JSON.parse(registerData!).password,
          "roleId": 1,
          "firstName": JSON.parse(registerData!).name,
        });
        localStorage.removeItem("register");
   
        setLoading(false);
       
        resetForm();
        router.push("/auth/signin");
      } catch (error: any) {
        setLoading(false);
      
        toast.error(error!.message);

      }
    },
  });

  return (
    <main className="w-full  flex-1 flex flex-col justify-center items-center gap-10">
      {/* <!-- Sign Up Form --> */}

      <div className='flex flex-col justify-center items-center gap-2' >
        <h3 className="text-3xl text-white font-semibold">
          Enter <span className='text-blue'>OTP</span>
        </h3>

      </div>
      <form autoComplete="off" onSubmit={formik.handleSubmit} className='w-full md:w-[375px]'>



        <div className="mb-4">

          <input
            {...formik.getFieldProps('otp')}
            maxLength={6}
            type="password"
            placeholder="Otp"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-primary_color outline-none transition focus:border-blue active:border-blue disabled:cursor-default disabled:bg-whiter"
          />
          {formik.errors.otp ? (
            <div className="text-sm text-red mt-2 ml-2">{formik.errors.otp}</div>
          ) : null}
        </div>





        <button type='submit' className="mb-3 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
          {
            isLoading ? "Loading.." : "Submit"
          }
        </button>



      </form>

    </main>
  )
}
