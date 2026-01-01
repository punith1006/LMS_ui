'use client'
import { axiosPrivate } from '@/app/common/axiosPrivate';
import useUserData from '@/app/hooks/userData';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function MyCourseCard({ data }: { data: any }) {
  const router = useRouter();
  const { userData, } = useUserData();
  const [userProgress, setUserProgress] = useState<any>([]);
  const fetchUserProgress = async () => {
    try {
      const response = await axiosPrivate.get("/user/user-course-progress", {
        params: {
          courseId: data.Course.courseId,
          "userId": userData.userId

        }
      });

      const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
      setUserProgress(userCourseProgress);


    } catch (error) {

    }
  }
  useEffect(() => {
    fetchUserProgress();


  }, [userData]);

  return (
    <>
      {data.isValid ?
        <div onClick={(e) => {

          router.push(`/profile/my-learning/${data.Course.courseId}`)
        }} className="cursor-pointer box-border border-2 flex flex-col p-6 justify-start items-start border-gray-100 hover:border-[#EB900C] bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 h-full">

          <section className='flex-1 flex-col w-full'>
            <div className='w-full flex flex-row justify-between items-center mb-4'>
              <p className="text-[#004881] text-xs font-semibold px-2 py-1 bg-blue-50 rounded-lg">{data.Course.courseCode}</p>
              {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
            </div>
            <h2 className="text-black text-lg font-bold line-clamp-2 leading-tight h-14">{data.Course.title}</h2>

            {
              userProgress.length != 0 && userProgress[0]?.autoCalculatedProgressPercentage != null ? <div className='flex mt-4 items-center gap-2'>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#EB900C] h-2 rounded-full" style={{ width: `${userProgress[0]?.autoCalculatedProgressPercentage}%` }}></div>
                </div>
                <p className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">{userProgress[0]?.autoCalculatedProgressPercentage}%</p>
              </div> : <div className='mt-4 h-2'></div>
            }
          </section>

        </div>
        : null}
    </>)
}