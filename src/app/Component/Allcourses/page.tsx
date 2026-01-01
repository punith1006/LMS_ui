'use client'
import { useState, useEffect, Suspense } from "react";
import Sidebar from "../Sidebar/Sidebar";
import CourseCard from "../CourseCard/CourseCard";
import CourseNav from "../CourseNav/CourseNav";
import { useCourseManagement } from "@/app/hooks/useCourseManagement";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Certifications from "@/app/Certifications/page";
//import { useSearchParams } from "next/navigation";
import ClientSearchParams from "@/app/common/clientsearchparams";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<"courses" | "certifications">("courses");
  const [queryParams, setQueryParams] = useState<{ technology: string | null; filter: string | null; hub: string | null }>({
    technology: null,
    filter: null,
    hub: null,
  });
  const {
    courses,
    displayedCourses,
    handleLoadMore,
    handleFilter,
    handleSearch,
    hasMore,
    setCurrentPage,
    setDisplayedCourses,
    setFilteredCourses,
    setCurrentFilters,
    coursesPerPage,
  } = useCourseManagement(9, queryParams.technology, queryParams.filter, queryParams.hub);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="bg-black min-h-screen">
        
        <Header  />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-48 mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <div className="h-96 bg-gray-800 rounded"></div>
              </div>
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-800 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black">
            <ClientSearchParams onParamsChange={setQueryParams} /> {/* ✅ Extract query params safely */}

      <main>
        <Header />

        <div className="container mx-auto px-4 py-8">
          <CourseNav activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "courses" ? (
            <div className="flex flex-row lg:flex-row gap-8 ">
              <aside className="lg:w-1/4 ">

                <Sidebar
                  onFilter={handleFilter}
                  courses={courses}
                  onSearch={handleSearch}
                  setCurrentPage={setCurrentPage}
                  setDisplayedCourses={setDisplayedCourses}
                  setFilteredCourses={setFilteredCourses}
                  setCurrentFilters={setCurrentFilters}
                  coursesPerPage={coursesPerPage}
                />
              </aside>
              <main className="lg:w-3/4">
                <CourseCard
                  courses={displayedCourses}
                  onLoadMore={handleLoadMore}
                  hasMore={hasMore}
                />
              </main>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 justify-center">

              <Certifications />
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}