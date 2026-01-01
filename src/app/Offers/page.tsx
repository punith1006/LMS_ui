"use client";
import { Suspense, useState } from "react";
import { useCourseManagement } from "@/app/hooks/useCourseManagement";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import OffersNav from "../Component/OffersNav/OffersNav";
import OffersCard from "../Component/OffersCard/OffersCard";
import { basepath } from "../common/constants";
import { useSearchParams } from "next/navigation";
import ClientSearchParams from "../common/clientsearchparams";

export default function Offers() {
  const [queryParams, setQueryParams] = useState<{ technology: string | null; filter: string | null; hub: string | null }>({
    technology: null,
    filter: null,
    hub: null,
  });
  const {
    courses,
    displayedCourses,
    handleLoadMore,
    hasMore
  } = useCourseManagement(9, queryParams.technology, queryParams.filter, queryParams.hub);
  
  const [activeTab, setActiveTab] = useState<'Courses' | 'webinars'>('Courses');

  return (
    <div className=" bg-black">
      <main >
 <Suspense fallback={<div>Loading filters...</div>}>
          <ClientSearchParams onParamsChange={setQueryParams} /> 
        </Suspense>
    <Header />

        <div className="container mx-auto px-4 py-8">
          <OffersNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
          
          {activeTab === 'Courses' ? (
            <div className="flex flex-col lg:flex-row gap-8">

                <OffersCard 
                  courses={displayedCourses} 
                />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-col justify-center   items-center">
           <img src={`${basepath}/online-meeting.png`} className="h-20"/>
            <h1 className="text-gray-600 text-lg font-semibold m-5">Enroll the Course and Join the Webinars</h1>
          </div>
          )}
        </div>
        <Footer/>
      </main>
    </div>
  );
}
