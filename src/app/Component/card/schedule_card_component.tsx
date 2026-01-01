import { axiosPrivate } from '@/app/common/axiosPrivate';
import hideDuration from '@/app/helper/hide_duration';
import useTrainingMode from '@/app/hooks/training_mode_hook';
import useUserData from '@/app/hooks/userData';
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ScheduleCard({ data, type }: { data: any, type: number }) {
  const { userData, } = useUserData();
  const [selectedCat, setSelectedCat] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { trainingData } = useTrainingMode();
  const entroll = async () => {
    if (selectedCat == null) {
      return toast.info("Please select the schedule");
    }
    if (userData == null) {
      return toast.info("Before enrollment Please login");
    }
    try {
      if (isLoading) {
        return;
      }
      setLoading(true);
      const result = await axiosPrivate.post('/lms/add-course-enrollment', {
        "userId": userData.userId,
        "courseId": selectedCat,

        "courseCostPlanId": data.CourseCostPlans[0].courseCostPlanId,
        "enrollmentReference": "This is Test Enrollment",
        "amount": data.CourseCostPlans.length != 0 && data.CourseCostPlans[0].offerId != null ? data.CourseCostPlans[0].offerPrice : data.CourseCostPlans[0].planPrice
      });


      setLoading(false);
      window.open(`${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,"_self");
    


    } catch (error: any) {
      setLoading(false);
    
      toast.error(error!.message);

    }
  }
  return <div className="w-full cursor-pointer box-border  p-6  border flex flex-col justify-start items-start border-grey border-1 bg-dark_blue rounded-2xl">

    <div className='flex-1 w-full'>

      <h2 className="text-white text-lg font-medium h-auto md:h-10">{data.title}</h2>
      <div className="w-full flex flex-row mt-6 items-center justify-between">
        <p className="text-text_grey_one text-[12px] font-normal">{data.courseCode}</p>
        {
          hideDuration(data.partnerId, data.categoryId) ? <></> : <div className='flex-1 flex flex-row items-center justify-end gap-2'>
            <CalendarIcon className="text-text_grey_one h-4 w-4" />

            <p className="text-text_grey_one text-[12px] font-normal"> {Math.round(data.CourseDurations[0].courseDuration)} Days</p>

          </div>
        }


      </div>
      <main>
        <section className='mt-6 w-full h-16 flex text-base text-white font-normal  border-t-[0.25px] border-text_grey_one'>
          <div className='w-[49%] h-full flex items-center justify-center '>
            Date
          </div>
          <div className='h-full flex items-center justify-center'>
          <div className='w-[0.5px] h-[70%]  bg-text_grey_one'></div>
          </div>
        
          <div className='w-[30%] h-full flex items-center justify-center'>
            Location
          </div>
          <div className='h-full flex items-center justify-center'>
          <div className='w-[0.5px] h-[70%]  bg-text_grey_one'></div>
          </div>
          <div className='w-[27%] h-full flex items-center justify-center'>
            Fees
          </div>
        </section>
        {
            data.CourseSchedules.map((option: any, index: any) => {
              return  <section key={option.scheduleId} className='w-full h-16 flex text-sm text-white font-normal  border-t-[0.25px] border-text_grey_one'>
              <div className='w-[49%] h-full flex items-center justify-center gap-2'>
              <input
                    id={option.scheduleId}
                    name={`${option.scheduleId}[]`}
                    defaultValue={option.scheduleId}
                    value={option.scheduleId}
                    type="checkbox"
                    checked={selectedCat == option.scheduleId ? true : false}
                    onChange={(e: any) => {
                      setSelectedCat(e.target.value);

                    }}
                    defaultChecked={false}
                    className={selectedCat == option.scheduleId ? "h-4 w-4 rounded  border-custom_blue text-custom_blue focus:ring-custom_blue" : "h-4 w-4 rounded border-custom_grey text-custom_grey focus:ring-custom_grey"}
                  />

                  <label
                    htmlFor={`filter-mobile-${option.scheduleId}`}
                    className={selectedCat == option.scheduleId ? "flex-1 text-blue text-left" : "flex-1 text-table_font text-left"}
                  > {moment(new Date(option.startDate)).format('MMMM Do')}- {moment(new Date(option.endDate)).format('MMMM Do')}  </label>
              </div>
              <div className='h-full flex items-center justify-center'>
              <div className='w-[0.5px] h-[70%]  bg-text_grey_one'></div>
              </div>
            
              <div className='w-[30%] h-full flex items-center justify-center'>
              {trainingData.filter((e) => e.trainingModeId == option.trainingModeId).length == 0 ? "" : trainingData.filter((e) => e.trainingModeId == option.trainingModeId)[0].trainingModeShortName}
              </div>
              <div className='h-full flex items-center justify-center'>
              <div className='w-[0.5px] h-[70%]  bg-text_grey_one'></div>
              </div>
              <div className='w-[27%] h-full flex items-center justify-center'>
              {
                  data.CourseCostPlans.length != 0 && data.CourseCostPlans[0].offerId != null
                    && data.CourseCostPlans[0].offerPrice > 0
                    ?
                    <div className="flex flex-col justify-center items-center">

                      <h3 className="  text-table_font">₹ {Math.round(data.CourseCostPlans[0].offerPrice)}/-</h3>
                      <h3 className=" line-through  text-table_font">₹ {Math.round(data.CourseCostPlans[0].planPrice)}/-</h3>
                    </div> : Math.round(data.CourseCostPlans[0].planPrice) < 1 ? <></> : <div className="flex flex-row justify-center items-center">

                      <h3 className=" text-table_font">₹ {Math.round(data.CourseCostPlans[0].planPrice)}/-</h3>

                    </div>
                }
              </div>
            </section>
            })
          }

      </main>
     
    </div>
    <div onClick={(e) => {
      entroll();
    }} className="text-white text-sm font-medium mx-auto mt-4 items-center py-2  px-8  rounded-full bg-blue">

      Enroll
    </div>

  </div>;
}