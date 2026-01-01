"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import SessionForm from "../Form/SessionForm";
import CryptoJS from 'crypto-js';
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import { axiosPublic } from "@/app/common/axiosPublic";
import { basepath } from "@/app/common/constants";
 
const Course_details = ({course}:{course:any}) => {
  const [isClient, setIsClient] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [startTime_Date, setStartTime_Date] = useState<any>(null);
    const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
    const [timeSpent, setTimeSpent] = useState(0);
  console.log(course);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {

    // Set the start time when the component is mounted (first load)
    setStartTime(Date.now());
setStartTime_Date(new Date());
    
    
console.log('ue',course[0]?.title);

  }, [course]);
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
    console.log("course",course);

    // Function to calculate time spent when the route changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
      if (startTime) {
        const endTime = Date.now();
        const timeSpentOnPage = (endTime - startTime) / 1000; // Time in seconds
        setTimeSpent((prevTime) => prevTime + timeSpentOnPage); // Store the time spent
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${course[0]?.title}`,new Date().toLocaleTimeString('en-US'
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
        console.log(`Time spent on page: ${timeSpentOnPage} seconds in ${course[0]?.title},${course[0]?.Partner.partnerName},date:${startTime_Date.toLocaleDateString()},time:${startTime_Date.toLocaleTimeString()}`,startTime_Date,new Date(),new Date().toLocaleTimeString('en-US'
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
            visited_course: course[0]?.title,
            visited_course_time:(Math.floor(timeSpentOnPage)>60?Math.floor(timeSpentOnPage / 60)+" min":Math.floor(timeSpentOnPage)+" sec"),
            startTime:startTime_Date,
            endTime:new Date(),
            partner: course[0]?.Partner.partnerName,
            page_type: "Course",
            category: course[0]?.CourseCategory.categoryName,

          });
        }
        }
       
          

    };
  }, [startTime]);
 
  if (!isClient) return null;
    return (
      <div className="flex  items-center justify-center relative ">
        <img src={`${basepath}/course_icon/bg1.jpg`} alt="bg" className="absolute w-full h-[550px] object-fill opacity-90" />
        <div className="bg-black bg-opacity-70 items-start justify-start rounded-lg w-[1000px] border-white border-[1px] border-opacity-15 z-10 md:grid grid-cols-2 sm:grid md:grid-cols-2 sm:grid-cols-1 mt-4">
          <div>
            <div className="text-left bg-transparent p-2">
              {course.length > 0 &&
                course.map((user:any, index:number) => (
                  <div key={user.id || index}>
                    <h1 className="text-4xl font-semibold text-blue-400 mt-10 mb-6 px-6 hover:text-white">
                      {user.title}
                    </h1>
                    <p className="text-lg mt-4 w-full text-gray-200 content-left mb-4 px-6 text-justify line-clamp-6">
                      {user.description}
                    </p>
                  </div>
                ))}
            </div>
            {course[0]?.partnerId==3?
            <div className="flex items-center space-x-3 px-6">
              <div className="bg-gray-400 flex space-x-3 px-6 items-center rounded-xl bg-opacity-30">
                <Image src={`${basepath}/Hiring-company/cloud.jpg`} alt="cloud certificate logo" width={45} height={45} className="rounded-full" />
                <span className="text-xl font-semibold text-white">Certified by</span>
                <Image src={`${basepath}/Hiring-company/google.svg`} alt="Google logo" width={80} height={80} />
              </div>
            </div>:null}
            {/* <div className="mt-4 space-x-4 px-6 mb-5">
              <button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-400  duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur  hover:underline-offset-4  origin-left hover:decoration-2 hover:text-purple-500 relative bg-neutral-800 h-12 w-44 border text-center p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10  before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-purple-500 after:bg-opacity-50 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                Enroll Now
              </button>
            </div> */}
          </div>
          <div className="z-20 justify-items-center">
          <SessionForm
            type="Course"
            referenceId={course[0]?.courseId}
            referenceCode={course[0]?.courseCode}
            requestDescription={course[0]?.title}
          />          </div>
        </div>
      </div>
    );
  };
 
 
export default Course_details;
 