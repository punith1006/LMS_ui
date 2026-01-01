"use client";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { axiosPublic } from "@/app/common/axiosPublic";
import imageHelper from "@/app/common/image_helper";
import { slugData } from "@/app/common/constants";
 
interface HiringCompany {
  id: number;
  imageUrl: string;
  name: string;
}
 
const TopHiringCompany = ({course}:{course:any}) => {
  const [hiringCompanies, setHiringCompanies] = useState<HiringCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const fetchCourseData = async (slug: string) => {
    if (!slug) {
      setError("No slug provided");
      setIsLoading(false);
      return;
    }
 
    try {
      setIsLoading(true);
      setError(null);
 
      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });
 
      const companies =
        response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.Hiring_Companies;
 
      if (!companies || !Array.isArray(companies)) {
        setHiringCompanies([]);
        console.warn("No hiring companies data found or invalid format");
        return;
      }
 
      setHiringCompanies(companies);
    } catch (error) {
      console.error("Failed to fetch hiring companies:", error);
      setError("Failed to load hiring companies");
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    if(course.length>0){
      fetchCourseData(course[0].slug);

          }
  }, [course]);
 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 bg-gray-100">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }
  if (!hiringCompanies.length) {
    return null;
  }
 
  return (
    <div className="overflow-hidden m-0 p-0 z-50">
      <h2 className="text-center text-white text-2xl font-bold mb-4 px-6">
        Top Hiring Companies
      </h2>
      <div className="flex">
        <div className="flex-shrink-0 w-full h-32">
          <Marquee speed={40} className="bg-white">
            {hiringCompanies.map((src, index) => (
              <img
                loading="lazy"
                key={`company-${index}`}
                src={imageHelper(src)}
                alt={`Hiring Company ${index + 1}`}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mx-4"
              />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};
 
export default TopHiringCompany;
 
 