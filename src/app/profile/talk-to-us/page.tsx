'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import { useEffect, useState } from "react";


import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Index() {
    let [course, setCourse] = useState<any[]>([]);
    useEffect(() => {

        fetchCourse();



    }, [])


    const fetchCourse = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course');
            
            setCourse(result.data);






        } catch (error) {

        }
    }
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const formik = useFormik({
        validateOnBlur:false,
        initialValues: {
            subject: '',
            message: '',

        },
        validationSchema: Yup.object({
            subject: Yup.string()

                .required('Please enter a valid subject') .matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid subject'),

            message: Yup.string().required('Please enter a valid message') .matches(/^[a-zA-Z0-9 ._\-,()\[\]]+$/,'Pleaes enter a valid message'),


        }),
        onSubmit: async (values, { resetForm }) => {


            try {
                if (isLoading) {
                    return;
                }
                setLoading(true);

                const result = await axiosPrivate.post('/user/add-user-inquiry', {
                    subject: values.subject,
                    message: values.message
                });


                setLoading(false);
                toast.success("Form submitted successfully")
              
                resetForm();

            } catch (error: any) {
                setLoading(false);
              
                toast.error(error!.message);

            }
        },
    });
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <h2 className="text-xl font-medium text-white">Talk with us</h2>

                <form autoComplete="off" onSubmit={formik.handleSubmit} className="flex-1 w-full flex-col mt-12">

                    <section className="flex flex-col md:flex-row mb-8">
                        <p className="text-[#ECF4FFBF] w-24 mb-2 md:mb-0">Subject *</p>
                        <div className='flex-1'>
                            <input
                                {...formik.getFieldProps('subject')}
                                type="text"


                                


                                className="block px-4 w-full rounded-sm bg-[#101635] h-14 text-white  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                            />
                            {formik.errors.subject ? (
                                <div className="text-sm text-red mt-2 ml-2">{formik.errors.subject}</div>
                            ) : null}
                        </div>
                    </section>
                    <section className="flex flex-col md:flex-row mb-8">
                        <p className="text-[#ECF4FFBF] w-24 mb-2 md:mb-0">Message *</p>
                        <div className='flex-1'>
                            <textarea
                                {...formik.getFieldProps('message')}
                                rows={5}


                                


                                className="block px-4 w-full rounded-sm bg-[#101635]  text-white  placeholder:font-medium placeholder:text-gray-400 placeholder:pl-3  sm:text-sm sm:leading-6"
                            />
                            {formik.errors.message ? (
                                <div className="text-sm text-red mt-2 ml-2">{formik.errors.message}</div>
                            ) : null}
                        </div>
                    </section>
                   <div className="w-full flex justify-center items-center">
                   <button type='submit' className=" flex  justify-center rounded bg-sky-500 py-2 px-6 font-medium text-white ">
                {
                    isLoading ? "Loading.." : "Submit"
                }
            </button>
                   </div>
                </form>
            </main>
        </ProfileLayout>
    );
}
