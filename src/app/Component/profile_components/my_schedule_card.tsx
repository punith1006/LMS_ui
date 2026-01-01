
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import moment from 'moment';
import classNames from '@/app/helper/add_class';
import useTrainingMode from '@/app/hooks/training_mode_hook';

export default function MyScheduleCard({ data }: { data: any }) {
  const { trainingData } = useTrainingMode();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const openUrlInNewTab = (url: any) => {
    window.location.href =url;
  };

  return <div className={classNames("cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue", showMore ? "h-auto" : "h-80")}>


    <section className='flex-1 flex flex-col  p-6 '>
      <div className='flex-1 flex-col'>
        {
          (data?.CourseInstructors ?? []).length == 0 ? null : <p className='text-white text-xs mb-3'>Trainer: {data?.CourseInstructors[0].firstName} {data?.CourseInstructors[0].lastName}</p>
        }
        <h2 className="text-white text-lg font-medium">{data.scheduleName}</h2>

        <div className='mt-6 flex flex-row justify-end'>
          <p onClick={toggleShowMore} className="text-blue-400 text-sm font-normal">{showMore == false ? "More.." : "Less.."}</p>
        </div>
        <div className="flex flex-row gap-1 mt-6 items-center justify-between">
          <div className='flex flex-row justify-center items-center gap-2'>
            <CalendarIcon className="text-blue h-4 w-4" />
            <p className="text-white text-[12px] font-normal">{moment(new Date(data.startDate)).format("DD MMM YYYY | hh:mmA")}</p>
          </div>
          <div className='flex flex-row justify-center items-center gap-2'>
            <MagnifyingGlassIcon className="text-blue h-4 w-4" />
            <p className="text-white text-[12px] font-normal">{trainingData.filter((e) => e.trainingModeId == data.trainingModeId).length == 0 ? "" : trainingData.filter((e) => e.trainingModeId == data.trainingModeId)[0].trainingModeShortName}</p>
          </div>

        </div>

      </div>


      <div onClick={(e) => {
        if ((data?.UserCourseSchedules ?? []).length == 0) {
          return;
        }
        if ((data?.UserCourseSchedules ?? [])[0].isActive == false) {
          return
        }
        openUrlInNewTab((data?.UserCourseSchedules ?? [])[0].scheduleURL);
      }} className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue">

        Join Now
      </div>
    </section>
  </div>;
}