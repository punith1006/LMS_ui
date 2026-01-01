'use client'
import React, { useEffect, useState } from 'react';
import { 
    fetchCertificateBySlug, 
    CertificateData, 
    CertificateCourseCostPlan, 
    CertificateCourseItem 
} from '@/app/utils/api';
import Header from '@/app/Component/Header/Header';
import Footer from '@/app/Component/Footer/Footer';
import { usePathname, useRouter } from "next/navigation";
import SessionForm from '@/app/Component/Course/Form/SessionForm';
import { axiosPublic } from '@/app/common/axiosPublic';
import CryptoJS from 'crypto-js';
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
const CertificationCourse = () => {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();  
  let slug = pathname.split('/').pop();
  const router=useRouter();
  
  const [startTime, setStartTime] = useState(0);
  const [startTime_Date, setStartTime_Date] = useState<any>(null);
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const fetchCertificateData = async () => {

      if (!slug) {
        setError('No course slug provided');
        return;
      }

      try {
        const data = await fetchCertificateBySlug(slug);

        if (data && Object.keys(data).length > 0) {
          setCertificateData(data);
        } else {
          setError('No data found for the provided course.');
        }
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to fetch certificate data');
      }
    };

    fetchCertificateData();
  }, [slug]);
  useEffect(() => {

    // Set the start time when the component is mounted (first load)
    setStartTime(Date.now());
setStartTime_Date(new Date());
    
    
console.log('ue',certificateData?.title);

  }, [slug]);
  const decryptData = (encryptedData: any): any => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption error:", error);
      return "";
    }
  };
  useEffect(() => {

    // Function to calculate time spent when the route changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
      if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Time in seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${certificateData?.title}`,new Date().toLocaleTimeString('en-US'
          , {  
          hour
          :
          '2-digit'
          ,  
          minute
          :
          '2-digit'
          ,  
          second
          :
          '2-digit'
          ,  
          hour12
          : true
          // Toggle 12-hour or 24-hour format
          }));
          setStartTime(0);
                    console.log(Date.now());
          
      }
    }else if (document.visibilityState === 'visible') {
      // Reset the start time when the user returns
      setStartTime(Date.now());
      setStartTime_Date(new Date());
    }
  }

    // Listen to route changes to calculate the time spent when the user navigates away
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // console.log(tabclose);
      console.log(startTime);
      
            if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Convert ms to seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent when the page is unloaded
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${certificateData?.title},date:${startTime_Date.toLocaleDateString()},time:${startTime_Date.toLocaleTimeString()}`,startTime_Date,new Date(),new Date().toLocaleTimeString('en-US'
          , {  
          hour
          :
          '2-digit'
          ,  
          minute
          :
          '2-digit'
          ,  
          second
          :
          '2-digit'
          ,  
          hour12
          : true
          // Toggle 12-hour or 24-hour format
          }));     
        
          const decrypteduserdetail =getCookie("uid")? decryptData(getCookie("uid")):"";
          const decryptedreqform =getCookie("_req")? decryptData(getCookie("_req")):"";

            // console.log(JSON.parse(decrypteduserdetail).phone);
            // console.log(JSON.parse(decrypteduserdetail).email);
          
         
          // console.log(JSON.parse(decryptedreqform));

          console.log(getCookie("anonymous_id"));
          if (Math.floor(timeSpentOnPage)>0) {

          const result =  axiosPublic.post("/lms/add-cookies", {
            userName:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).username:"",
            email:decrypteduserdetail!=""? JSON.parse(decrypteduserdetail).email:"",
            phoneNo:decrypteduserdetail!=""?  JSON.parse(decrypteduserdetail).phone:"",
            visitorId:getCookie("anonymous_id"),
            reqform_username:decryptedreqform!=""?JSON.parse(decryptedreqform).firstName:"",
            reqform_email: decryptedreqform!=""?JSON.parse(decryptedreqform).email:"",
            reqform_phoneno:decryptedreqform!=""?JSON.parse(decryptedreqform).phone:"",
            visited_course: certificateData?.title,
            visited_course_time:(Math.floor(timeSpentOnPage)>60?Math.floor(timeSpentOnPage / 60)+" min":Math.floor(timeSpentOnPage)+" sec"),
            startTime:startTime_Date,
            endTime:new Date(),
            partner: "",
            page_type: "Certificate",
            category: "",

          });
        }
        }
       
          

    };
  }, [startTime]);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!certificateData) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <>
      <Header />
      <main className="min-h-screen">
                <div className="container w-full px-14 py-12 ">
                    <div className="flex flex-col lg:flex-row gap- mb-12 border-[0.3px] rounded-xl">
                        <div className="lg:w-1/2">
                            <div className=" p-8 h-full flex flex-col justify-between ">
                                <div className="space-y-6">
                                    <h1 className="text-4xl font-bold text-white leading-tight">{certificateData.title}</h1>
                                    <p className="text-gray-300 text-lg leading-relaxed">{certificateData.description}</p>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 font-medium">Courses:</span>
                                        <span className="text-purple-400 font-semibold">
                                            {certificateData.CertificateCourseCostPlans?.[0]?.CertificateCourseItems?.length || 0}
                                        </span>
                                    </div>
                                    <button className="w-full sm:w-auto bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <SessionForm type={'Certificate'} referenceId={0} referenceCode={''} requestDescription={''}/>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <span>Courses</span>
                            <div className="h-1 flex-grow bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certificateData?.CertificateCourseCostPlans?.length > 0 ? (
                                certificateData.CertificateCourseCostPlans.flatMap((plan: CertificateCourseCostPlan) => 
                                    plan.CertificateCourseItems.map((item: CertificateCourseItem,index:number) => (
                                        <div 
                                        key={index}
                                        onClick={() => router.push(`/Courses/${item.Course.slug}`)}

                                            className="w-full border-[0.5px] rounded-2xl cursor-pointer text-white p-[1em] flex flex-col gap-[0.75em] backdrop-blur-[12px] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <h4 className="text-lg font-medium">{item.Course.title}</h4>
                                        </div>
                                    ))
                                )
                            ) : (
                                <div className="col-span-full text-center text-gray-400 py-12">No course items available.</div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
    </>
  );
};

export default CertificationCourse;



