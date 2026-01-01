
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import moment from 'moment';
import classNames from '@/app/helper/add_class';
import useTrainingMode from '@/app/hooks/training_mode_hook';

export default function MyWebinarCard({ data }: { data: any }) {
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
  return <div className={classNames("cursor-pointer box-border border flex flex-col justify-start items-start border-blue-300 border-1", showMore ? "h-auto" : "h-80")}>


    <section className=' flex flex-col  p-6 '>
      <div className='flex-col'>
        {
          (data?.WebinarSchedule?.CourseInstructors ?? []).length == 0 ? null : <p className='text-white text-xs mb-3'>Trainer: {data?.WebinarSchedule?.CourseInstructors[0].firstName} {data?.WebinarSchedule?.CourseInstructors[0].lastName}</p>
        }
        <h2 className="text-white text-lg font-medium">{data.Webinar.webinarName}</h2>
        {showMore ? (
        <div>
          <p className='w-full py-4 text-sm text-white'>{(data?.Webinar?.WebinarContents??[]).length==0?"":data.Webinar.WebinarContents[0].objective}</p>
         
        </div>
      ) : (
       <></>
      )}
        <div className='mt-6 flex flex-row justify-end'>
          <p onClick={toggleShowMore} className="text-blue-400 text-sm font-normal">{showMore == false ? "More.." : "Less.."}</p>
        </div>
        <div className="flex flex-row gap-1 mt-6 items-center justify-between">
          <div className='flex flex-row justify-center items-center gap-2'>
            <CalendarIcon className="text-blue-300 h-4 w-4" />
            <p className="text-white text-[12px] font-normal">{moment(new Date(data.WebinarSchedule.scheduleDate)).format("DD MMM YYYY | hh:mmA")}</p>
          </div>
          {/* <div className='flex flex-row justify-center items-center gap-2'>
            <MagnifyingGlassIcon className="text-blue h-4 w-4" />
            <p className="text-white text-[12px] font-normal">{trainingData.filter((e) => e.trainingModeId == data.trainingModeId).length == 0 ? "" : trainingData.filter((e) => e.trainingModeId == data.trainingModeId)[0].trainingModeShortName}</p>
          </div> */}

        </div>

      </div>


      <div onClick={(e) => {
        if (!data?.Webinar) {
          return;
        }
        if (data?.Webinar?.isActive == false) {
          return
        }
        openUrlInNewTab(data?.Webinar?.webinarUrl);
      }} className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue-400">

        Join Now
      </div>
    </section>
  </div>;
}