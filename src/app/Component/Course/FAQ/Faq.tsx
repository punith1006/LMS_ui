"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { axiosPublic } from "@/app/common/axiosPublic";
import { basepath, slugData } from "@/app/common/constants";
 
interface FAQItem {
  question: string;
  answer: string;
}
 
const FAQSection = ({course}:{course:any}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faq, setFaq] = useState<{ description?: string; QAndA?: FAQItem[] }>({});
 
  const fetchFaq = async (slug: string) => {
    try {
      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });
      return response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.FAQs || {};
    } catch (error) {
      console.error("Error fetching course details.", error);
      return {};
    }
  };
 
  useEffect(() => {
    if(course.length>0){
      const getData = async () => {
        const faqData = await fetchFaq(course[0].slug);
        setFaq(faqData);
      };
      getData();
          }
    
  }, [course]);
 
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
 
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8 items-center bg-black">
      <div className="space-y-8 z-10">
        <div>
          <h4 className="text-white flex items-center text-xl pb-4">
            <FaArrowCircleRight className="pr-2 text-2xl" />
            FAQ
          </h4>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Explore Common Queries
          </h2>
          <p className="text-gray-400 leading-relaxed text-justify">
            {faq?.description}
          </p>
        </div>
        <Image
          src={`${basepath}/icon/faq3.jpg`}
          alt="Person working on laptop"
          width={600}
          height={400}
          className="rounded-lg object-contain border-none"
        />
      </div>
 
      <div className="space-y-4 z-10">
        {faq?.QAndA?.length ? (
          faq.QAndA.map((faqItem: FAQItem, index: number) => (
            <div key={index} className="border-b border-gray-600 pb-2">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center w-full text-left text-lg font-semibold text-gray-200 focus:outline-none"
              >
                <span className="ml-2 text-wrap text-base sm:text-sm">
                  {faqItem.question}
                </span>
              </button>
 
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-40 mt-2 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-400 ml-2 mt-2">{faqItem.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No FAQs available at this time.</p>
        )}
      </div>
    </div>
  );
};
 
export default FAQSection;
 
 