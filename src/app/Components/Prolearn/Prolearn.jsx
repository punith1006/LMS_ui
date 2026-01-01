import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import useUserData from "@/app/hooks/userData";
import { useRouter } from "next/navigation";

export default function Prolearn() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const { userData } = useUserData();
    const [userCourses, setUserCourses] = useState([]);
    const router = useRouter();

    const [coursecard, setcoursecard] = useState([
        {
            Title: "IBM Cloud for Business: Professional Developer",
            Description: 'A role-based training and certification path that prepares developers to design, build, deploy, and manage cloud applications on the IBM Cloud platform, demonstrating practical cloud development competencies.',
            Code: "GKT012",
            courseId: 130,
            Duration: "6 hrs",
            Imageurl: "/Courses/course5.png",
            slug: "ibm-cloud-for-business-professional-developer"
        },
        {
            Title: "Prompt Engineering for GEN AI",
            Description: 'Prompt Engineering is the practice of designing clear, structured, and effective inputs to guide Generative AI models in producing accurate, relevant, and high-quality outputs. This module covers prompt fundamentals',
            Code: "GKT013",
            courseId: 11,
            Duration: "6 hrs",
            Imageurl: "/Courses/course1.png",
            slug: "prompt-engineering-for-gen-ai"
        },
        {
            Title: "AI-Driven Data Insights",
            Description: 'AI-Driven Data Insights focuses on using artificial intelligence and machine learning to analyze large datasets, uncover patterns, and generate actionable insights. This module covers data preparation, AI-powered analytics',
            Code: "GKT014",
            courseId: 12, // Assuming IDs for others
            Duration: "6 hrs",
            Imageurl: "/Courses/course2.png",
            slug: "ai-driven-data-insights"
        },

        {
            Title: "Empowering Semantic Search with LLM",
            Description: 'Unlock the next generation of information retrieval by combining Large Language Models (LLMs) with vector-based search. This course explores how to upgrade traditional keyword matching to context-aware semantic search, enabling applications to understand user intent with unprecedented accuracy. You will learn to implement vector embeddings, manage vector databases, and architect Retrieval-Augmented Generation (RAG) pipelines to build smarter, more intuitive search engines.',
            Code: "GKT015",
            Duration: "6 hrs",
            Imageurl: "/Courses/course4.png",
        },
        {
            Title: "Building AI Application With Large Language Model",
            Description: 'Learn to build the next generation of intelligent software. Building AI Applications with Large Language Models is a hands-on guide to harnessing the power of GenAI. We cover the essential tools and techniques—including LangChain, vector stores, and RAG (Retrieval-Augmented Generation)—empowering you to prototype, iterate, and deploy scalable AI solutions confidently.',
            Code: "GKT016",
            Duration: "6 hrs",
            Imageurl: "/Courses/course2.png",
        },
        {
            Title: "Langchain for Business",
            Description: 'LangChain provides tools to connect LLMs with external data, APIs, and logic, enabling more advanced use cases than simple prompt-response interactions.',
            Code: "GKT017",
            Duration: "6 hrs",
            Imageurl: "/Courses/course3.png",
        },
    ]);

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (userData?.userId) {
                try {
                    const response = await axiosPrivate.get("/user/user-course", {
                        params: { userId: userData.userId }
                    });
                    // Assuming API returns { courses: [{ courseId: 1, ... }, ...] } or similar
                    // Adjust based on actual response structure. 
                    // If response is array: response.data
                    // If response object with key: response.data.courses

                    // Based on typical patterns in this project, response.data.userCourses or just checking the list
                    const courses = response.data?.userCourses || response.data || [];
                    const enrolledIds = courses.map(c => c.courseId);
                    setUserCourses(enrolledIds);
                } catch (error) {
                    console.error("Error fetching user courses:", error);
                }
            }
        };

        fetchUserCourses();
    }, [userData]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
            setCurrentIndex(0);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, coursecard.length - visibleCards);

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + visibleCards, maxIndex));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - visibleCards, 0));
    };

    const translateX = -(currentIndex * (100 / visibleCards));
    const totalSlides = Math.ceil(coursecard.length / visibleCards);

    const handleCardAction = (card) => {
        const slug = card.slug || card.Code;
        router.push(`/prolearn/${slug}`);
    };

    return (
        <div className="relative w-full z-10 bg-[#F6F6F9] px-4 md:px-20 lg:px-40 py-10">
            <div className="mb-6">
                <span className="inline-block px-4 py-2 text-orange-500 shadow-md bg-white rounded-full text-sm font-light">
                    Pro Learn
                </span>
            </div>

            <div className="relative w-full flex flex-col justify-center items-center z-10">
                {/* Slider Container */}
                <div className="relative w-full p-2">
                    <div className="overflow-hidden p-2">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(${translateX}%)` }}
                        >
                            {coursecard.map((card, i) => {
                                const isEnrolled = userCourses.includes(card.courseId);
                                return (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 px-2 md:px-3"
                                        style={{ width: `${100 / visibleCards}%` }}
                                    >
                                        <div className="flex flex-col justify-between items-center h-full p-2 bg-white rounded-xl  transform duration-700 hover:scale-105 cursor-pointer transition">
                                            <div className="w-full h-32 relative">
                                                <Image
                                                    src={card.Imageurl}
                                                    alt={card.Title}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className="flex justify-between w-full p-3 text-[10px] text-gray-700">
                                                <span>{card.Code}</span>
                                                <span className="flex gap-1">
                                                    <Image
                                                        src="/duration.svg"
                                                        height={10}
                                                        width={16}
                                                        alt="duration_icon"
                                                    />
                                                    {card.Duration}
                                                </span>
                                            </div>
                                            <div className="text-start font-normal w-full pl-3 pt-1 pb-3 pr-3 text-black text-md">
                                                {card.Title}
                                            </div>
                                            <div className="text-start font-light w-full pl-3 pt-1 pb-3 pr-3 text-black text-[10px]">
                                                {card.Description}
                                            </div>

                                            <div className="flex flex-col w-full">

                                                <div className="w-full flex justify-start items-end relative bottom-0">
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCardAction(card);
                                                        }}
                                                        className={`mt-2 mb-2 text-sm font-medium cursor-pointer hover:underline ${isEnrolled ? 'text-green-600' : 'text-blue-600'}`}
                                                    >
                                                        {isEnrolled ? "Continue Learning →" : "Register Now →"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6  text-orange-500 rounded-full p-2 md:p-2 cursor-pointer transition-all duration-300 z-10  ${currentIndex === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-600 hover:scale-110 hover:text-white'
                            }`}
                    >
                        <ChevronsLeft />
                    </div>


                    <div
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 text-orange-500 rounded-full p-2 md:p-2 cursor-pointer transition-all duration-300 z-10 ${currentIndex >= maxIndex
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-600 hover:scale-110 hover:text-white'
                            }`}
                    >
                        <ChevronsRight />
                    </div>

                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx * visibleCards)}
                            className={`h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / visibleCards) === idx
                                ? 'bg-[#EB900C] w-8'
                                : 'bg-gray-300 w-2 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-8">
                    <button
                        onClick={() => router.push('/AllCourses')}
                        className="px-6 py-2 border-2 border-[#EB900C] text-[#EB900C] rounded-full font-medium hover:bg-[#EB900C] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}