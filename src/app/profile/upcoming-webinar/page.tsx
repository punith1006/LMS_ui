'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosPublic } from "@/app/common/axiosPublic";
import WebinarCard from "@/app/Component/card/webinar_card_component";


export default function Index() {
  
    const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    fetchData();

  }, [])

  const fetchData = async () => {
    try {
      const result = await axiosPublic.get('/lms/webinar');

      setData(result.data.webinar);
     
    } catch (error) {

    }
  }
    return (
        <ProfileLayout>
            <main className="w-full h-auto flex flex-col">
                <h2 className="text-xl font-medium text-normal_white">Webinars</h2>
{
    data.length==0&& <h2 className='w-full text-center mt-20 text-white text-4xl font-semibold'>{"Coming Soon…"}</h2>
}
                
                <div className="h-auto w-full grid grid-cols-3 gap-6 mt-8">

{
 data.map((e: any, index) => {
    return <WebinarCard key={index} data={e} />
  })
}
</div>
            </main>
        </ProfileLayout>
    );
}
