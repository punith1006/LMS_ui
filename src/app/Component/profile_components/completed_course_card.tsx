'use client'
import { useRouter } from 'next/navigation';
import CircleProgressBar from '@/app/Components/CircleProgressBar';


export default function CompletedCourseCard({ data, percentage }: { data: any, percentage: any }) {
    const router = useRouter();

    return <div onClick={(e) => {
        router.push(`/profile/my-learning/${data.Course.courseId}`)
    }} className="cursor-pointer box-border border flex w-full p-6 justify-start items-start border-blue border-1 bg-slate-800 rounded-2xl">

        <section className='flex-1 flex-col'>
            <div className='w-full flex flex-row justify-between items-center'>
                <p className="text-white text-[12px] font-medium">{data.Course.courseCode}</p>
                {/* <div className="flex flex-row gap-1 mt-2 items-center">
      <img
                                   
                                   className="text-text_grey_one h-4 w-4"
                                   src="/Icon_star.svg"/>
     
        <p className="text-text_grey_one text-base font-medium">{data.CourseRating.defaultRating}</p>
      </div> */}
            </div>
            <h2 className="text-white text-xl font-medium">{data.Course.title}</h2>


        </section>
        <div className="flex flex-shrink-0 gap-2 items-center">
            <CircleProgressBar percentage={100} />
            <p className="cursor-pointer text-white text-base font-normal">100%</p>
        </div>


    </div>;
}