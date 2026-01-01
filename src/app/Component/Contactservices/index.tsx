import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { axiosLead, axiosPublic, } from '@/common/axiosPublic';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPublic } from '@/app/common/axiosPublic';
import { basepath } from '@/app/common/constants';

export default function Contactservices({
    isFromOffer=false,   data, closeModel,
}: {isFromOffer:boolean, data: any, closeModel: any}) {
    const [isLoading, setLoading] = useState(false);
    const phoneRegExp = /^(?!.*\D).{10}$/;
    const formik = useFormik({
        validateOnBlur:false,
        initialValues: {
            trailId:'',
            fullName: '',
            email: '',
            mobile: '',
            educationalQualification: '',
            designation : '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
 
                .required('Please enter a valid first name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),
 
            email: Yup.string().email('Invalid email address') .required('Please enter a valid email'),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            educationalQualification: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid Qualification'),
            designation: Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid Role'),
 
 
        }),
        onSubmit: async (values, { resetForm }) => {
 
 
            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
                let payload = {
                    ...values,
                    trailId: undefined, 
                };

                let payloadData={
                    firstName : values.fullName,
                    emailId : values.email,
                    phNumber : values.mobile,
                    degree : values.educationalQualification,
                    jobTitle : values.designation,
                    utmSource : 'Website-Leads',
                    action : 'Book-Trial',
                }
 
                const result = await axiosPublic.post('/lms/add-contact-service', payload);

                // const res = await axiosLead.post('/gktsage/gkcs/leadCapture/store', payloadData);
 
                setLoading(false);
                if(isFromOffer){
                    toast.success("Thanks for your interest, one of our Sales Agent will get in touch with you shortly")
                }else{
                    toast.success("Form submitted successfully")
                }
               
                closeModel(true);
               
                resetForm();
 
            } catch (error: any) {
                setLoading(false);
             
                toast.error(error!.message);
                closeModel();
 
            }
        },
    });
    // const basePath  = commonbasePath;
    return <section className='relative  mx-auto p-10 bg-white rounded-2xl w-[90%] md:w-[50%] lg:w-[50%] md:h-36 lg:h-auto overflow-y-auto z-50'>
          <img
            onClick={(e) => {
                closeModel(false)
            }}
            alt='cancel icon'
            className="cursor-pointer absolute text-blue-500 bg-black rounded-full h-6 w-6 top-4 right-4"
            src={`${basepath}/cancel.png`} />
 
        <form   id='my-form' autoComplete="off" onSubmit={formik.handleSubmit}>
            <p className='text-3xl font-semibold'>Contact Services </p>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('fullName')}
                        type="text"
                        maxLength={50}
 
                       
                        placeholder='Name *'
 
                        className="block px-4 w-full border border-black rounded-lg bg-white h-14 text-black shadow-sm ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.fullName ? (
                        <div className="text-sm text-red-500 mt-2 ml-2">{formik.errors.fullName}</div>
                    ) : null}
                </div>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('mobile')}
                        type="text"
 
                        maxLength={10}
                       
                        placeholder='Phone Number *'
 
                        className="block px-4 w-full border border-black rounded-lg bg-white h-14 text-black shadow-sm ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.mobile ? (
                        <div className="text-sm text-red-500 mt-2 ml-2">{formik.errors.mobile}</div>
                    ) : null}
                </div>
            </div>
 
          
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('email')}
                        type="text"
 
                        maxLength={50}
                       
                        placeholder='Email *'
 
                        className="block px-4 w-full border border-black rounded-lg bg-white h-14 text-black shadow-sm ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.email ? (
                        <div className="text-sm text-red-500 mt-2 ml-2">{formik.errors.email}</div>
                    ) : null}
                </div>
              
            </div>
     
            <div className='mt-4 flex flex-row gap-8'>
                  <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('educationalQualification')}
                        type="text"
 
 
                        maxLength={50}
                        placeholder='Education Qualification'
 
                        className="block px-4 w-full border border-black rounded-lg bg-white h-14 text-black shadow-sm ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.educationalQualification ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.educationalQualification}</div>
                    ) : null}
                </div>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('designation')}
                        type="text"
 
 
                        maxLength={50}
                        placeholder='Job Role'
 
                        className="block px-4 w-full border border-black rounded-lg bg-white h-14 text-black shadow-sm ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.designation ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.designation}</div>
                    ) : null}
                </div>
            </div>
 
 
 
            <button form='my-form' type='submit' className="mt-4 flex w-full justify-center rounded bg-purple-500 p-3 font-medium text-black ">
                {
                    isLoading ? "Loading.." : "Submit"
                }
            </button>
        </form>
 
    </section>
}