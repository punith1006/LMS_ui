import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosPublic } from '@/app/common/axiosPublic';
import { useState,useEffect } from 'react';
import useUserData from '@/app/hooks/userData';
import { toast } from 'react-toastify';
import { basepath } from "@/app/common/constants";

export default function WebinarFormComponent({
    data, closeModel
}: { data: any, closeModel: any }) {
    const [isLoading, setLoading] = useState(false);
    const { userData, } = useUserData();
    const basePath  = basepath;
    useEffect(() => {
        if(!userData){
            return;
        }
        formik.setValues({
            firstName: userData?.
                first_name
                ?? "",
          
            email: userData?.email ?? "",
            phone: userData?.

                mobile_number

                ?? "",
          
            company: '',
        })
    }, [userData])
    const phoneRegExp = /^(?!.*\D).{10}$/;
    const formik = useFormik({
        validateOnBlur:false,
        initialValues: {
            firstName: '',

            email: '',
            phone: '',

            company: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()

                .required('Please enter a valid name').matches(/^[A-Za-z\s]+$/, 'Only letters are allowed'),


            email: Yup.string().email('Invalid email address').required('Please enter a valid email'),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter a valid phone number'),
            company:  Yup.string().matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid company name')

            ,

        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);
                let payload: any = {

                    "webinarId": data.webinarId,
                    "webinarScheduleId": data.WebinarSchedules.length == 0 ? "" : data.WebinarSchedules[0].webinarScheduleId,
                    "name": values.firstName,
                    "email": values.email,
                    "companyName": values.company,
                    "mobile": values.phone,
                };
                if (userData != null) {
                    payload.userId = userData?.userId
                }
                const result = await axiosPublic.post('/lms/add-webinar-registeration', payload);


                setLoading(false);
                toast.success("Form submitted successfully")
                closeModel();
             
                resetForm();

            } catch (error: any) {
                setLoading(false);
              
                toast.error(error!.message);
                closeModel();

            }
        },
    });
    return <form autoComplete="off" onSubmit={formik.handleSubmit} className='relative  mx-auto box-border border  p-10 border-blue border-1 bg-dark_blue rounded-2xl'>
        <img
        alt='cancel icon'
            onClick={(e) => {
                closeModel()
            }}
            className="cursor-pointer absolute text-blue h-6 w-6 top-4 right-4"
            src={`${basePath}/cancel.png`} />

        <h3 className='text-lg mt-4 text-white font-medium text-center'>Webinar Registration</h3>

        <section>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('firstName')}
                        type="text"
                        maxLength={50}

                        
                        placeholder='Name *'
                   
                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.firstName ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.firstName}</div>
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
                    
                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.email ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.email}</div>
                    ) : null}
                </div>

            </div>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('phone')}
                        type="text"

                        maxLength={10}
                        
                        placeholder='Phone Number *'
                      
                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.phone ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.phone}</div>
                    ) : null}
                </div>
            </div>
            <div className='mt-4 flex flex-row gap-8'>
                <div className='flex-1'>
                    <input
                        {...formik.getFieldProps('company')}
                        type="text"

                        maxLength={50}
                        
                        placeholder='Company Name'
                     
                        className="block px-4 w-full border-1  rounded-lg bg-primary_color h-14 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.company ? (
                        <div className="text-sm text-red mt-2 ml-2">{formik.errors.company}</div>
                    ) : null}
                </div>

            </div>


            <button type='submit' className="mt-4 flex w-full justify-center rounded bg-blue p-3 font-medium text-white ">
                {
                    isLoading ? "Loading.." : "Submit"
                }
            </button>
        </section>

    </form>
}