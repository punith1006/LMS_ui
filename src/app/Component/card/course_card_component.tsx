import hideDuration from "@/app/helper/hide_duration";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Metamorphous } from "next/font/google";
import { useRouter } from "next/navigation";
import { basepath } from "@/app/common/constants";

export default function CourseCard({
  data,
  showPrice,
}: {
  data: any;
  showPrice: boolean;
}) {
  const router = useRouter();
  // console.log('data',data);
  

  return (
    <div
      onClick={(e) => {
        router.push(`/course/${data.slug}`);
      }}
      className="cursor-pointer box-border border flex flex-col  p-4 justify-start items-start border-black border-1 rounded-2xl hover:scale-105 hover:shadow-md hover:shadow-black/50 transform duration-300"
      style={{
        width: data.title == "iScience" ? "250px" : "",
        alignItems: data.title == "iScience" ? "center" : "",
      }}
    >
      {/* <section className="flex-1 flex-col">
        <div className="flex justify-between flex-col md:flex-row">
                    {data.Partner && (
                      <div className="mb-3 flex whitespace-nowrap">
                        <span className="border-[0.3px] border-purple-400 group-hover:text-black group-hover:bg-white text-black bg-grey/10 text-xs md:text-sm px-2 py-1 rounded-full">
                          {data.Partner.partnerName}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center mb-0 md:mb-3 whitespace-nowrap">
                      {data.CourseCategory && (
                        <span className="bg-yellow/10 text-purple-400 p-2 group-hover:text-black   text-xs py-1 rounded-full border-lavender-700 group-hover:font-Semi bold">
                          {data.CourseCategory.categoryName}
                        </span>
                      )}
                    </div>
                    </div>
        <h2 className="text-black text-md font-sm">{data.title}</h2>
        {hideDuration(data.partnerId, data.categoryId) ? (
          <></>
        ) : (
          <div className="flex flex-row gap-1 mt-2 items-center">
            <img
              alt="clock icon"
              className="text-text_grey_one h-4 w-4"
              src={`${commonbasePath}/Icon_clock.svg`}
            />

            <p className="text-text_grey_one text-base font-normal">
              {Math.round(data.CourseDurations[0].courseDuration)}{" "}
              {data.CourseDurations[0].courseDurationType}
            </p>
          </div>
        )}
      </section> */}
      <section className="flex-1 flex flex-col">
  <div className="flex justify-between  gap-2 flex-col lg:flex-row">
    {data.Partner && (
      <div className="mb-2 md:mb-0 flex whitespace-nowrap ">
        <span className="border-[0.3px] border-purple-400 group-hover:text-black group-hover:bg-white text-black bg-grey/10 text-xs md:text-[10px] px-2 py-1 rounded-full sm:text-start">
          {data.Partner.partnerName}
        </span>
      </div>
    )}

    {data.CourseCategory && (
      <div className="flex items-center ">
        <span className="bg-yellow/10 text-purple-400 px-3 py-1 text-xs md:text-[10px] rounded-full border border-lavender-700 group-hover:text-black group-hover:font-semibold whitespace-nowrap">
          {data.CourseCategory.categoryName}
        </span>
      </div>
    )}
  </div>

  <h2 className="text-black text-md font-medium mt-2">{data.title}</h2>

  {!hideDuration(data.partnerId, data.categoryId) && (
    <div className="flex flex-row gap-2 mt-2 items-center">
      <img
        alt="clock icon"
        className="h-4 w-4"
        src={`${basepath}/Icon_clock.svg`}
      />
      <p className="text-text_grey_one text-sm md:text-base font-normal">
        {Math.round(data.CourseDurations[0].courseDuration)}{" "}
        {data.CourseDurations[0].courseDurationType}
      </p>
    </div>
  )}
</section>


      {showPrice == true && data.CourseCostPlans[0].planPrice != 0.0 ? (
        <>
          <div className="flex flex-row gap-3 mt-7 pt-3 w-full border-dashed border-[gray] border-t">
            {/* <p className="text-blue text-lg font-medium">{`₹${rupees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p> */}
            {data.CourseCostPlans[0].planPrice != 0.0 &&
            data.CourseCostPlans[0].offerPrice != 0.0 ? (
              <p className="text-black/30 text-sm md:text-lg font-medium line-through">{`₹${Math.round(
                data.CourseCostPlans[0].planPrice
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            ) : data.CourseCostPlans[0].planPrice != 0.0 ? (
              <p className="text-blue text-lg font-medium ">{`₹${Math.round(
                data.CourseCostPlans[0].planPrice
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            ) : null}
            {data.CourseCostPlans[0].offerPrice != 0.0 ? (
              <p className="text-black/50 text-sm md:text-lg font-medium">{`₹${Math.round(
                data.CourseCostPlans[0].offerPrice
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            ) : null}
          </div>

          {/* {data.CourseCostPlans.length != 0 &&
          data.CourseCostPlans[0].offerId != null &&
          data.CourseCostPlans[0].offerPrice > 0 ? (
            <div className="flex flex-row gap-3 mt-7 p-3 w-full border-dashed border-green border-t">
              <h3 className="text-blue text-lg font-medium">
                ₹{Math.round(data.CourseCostPlans[0].offerPrice)}/-
              </h3>
              <h3 className="text-text_grey_one line-through text-lg font-normal">
                ₹{Math.round(data.CourseCostPlans[0].planPrice)}/-
              </h3>
            </div>
          ) : Math.round(data.CourseCostPlans[0].planPrice) < 1 ? (
            <></>
          ) : (
            <div className="flex flex-row gap-3 mt-7 p-3 w-full border-dashed border-green border-t">
              <h3 className="text-blue text-lg font-medium">
                ₹{Math.round(data.CourseCostPlans[0].planPrice)}/-
              </h3>
            </div>
          )} */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
