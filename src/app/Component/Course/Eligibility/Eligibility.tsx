'use client'
import React, { useEffect, useState } from "react";
import { axiosPublic } from "@/app/common/axiosPublic";
import { slugData } from "@/app/common/constants";
import imageHelper from "@/app/common/image_helper";
 
interface EligibilityCriteria {
  image: string;
  toolName: string;
  description: string;
}
 
const Timeline = ({course}:{course:any}) => {
  const [eligibility, setEligibility] = useState<EligibilityCriteria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const fetchEligibility = async (slug: string) => {
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
     
      const criteria = response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.Eligibility_Criteria;
     
      if (!criteria || !Array.isArray(criteria)) {
        setEligibility([]);
        console.warn("No eligibility criteria found or invalid format");
        return;
      }
 
      setEligibility(criteria);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError("Failed to load eligibility criteria");
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    if(course.length>0){
      fetchEligibility(course[0].slug);

          }
  }, [course]);
 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-transparent">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-transparent">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
 
  if (!eligibility.length) {
    return null;
  }
 
  return (
    <div className="relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl py-12">
      <div className="relative text-center mb-8">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          Eligibility Criteria
        </h1>
      </div>
      <div className="relative flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
        {eligibility.map((item, index) => (
          <div key={index} className="flex justify-center">
            <div className="flex items-center space-x-4 h-40 w-full max-w-ms md:max-w-sm lg:max-w-md bg-white shadow-lg rounded-full p-4 md:p-6 border-[10px] border-purple-400">
              <div className="flex items-center justify-center bg-white rounded-full shadow-lg h-20 w-40">
                <img
                  src={imageHelper(item.image)}
                  alt={`${item.toolName} icon`}
                  className="h-14 w-18"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-icon.png';
                    e.currentTarget.alt = 'Icon not available';
                  }}
                />
              </div>
              <div className="text-left">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                  {item.toolName}
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Timeline;
 