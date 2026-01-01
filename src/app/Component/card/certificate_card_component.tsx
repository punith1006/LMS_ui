import hideDuration from "@/app/helper/hide_duration";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Metamorphous } from "next/font/google";
import { useRouter } from "next/navigation";
import { basepath } from "@/app/common/constants";
 
export default function CertificateCard({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        router.push(`/certificate/${data.slug}`);
      }}
      className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-yellow/50 hover:scale-105 transform duration-300 hover:shadow-md hover:shadow-yellow/50 border-1 rounded-2xl"
    >
      <section className="flex-1 flex-col">
        <p className="text-grey/60 text-[12px] font-medium">
          {data.certificateName}
        </p>
        <h2 className="text-black text-xl font-medium">{data.title}</h2>
        {hideDuration(data.partnerId, data.categoryId) ? (
          <></>
        ) : (
          <div className="flex flex-row gap-1 mt-2 items-center">
            <img
              alt="clock icon"
              className="text-text_grey_one h-4 w-4"
              src={`${basepath}/Icon_clock.svg`}
            />
 
            <p className="text-text_grey_one text-base font-normal">
              {Math.round(
                data.CertificateCourseCostPlans[0].CertificateCourseItems.reduce(
                  (accumulator: any, currentValue: any) =>
                    parseFloat(
                      currentValue?.CourseDuration?.courseDuration ?? "0.0"
                    ) + accumulator,
                  0
                )
              )}{" "}
              {"hours"}
            </p>
          </div>
        )}
      </section>
 
      {data.CertificateCourseCostPlans.length != 0 &&
      data.CertificateCourseCostPlans[0].offerId != null &&
      data.CertificateCourseCostPlans[0].offerPrice > 0 ? (
        <div className="flex flex-row gap-3 mt-7 pt-3 w-full border-dashed border-green border-t">
          <h3 className="text-blue text-lg font-medium text-start">
            ₹{Math.round(data.CertificateCourseCostPlans[0].offerPrice.toString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-
          </h3>
          <h3 className="text-text_grey_one line-through text-lg font-normal">
            ₹{Math.round(data.CertificateCourseCostPlans[0].planPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-
          </h3>
        </div>
      ) : Math.round(data.CertificateCourseCostPlans[0].planPrice) < 1 ? (
        <></>
      ) : (
        <div className="flex flex-row gap-3 mt-7 pt-3 w-full border-dashed border-green border-t">
          <h3 className="text-blue text-lg font-medium">
            ₹{Math.round(data.CertificateCourseCostPlans[0].planPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-
          </h3>
        </div>
      )}
 
    </div>
  );
}
 
 