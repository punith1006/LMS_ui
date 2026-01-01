"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";


interface FAQItem {
    question: string;
    answer: string;
}


interface Faq {
    description: string;
    item: FAQItem[];
}

const FAQ: Faq = {
    description: "Whether you're seeking specific information or have a query in mind, this is your one-stop resource hub. If your question isn't addressed here, our dedicated support team is just a message away. Dive into the sections below to uncover the answers you're seeking.",
    item: [{
        question: "Who can take this course?",
        answer: 'Any graduate either pursuing or completed and IT professional.',
    }, {
        question: "Are there any prerequisites required",
        answer: 'Basic knowledge of Linux system administration, command-line operations, and networking. Familiarity with scripting and YAML is helpful but not mandatory.',
    }, {
        question: "Which are the top companies hiring certified professionals as per the current market trends in India",
        answer: 'HCL, TCS, Cognizant, Salesforce, Wipro, Amazon, IBM, Deloitte, Microsoft, Google, EY, Infosys and many more',
    },
    {
        question: "List down the job roles offered to a Fresher and a mid-senior level person",
        answer: 'Ansible Automation Engineer, Junior DevOps Engineer, IT Support Associate, DevOps Engineer, Linux System Administrator, Automation Consultant, Cloud Engineer.',
    }
    ]
}
const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    //   const [faq, setFaq] = useState<{ description?: string; QAndA?: FAQItem[] }>({});

    //   const fetchFaq = async (slug: string) => {
    //     try {
    //       const response = await axiosPublic.get("/lms/course-details", {
    //         params: { slug },
    //       });
    //       return response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.FAQs || {};
    //     } catch (error) {
    //       console.error("Error fetching course details.", error);
    //       return {};
    //     }
    //   };

    //   useEffect(() => {
    //     if(course.length>0){
    //       const getData = async () => {
    //         const faqData = await fetchFaq(course[0].slug);
    //         setFaq(faqData);
    //       };
    //       getData();
    //           }

    //   }, [course]);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto px-4 sm:px-6 lg:px-8 py-4 grid md:grid-cols-2 gap-8 items-center bg-[#F6F6F9] text-gray-800">
            <div className=" space-y-8 z-10">
                <div>
                    <h4 className="flex items-center text-xl pb-4">
                        <FaArrowCircleRight className="pr-2 text-2xl" />
                        FAQ
                    </h4>
                    <h2 className="text-3xl md:text-xl font-semibold mb-4">
                        Explore Common Queries
                    </h2>
                    <p className="text-gray-800 text-sm leading-relaxed text-justify">
                        {FAQ.description}
                    </p>
                </div>
                <Image
                    src={`/Courses/faq3.jpg`}
                    alt="Person working on laptop"
                    width={600}
                    height={400}
                    className="rounded-lg object-contain border-none"
                />
            </div>

            <div className="space-y-4 z-10">
                {FAQ ? (
                    FAQ?.item.map((faqItem, index) => (
                        <div key={index} className="border-b border-gray-600 pb-2">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex items-center cursor-pointer w-full text-left text-lg font-semibold text-gray-900 focus:outline-none"
                            >
                                <span className="ml-2 text-wrap text-base sm:text-sm">
                                    {faqItem.question}
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index
                                    ? "max-h-40 mt-2 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-700 ml-2 mt-2">{faqItem.answer}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No FAQs available at this time.</p>
                )}
            </div>
        </motion.div>
    );
};

export default FAQSection;

