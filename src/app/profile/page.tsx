'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { basepath, baseUrl } from "@/app/common/constants";


export default function Profile() {
    const router = useRouter();
    const basePath  = basepath;
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col ">
                <h2 className="text-lg font-bold text-white">Dashboard</h2>
                <section className="mt-9 flex flex-col md:flex-row  gap-5">
                    <div onClick={(e)=>router.push("/profile/my-learning")} className="w-full md:w-60 h-32 rounded-lg flex flex-col cursor-pointer justify-center items-center gap-3 bg-[#8AB2A6]"><p className="text-[16px] font-bold text-black">My Learning</p>
                        <img

alt="my course icon" 
                            className="h-10 w-15"
                            src={`${basePath}/my_courses.png`} />
                    </div>
                    <div onClick={(e)=>router.push("/profile/my-webinar")} className="w-full md:w-60 h-32 rounded-lg flex flex-col cursor-pointer justify-center items-center gap-3 bg-[#C599B6]"><p className="text-[16px] font-bold text-black">My Schedules/Webinar</p>
                        <img
alt="my webinar icon"

                            className="h-10 w-15"
                            src={`${basePath}/my_webinar.png`} />
                    </div>
                   
                </section>
            </main>
        </ProfileLayout>
    );
}
