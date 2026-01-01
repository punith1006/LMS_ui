
'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  axiosPublic } from '../../../common/axiosPublic';
import { useState } from 'react';
import { toast } from "react-toastify";
import { setCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';


const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
 
// AES encryption function
const encryptData = (data: object): string => {
  try {
    const dataString = JSON.stringify(data); // Convert object to string
    const encrypted = CryptoJS.AES.encrypt(dataString, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};
 
// AES decryption function (if needed for validation or retrieval)
const decryptData = (encryptedData: string): object | null => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const dataString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(dataString); // Convert string back to object
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
export default function SessionForm({
    type, referenceId, referenceCode, requestDescription
}: { type: string, referenceId: number, referenceCode: string, requestDescription: string }) {
    const [isLoading, setLoading] = useState(false);
    const phoneRegExp = /^(?!.*\D).{10}$/;
 
    const formik = useFormik({
        validateOnBlur: false,
        initialValues: {
            firstName: '',
            lastName: '',
            email: "",
            phone: '',
            company: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Please enter a valid first name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            lastName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
            email: Yup.string().email('Invalid email address').required('Please enter a valid email'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            company: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/, 'Please enter a valid company name'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
 
                const result = await axiosPublic.post('/lms/add-request-form', {
                    email: values.email,
                    requestType: type,
                    fullName: values.firstName,
                    companyName: values.company,
                    mobile: values.phone,
                    phone: values.phone,
                    message: "RequestForm",
                    referenceId: referenceId,
                    referenceCode: referenceCode,
                    requestDescription: requestDescription,
                    requestedBy:"Individual"
                });

                let payloadData={
                    firstName : values.firstName,
                    phNumber : values.phone,
                    emailId : values.email,
                    company : values.company,
                    utmSource : 'Website-Leads',
                    action : 'Course-Enquiry',
                }
 

                const cookieData = {
                    firstName: values.firstName,
                    email: values.email,
                    phone: values.phone,
                  };
         
                  const encryptedData = encryptData(cookieData);
         
                  setCookie("_req", encryptedData, { maxAge: 30 * 24 * 60 * 60 });
                setLoading(false);
                toast.success("Form submitted successfully");
                resetForm();
            } catch (error: any) {
                setLoading(false);
                toast.error(error.message);
            }
        },
    });
 
    return (
        <form autoComplete="off" onSubmit={formik.handleSubmit} className="max-w-sm mx-auto m-4 relative overflow-hidden z-10 bg-[#171717] bg-opacity-100 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:bg-opacity-50 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:bg-opacity-30 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
   <h2 className="text-xl font-semibold text-center text-white mb-6">
      {/* Book Your One-One Session */}
      Enroll Now
       </h2>
            <div className="mt-8 flex flex-col gap-3">
                <input
                    {...formik.getFieldProps('firstName')}
                    type="text"
                    placeholder='Name *'
                    className={`block w-full px-3 py-2 mt-1  bg-black bg-opacity-50 border border-gray-600 rounded-md text-white ${formik.errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.firstName && <div className="text-red-400 text-xs mt-1">{formik.errors.firstName}</div>}
                <input
                    {...formik.getFieldProps('email')}
                    type="email"
                    placeholder='Email *'
                    className={`block w-full px-3 py-2 mt-1  bg-black bg-opacity-50 border border-gray-600 rounded-md text-white ${formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.email && <div className="text-red-400 text-xs mt-1">{formik.errors.email}</div>}
                <input
                    {...formik.getFieldProps('phone')}
                    type="text"
                    placeholder='Phone Number *'
                    className={`block w-full px-3 py-2 mt-1  bg-black bg-opacity-50 border border-gray-600 rounded-md text-white ${formik.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.phone && <div className="text-red-400 text-xs mt-1">{formik.errors.phone}</div>}
                <input
                    {...formik.getFieldProps('company')}
                    type="text"
                    placeholder='Company Name'
                    className={`block w-full px-3 py-2 mt-1  bg-black bg-opacity-50 border border-gray-600 rounded-md text-white ${formik.errors.company ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formik.errors.company && <div className="text-red text-xs mt-1">{formik.errors.company}</div>}
            </div>
            <div className='flex items-center w-full justify-center'>
            <button type="submit" className="mt-8 w-[50%]  bg-blue-500 text-white px-4 py-2 font-bold rounded-md">
                {isLoading ? "Loading..." : "Submit"}
            </button>
            </div>
           
        </form>
    );
}