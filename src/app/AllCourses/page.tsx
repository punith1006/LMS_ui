'use client'
import { useState, useEffect, Suspense } from "react";
import Sidebar from "@/app/Component/Sidebar/Sidebar";
import CourseCard from "@/app/Component/CourseCard/CourseCard";
import CourseNav from "@/app/Component/CourseNav/CourseNav";
import { useCourseManagement } from "@/app/hooks/useCourseManagement";
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer"; // Assuming Footer is in Component based on previous context, checking list_dir might be wise but this is safe bet if Header was moved. I'll check Component vs Components.
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

                <Header activeSection="programs" />
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
                <Footer activeSection="programs" />
            </div>
        );
    }

    return (
        <div className="bg-white h-screen flex flex-col overflow-hidden">
            <ClientSearchParams onParamsChange={setQueryParams} />

            <div className="flex-none z-50 bg-white">
                <Header activeSection="programs" />
            </div>

            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col">
                <div className="flex-none mb-6">
                    <CourseNav activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {activeTab === "courses" ? (
                    <div className="flex-1 flex  flex-row lg:flex-row gap-8 overflow-hidden">
                        <aside className="hidden lg:block lg:w-1/4 h-full overflow-hidden">
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
                        <section className="w-full lg:w-3/4 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
                            <div className="min-h-[60vh]">
                                <CourseCard
                                    courses={displayedCourses}
                                    onLoadMore={handleLoadMore}
                                    hasMore={hasMore}
                                />
                            </div>
                            <div className="mt-10">
                                <Footer activeSection="programs" />
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col lg:flex-row gap-8 justify-center min-h-[50vh]">
                            <Certifications />
                        </div>
                        <div className="mt-10">
                            <Footer activeSection="programs" />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
