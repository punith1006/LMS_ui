'use client';
import {
    ClockIcon,
    FireIcon,
    AcademicCapIcon,
    TrophyIcon,
    ChartBarIcon,
    CheckBadgeIcon,
    PlayCircleIcon
} from '@heroicons/react/24/solid';
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import { useEffect, useState } from "react";
import useUserData from "@/app/hooks/userData";
import Image from 'next/image';
import { basepath } from "@/app/common/constants";

export default function MyLearningDashboard() {
    // --- State & Data Fetching (Preserved) ---
    const router = useRouter();
    const { userData } = useUserData();
    const [courses, setCourses] = useState<any[]>([]);
    const [userProgress, setUserProgress] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData?.userId) {
            Promise.all([fetchCourses(), fetchUserProgress()])
                .finally(() => setIsLoading(false));
        }
    }, [userData]);

    const fetchCourses = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course');
            setCourses(result.data || []);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const fetchUserProgress = async () => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: { "userId": userData.userId }
            });
            setUserProgress(response?.data?.userCourseProgresses ?? []);
        } catch (error) {
            console.error("Error fetching progress", error);
        }
    };

    // --- Derived Data ---
    const completedCourses = userProgress.filter((p: any) => p.courseStatus === "Completed");
    const inProgressCourses = userProgress.filter((p: any) => p.courseStatus !== "Completed");

    // Sort recently active
    const recentCourses = [...inProgressCourses].sort((a: any, b: any) => {
        return new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime();
    });

    // Helper to get course details by ID
    const getCourseDetails = (courseId: string) => {
        return courses.find((c) => c.Course.courseId == courseId);
    };

    const handleCourseClick = (courseId: any) => {
        router.push(`/profile/my-learning/${courseId}`);
    };

    const getRandomFallbackImage = (id: string | number) => {
        const images = [
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop", // Code
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2828&auto=format&fit=crop", // Matrix/abstract
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop", // Cyberpunk
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2940&auto=format&fit=crop", // Hack
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop"  // Chip/Tech
        ];
        // Ensure consistent image for same ID
        const index = typeof id === 'string' ? id.length % images.length : id % images.length;
        return images[index];
    };

    return (
        <ProfileLayout>
            <main className="min-h-screen w-full text-white p-4 md:p-8 font-sans bg-black">

                <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 relative">

                    {/* === LEFT COLUMN (Main Content - Scrollable) === */}
                    <div className="xl:col-span-5 space-y-6">

                        {/* 1. HERO BANNER */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-6 shadow-xl">
                            <div className="relative z-10 max-w-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="max-w-xl">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Ready to keep learning?</h1>
                                    <p className="text-indigo-100 text-sm leading-relaxed mb-0">
                                        Success in the tech industry belongs to those who never stop growing.
                                        Global Knowledge Technologies provides the expert-led guidance you need.
                                    </p>
                                </div>
                                <div className="flex gap-3 flex-shrink-0">
                                    <button onClick={() => document.getElementById('continue-learning')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2.5 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap">
                                        Resume Last Course
                                    </button>
                                    <button onClick={() => document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2.5 bg-indigo-500/30 text-white border border-indigo-400/30 font-semibold text-sm rounded-xl hover:bg-indigo-500/40 transition-colors backdrop-blur-sm whitespace-nowrap">
                                        Explore New Courses
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50">
                                <div className="absolute top-[-10px] right-10 w-12 h-12 bg-yellow-300 rounded-xl rotate-12 shadow-lg flex items-center justify-center text-xl">📝</div>
                                <div className="absolute bottom-[-10px] right-32 w-10 h-10 bg-pink-400 rounded-full shadow-lg flex items-center justify-center text-xl">🤖</div>
                                <div className="absolute top-1/2 right-10 w-8 h-8 bg-blue-400 rounded-lg -rotate-12 shadow-lg flex items-center justify-center text-lg">�</div>
                            </div>
                        </div>

                        {/* 2. STATS GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={<AcademicCapIcon className="w-6 h-6 text-indigo-400" />}
                                label="Courses Completed"
                                value={completedCourses.length.toString()}
                            />
                            <StatCard
                                icon={<CheckBadgeIcon className="w-6 h-6 text-blue-400" />}
                                label="Course Progress"
                                value={inProgressCourses.length.toString()}
                            />
                            <StatCard
                                icon={<ClockIcon className="w-6 h-6 text-purple-400" />}
                                label="Hours Learned"
                                value="11.5" // Mock data for now
                            />
                            <StatCard
                                icon={<FireIcon className="w-6 h-6 text-orange-400" />}
                                label="Streak (Days)"
                                value="5" // Mock data for now
                            />
                        </div>

                        {/* 3. CONTINUE LEARNING SECTION */}
                        <section id="continue-learning">
                            <div className="flex justify-between items-end mb-6">
                                <h2 className="text-xl font-semibold text-gray-200">Continue Learning</h2>
                                <button className="text-sm text-indigo-400 hover:text-indigo-300">See All</button>
                            </div>

                            <div className="space-y-4">
                                {recentCourses.length > 0 ? (
                                    recentCourses.map((progress: any, idx: number) => {
                                        const details = getCourseDetails(progress.courseId);
                                        const fallbackImg = getRandomFallbackImage(progress.courseId);
                                        return (
                                            <div key={idx} className="group relative bg-[#1A1A1A] hover:bg-[#252525] rounded-xl p-3 transition-all border border-gray-800 flex flex-col md:flex-row gap-4 items-center">
                                                <div className="w-full md:w-36 h-24 relative rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => handleCourseClick(progress.courseId)}>
                                                    <img
                                                        src={details?.Course?.courseImage && details.Course.courseImage !== "" ? `${basepath}/${details.Course.courseImage}` : fallbackImg}
                                                        alt="Course"
                                                        onError={(e) => { e.currentTarget.src = fallbackImg; e.currentTarget.onerror = null; }}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <PlayCircleIcon className="w-8 h-8 text-white/80" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 w-full">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h3 className="text-base font-bold line-clamp-1 cursor-pointer hover:text-indigo-400 transition-colors" onClick={() => handleCourseClick(progress.courseId)}>{details?.Course?.title || "Course Title"}</h3>
                                                        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30 whitespace-nowrap ml-2">{details?.Course?.courseCode}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mb-3 line-clamp-1">{details?.Course?.courseDescription || "Course Description"}</p>

                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                                                            <div
                                                                className="bg-indigo-500 h-full rounded-full"
                                                                style={{ width: `${progress.autoCalculatedProgressPercentage || 0}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-400 font-mono w-12 text-right">{Math.round(progress.autoCalculatedProgressPercentage || 0)}%</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleCourseClick(progress.courseId)}
                                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
                                                >
                                                    Resume Course
                                                </button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="p-8 text-center bg-[#1A1A1A] rounded-2xl border border-gray-800 text-gray-500">
                                        No courses in progress. Start one today!
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 4. COMPLETED SECTION */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-200 mb-6">Completed Courses</h2>
                            <div className="space-y-4">
                                {completedCourses.length > 0 ? (
                                    completedCourses.map((progress: any, idx: number) => {
                                        const details = getCourseDetails(progress.courseId);
                                        const fallbackImg = getRandomFallbackImage(progress.courseId);
                                        return (
                                            <div key={idx} className="bg-[#1A1A1A] rounded-2xl p-4 border border-gray-800 flex gap-4 items-center">
                                                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 cursor-pointer" onClick={() => handleCourseClick(progress.courseId)}>
                                                    <img
                                                        src={details?.Course?.courseImage && details.Course.courseImage !== "" ? `${basepath}/${details.Course.courseImage}` : fallbackImg}
                                                        alt="Course"
                                                        onError={(e) => { e.currentTarget.src = fallbackImg; e.currentTarget.onerror = null; }}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h4 className="font-medium line-clamp-1 cursor-pointer hover:text-indigo-400 transition-colors" onClick={() => handleCourseClick(progress.courseId)}>{details?.Course?.title}</h4>
                                                        <span className="text-[10px] font-mono text-gray-500 ml-2">{details?.Course?.courseCode}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 max-w-[200px]">
                                                        <div className="bg-green-500 h-full rounded-full w-full"></div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                                                    COMPLETED
                                                </span>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="p-6 text-center text-sm text-gray-600 italic">No completed courses yet.</div>
                                )}
                            </div>
                        </section>

                        {/* 5. ALL COURSES SECTION (Newly Added) */}
                        <section id='all-courses'>
                            <h2 className="text-xl font-semibold text-gray-200 mb-6">All Courses</h2>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                {courses.length > 0 ? (
                                    courses.map((courseItem: any, idx: number) => {
                                        const fallbackImg = getRandomFallbackImage(courseItem?.Course?.courseId || idx);
                                        const isResumable = inProgressCourses.some((p: any) => p.courseId === courseItem?.Course?.courseId);
                                        const buttonText = isResumable ? "Resume Learning" : "Start Learning";

                                        return (
                                            <div key={idx} onClick={() => handleCourseClick(courseItem?.Course?.courseId)} className="group bg-[#1A1A1A] hover:bg-[#252525] rounded-xl p-3 border border-gray-800 flex gap-4 items-center cursor-pointer transition-all hover:translate-x-1 hover:shadow-lg">
                                                <div className="w-28 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={courseItem?.Course?.courseImage && courseItem.Course.courseImage !== "" ? `${basepath}/${courseItem.Course.courseImage}` : fallbackImg}
                                                        alt="Course"
                                                        onError={(e) => { e.currentTarget.src = fallbackImg; e.currentTarget.onerror = null; }}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-mono text-indigo-300 border border-indigo-500/30">
                                                        {courseItem?.Course?.courseCode}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm mb-1 line-clamp-1 text-gray-100 group-hover:text-indigo-400 transition-colors">{courseItem?.Course?.title}</h4>
                                                    <p className="text-xs text-gray-400 line-clamp-1 mb-2">{courseItem?.Course?.description || courseItem?.Course?.courseDescription}</p>
                                                    <div className="flex justify-between items-center text-[10px] font-medium text-gray-500">
                                                        <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3" /> {courseItem?.Course?.duration || "Self Paced"}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap hidden sm:block"
                                                >
                                                    {buttonText}
                                                </button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="col-span-2 p-8 text-center bg-[#1A1A1A] rounded-2xl border border-gray-800 text-gray-500">
                                        You haven't enrolled in any courses yet.
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>


                    {/* === RIGHT COLUMN (Sidebar - Fixed/Sticky) === */}
                    <div className="xl:col-span-1 space-y-8 sticky top-24 self-start h-fit pr-8">

                        {/* 1. MOTIVATION CARD */}


                        {/* 2. LEARNING HOURS CHART (MOCKED) */}


                        {/* 3. LEADERBOARD (MOCKED) 
                        <div className="bg-[#151515] p-6 rounded-3xl border border-gray-800">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-gray-200 font-semibold">Leaderboard</h3>
                                <button className="text-xs text-indigo-400 hover:text-indigo-300">See All</button>
                            </div>

                            <div className="space-y-4">
                                <LeaderboardItem rank={1} name="Michael" points="1,520" />
                                <LeaderboardItem rank={2} name="Kevin" points="1,340" />
                                <LeaderboardItem rank={3} name="Adam Pierce" points="1,120" />
                                <LeaderboardItem rank={4} name="Victor" points="900" />
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </main>
        </ProfileLayout>
    );
}

// --- SUB COMPONENTS ---

const StatCard = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="bg-[#151515] p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
        <div className="bg-gray-800/50 w-10 h-10 rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <p className="text-gray-400 text-xs font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const LeaderboardItem = ({ rank, name, points }: { rank: number, name: string, points: string }) => (
    <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-gray-800">
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${rank === 1 ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}>
                {rank === 1 ? '👑' : rank}
            </div>
            <div className="bg-gray-700 w-8 h-8 rounded-full"></div> {/* Avatar Placeholder */}
            <div>
                <p className="text-sm font-medium text-gray-200">{name}</p>
                <p className="text-[10px] text-orange-400 flex items-center gap-1">
                    <FireIcon className="w-3 h-3" /> {Math.floor(Math.random() * 15) + 1} days
                </p>
            </div>
        </div>
        <div className="text-sm font-bold text-gray-400 flex items-center gap-1">
            <TrophyIcon className="w-3 h-3" /> {points}
        </div>
    </div>
);
