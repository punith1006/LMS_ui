'use client'
import WebinarModel from '@/app/Component/webinar_components/webinar_popup';
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import moment from 'moment';

import classNames from '@/app/helper/add_class';

export default function WebinarCard({ data }: { data: any}) {

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

  return <div className={classNames("w-full cursor-pointer box-border border flex flex-col justify-start items-start border-blue border-1 bg-dark_blue",showMore?"h-auto":"h-80")}>
     <WebinarModel closeModal={closeModal} isOpen={isOpen} data={data} />

  <section className='w-full flex flex-col  p-6 '>
 <div className='w-full flex-col'>
 <h2 className="text-white text-lg font-medium">{data.webinarName}</h2>
  {showMore ? (
        <div>
          <p className='w-full pt-4 text-sm text-white'>{data.WebinarContents.length==0?"":data.WebinarContents[0].objective }</p>
         
        </div>
      ) : (
       <></>
      )}
  <div className='mt-6 flex flex-row justify-end'>
  <p onClick={toggleShowMore} className="text-blue text-sm font-normal">{showMore==false?"More..":"Less.."}</p>
  </div>
   <div className="flex flex-row gap-1 mt-6 items-center justify-between">
    <div className='flex flex-row justify-center items-center gap-2'>
    <CalendarIcon className="text-blue h-4 w-4" />
     <p className="text-white text-[12px] font-normal">{data.WebinarSchedules.length==0?"": moment(new Date(data.WebinarSchedules[0].scheduleDate)).format("DD MMM YYYY | hh:mmA")}</p>
    </div>
    
   </div>

 </div>
 

 <div onClick={(e)=>{
  openModal();
 }} className="text-white text-sm font-medium mx-auto mt-7 items-center py-3  px-6  rounded-full bg-blue">

   Register Now
   </div>
  </section>
 </div>;
}