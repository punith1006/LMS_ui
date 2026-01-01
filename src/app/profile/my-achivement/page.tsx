'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import { useEffect, useState } from "react";
import MyAchivementCard from "@/app/Component/profile_components/my_achivement_card";


export default function Index() {
    let [achivement, setAchivement] = useState<any[]>([]);
    useEffect(() => {

        fetchAchivement();



    }, [])

    const fetchAchivement = async () => {
        try {
            const result = await axiosPrivate.get('/user/user-certificate');
          
            setAchivement(result.data);






        } catch (error) {

        }
    }
    const router = useRouter();
    return (
        <ProfileLayout>
            <main className="w-[95%] mx-auto h-auto flex flex-col">
                <h2 className="text-xl font-medium text-white">My Achievements</h2>
                <div className="w-full grid grid-cols-1 gap-6 mt-8">

                    {
                        achivement.map((e: any, index) => {
                            return <MyAchivementCard key={index} data={e} />
                        })
                    }




                </div>
            </main>
        </ProfileLayout>
    );
}
