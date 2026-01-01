"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { basepath } from "@/app/common/constants";
import SessionForm from "@/app/Component/Course/Form/SessionForm";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import useUserData from "@/app/hooks/userData";

const ProlearnCourse = ({ course }: { course: any }) => {
    const [isClient, setIsClient] = useState(false);
    const { userData } = useUserData();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const checkEnrollmentAndProgress = async () => {
            if (userData?.userId && course && course.length > 0) {
                try {
                    // console.log("Checking enrollment for user:", userData.userId, "Course:", course[0]?.courseId);
                    const response = await axiosPrivate.get("/user/user-course", {
                        params: { userId: userData.userId }
                    });
                    const courses = response.data?.userCourses || response.data || [];
                    const found = courses.find((c: any) => c.courseId == course[0].courseId);
                    // console.log("Enrollment check result:", found ? "Enrolled" : "Not Enrolled", found);

                    if (found) {
                        setIsEnrolled(true);
                        // Check Progress if enrolled
                        try {
                            const progressResponse = await axiosPrivate.get("/user/user-course-progress", {
                                params: {
                                    courseId: course[0].courseId,
                                    userId: userData.userId
                                }
                            });
                            const userCourseProgress = progressResponse?.data?.userCourseProgresses ?? [];
                            if (userCourseProgress.length > 0 && userCourseProgress[0]?.autoCalculatedProgressPercentage === 100) {
                                setIsCompleted(true);
                            }
                        } catch (err) {
                            console.error("Error fetching progress:", err);
                        }
                    }
                } catch (error) {
                    console.error("Error checking enrollment:", error);
                }
            }
        };
        checkEnrollmentAndProgress();
    }, [userData, course]);

    if (!isClient) return null;

    if (!course || course.length === 0) {
        return <div className="text-center py-20">Loading Course Details...</div>;
    }

    const courseData = course[0];
    const { title, description, Partner, CourseContent } = courseData;
    const courseDetails = CourseContent?.courseContent?.course?.courseDetails;
    const modules = courseDetails?.content?.modules || [];
    const hiringCompanies = courseDetails?.Hiring_Companies || [];
    const faqs = CourseContent?.courseContent?.course?.FAQs?.QAndA || [];
    const whyJoin = courseDetails?.Why_join_this_program || [];

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans">

            {/* 1. HERO SECTION */}
            <div className="relative w-full py-16 md:py-24 bg-gray-50 overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <Image src={`${basepath}/course_icon/bg1.jpg`} alt="bg" fill className="object-cover grayscale" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="pt-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>
                        <p className="text-lg text-gray-600 mb-10 text-justify leading-relaxed">{description}</p>


                    </div>

                    <div className="lg:mt-0 mt-8 flex justify-center lg:justify-end">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
                            {isCompleted ? (
                                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Course Completed!</h3>
                                    <p className="text-gray-600 mb-8">Congratulations on finishing this course.</p>
                                    <button
                                        onClick={() => router.push('/profile/my-learning')}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) : isEnrolled ? (
                                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">You are Enrolled!</h3>
                                    <p className="text-gray-600 mb-8">Continue your learning journey.</p>
                                    <button
                                        onClick={() => router.push(`/profile/my-learning/${courseData.courseId}`)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            ) : (
                                <SessionForm type="Course" referenceId={courseData.courseId} referenceCode={courseData.courseCode} requestDescription={title} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. HIRING PARTNERS */}
            {hiringCompanies.length > 0 && (
                <div className="py-12 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-xl font-bold mb-8 text-gray-500 uppercase tracking-widest">Top Hiring Partners</h2>
                        <Marquee gradient={false} speed={40} className="items-center">
                            {hiringCompanies.map((img: string, i: number) => (
                                <div key={i} className="mx-8 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <img src={img} alt="company" className="h-10 md:h-12 w-auto object-contain" />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            )}

            {/* 3. CURRICULUM (Compact) */}
            {modules.length > 0 && (
                <div className="py-12 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-4 md:px-10">
                        <div className="text-center mb-10">
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs">Syllabus</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Course Curriculum</h2>
                        </div>

                        <div className="space-y-3">
                            {modules.map((mod: any, idx: number) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="px-5 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full font-bold text-xs border border-blue-100">{idx + 1}</span>
                                            <h3 className="text-base font-semibold text-gray-800">{mod.name}</h3>
                                        </div>
                                    </div>
                                    {mod.moduleItems && mod.moduleItems.length > 0 && (
                                        <div className="px-5 pb-4 pl-12 text-gray-600">
                                            {mod.moduleItems.map((item: any, i: number) => (
                                                <div key={i} className="flex items-center gap-2 py-1 text-xs border-l-[1px] border-gray-100 pl-3 hover:border-blue-500 transition-colors">
                                                    <span className="text-sm opacity-70">{item.mode === 'video' ? '📺' : '📝'}</span>
                                                    <span className="font-medium text-gray-700">{item.moduleItemName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 4. KEY FEATURES */}
            {whyJoin.length > 0 && (
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-600 rounded-2xl opacity-10 transform rotate-2"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 min-h-[400px]">
                                <Image src={`${basepath}/dummy/boy.png`} alt="Features" fill className="object-cover" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Join This Program?</h2>
                            <ul className="space-y-6">
                                {whyJoin.map((item: any, idx: number) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. FAQ (Compact Grid) */}
            {faqs.length > 0 && (
                <div className="py-12 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {faqs.map((faq: any, idx: number) => (
                                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                                    <h3 className="font-bold text-base text-gray-900 mb-2 flex items-start gap-2">
                                        <span className="text-blue-500 text-lg">Q.</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm text-gray-600 pl-6 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProlearnCourse;
