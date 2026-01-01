"use client";
import { axiosPublic } from "@/app/common/axiosPublic";
import { slugData } from "@/app/common/constants";
import BootcampTopics from "@/app/Component/Course/Bootcamp/Bootcamp";
import Course_details from "@/app/Component/Course/Course_details/Course_details";
import Eligibility from "@/app/Component/Course/Eligibility/Eligibility";
import FAQSection from "@/app/Component/Course/FAQ/Faq";
import FeatureAndRolesSection from "@/app/Component/Course/Feature&Role/FeatureandRole";
import SessionForm from "@/app/Component/Course/Form/SessionForm";
import Top_hiring_company from "@/app/Component/Course/Hiring_company/Top";
import CardSection from "@/app/Component/Course/Program/Program";
import Tools from "@/app/Component/Course/Tools/Tools";
import Footer from "@/app/Component/Footer/Footer";
import Header from "@/app/Component/Header/Header";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import imageHelper from "@/app/common/image_helper";
import Marquee from "react-fast-marquee";
import { FaUsers } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import CryptoJS from 'crypto-js';
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
const Courses = () => {
  const [Course, setCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname(); // Get the current pathname
  const slug = pathname.split("/").pop();
  useEffect(() => {
    if (slug) {
      const getData = async () => {
        const courses = await fetchCourseDetails(slug);
        setCourse(courses);
        setLoading(false);
        
      };
      getData();
    }
  }, [slug]);


  const fetchCourseDetails = async (slug: string) => {
    try {
      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });
      return response.data.courses;
    } catch (error) {
      console.error("Error fetching course details:", error);
      return [];
    }
  };
  const scienceItems =
  Course[0]?.CourseContent?.courseContent?.course?.courseDetails?.iScience || [];
  return (
    <div>
      <Header />
      {/* <video
        className="fixed top-0 left-0 w-full h-full object-cover opacity-90 blur-3xl"
        src="/video/course_bg1.mp4"
        autoPlay
        loop
        muted
      ></video> */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center z-10">
        <div className="w-full space-y-6 z-10">
          <Course_details course={Course} />
        </div>
      </div>
      <div>
      {Course[0]?.CourseContent?.courseContent?.course?.courseDetails?.DesignTemplate?
      Course[0]?.CourseContent?.courseContent?.course?.courseDetails?.DesignTemplate === 2 && (
        <>
          <div className="mt-20 w-auto">
            <div className="text-center mb-10">
              <h2 className="text-white font-bold text-4xl ">{Course[0].title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-4 p-4 items-center w-full h-full">
              
              {scienceItems.map((item: any, index: any) => (
                <div
                  key={index}
                  className={`flex flex-col h-full bg-black border-2 shadow-lg rounded-lg  overflow-hidden justify-between items-center`}      
                >
                  <div className="p-2 w-full">
                    <span className="text-4xl w-full font-bold mb-2 text-black bg-white rounded-lg text-center flex justify-center">
                    {item.title.split("-")[0]}
                    </span>
                    <span className="text-2xl w-full font-bold mb-2 text-white text-center flex justify-center">
                    {item.title.split("-")[1]}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={imageHelper(item.Imgurl)}
                      alt={`Image for ${item.title}`}
                      className="h-32 w-32 object-cover p-3 rounded-3xl"
                    />
                  </div>
                <div>
                                      
                <p className="text-sm text-gray-500 mt-2 p-2 text-justify ">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex  sm:flex-nowrap  items-center justify-between p-2 w-full mt-2">
                      <p className="text-base flex items-center gap-1 text-white w-full">
                        <span>
                          <IoTimer/>
                        </span>
                        {item.duration}
                      </p>
                      <p className="text-sm text-white flex items-center gap-1 w-full">
                        <span>
                          <FaUsers style={{fontSize:"20px"}}/>
                        </span>
                        {item.standard}
                      </p>
                      <div>
                        {/* <button
                          className="text-black hover:text-blue text-sm underline"
                          onClick={() => handleKnowMoreClick(index)}
                        >
                        </button> */}
                        {/* <button className="bg-gradient-to-r from-purple to-blue hover:from-pink hover:to-purple text-white font-bold p-1 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                        Know more →
                        </button> */}
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ):
     <>
        <CardSection course={Course}/>
        {Course.length > 0 ? (
          Course[0].academicsId== 1 ? (
            <Tools course={Course} />
          ) : null
        ) : null}
       

        <FeatureAndRolesSection course={Course} />
        <Eligibility course={Course} />
        </>
      }
        <BootcampTopics course={Course} />
        <FAQSection course={Course} />
        <Top_hiring_company course={Course} />
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
function decryptData(arg0: import("cookies-next").CookieValueTypes | Promise<import("cookies-next").CookieValueTypes>) {
  throw new Error("Function not implemented.");
}

