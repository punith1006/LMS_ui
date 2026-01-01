'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import { useEffect, useState } from "react";
import classNames from "@/app/helper/add_class";
import MyWebinarCard from "@/app/Component/profile_components/my_webinar_card";
import MyScheduleCard from "@/app/Component/profile_components/my_schedule_card";


export default function Index() {
    let [schedule, setSchedule] = useState<any[]>([]);
    let [webinar, setWebinar] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {

        fetchShedule();
        fetchWebinar();


    }, [])

    const fetchShedule = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-course-schedule');
          
            setSchedule(result.data?.schedules ?? []);
        } catch (error) {

        }
    }
    const fetchWebinar = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-webinar');
           
            setWebinar(result.data);
        } catch (error) {

        }
    }
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-full h-full flex flex-col">
                <div className={classNames("w-full cursor-pointer text-[16px]  flex flex-row justify-start items-center text-white gap-10")}>
                    <div className={index != 0 ? "font-normal" : "border-b-2 font-semibold"} onClick={(e) => {

                        setIndex(0)
                    }}>
                        Schedules
                    </div>

                    <div className={index != 1 ? " font-normal" : "border-b-2 font-semibold"} onClick={(e) => {
                        setIndex(1)

                    }}>
                        Webinars
                    </div>

                </div>
                <div className="w-full ">

                    {
                        index == 0 ? <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {
                                schedule.map((e: any, index) => {
                                    return <MyScheduleCard key={index} data={e} />
                                })
                            }




                        </div> : <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {
                                webinar.map((e: any, index) => {
                                    return <MyWebinarCard key={index} data={e} />
                                })
                            }




                        </div>
                    }




                </div>
            </main>
        </ProfileLayout>
    );
}
