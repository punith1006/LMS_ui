"use client";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

interface Description {
    content: string;
    keyPoints: string[];
}

interface Category {
    type: string;
    heading: string;
    sub_heading: string;
    Description: Description[];
    image: string;
    question: string;
    answer: string;
}

interface Logo {
    image: string;
    url: string;
}

const categories: Category[] = [
    {
        type: "Business/individual",
        heading: "Accelerating Growth. Empowering Expertise",
        sub_heading: "Your go-to power-up for Growth, Innovation & Resilience.",
        Description: [
            {
                content:
                    "We hook up enterprises and pros with next-gen skills, cutting-edge tech programs, and OEM-certified training that flex and flow with your journey. Our support, expertise, and innovative tools fuel your journey—empowering you to grow, stay current, and lead the way in a fast-changing world",
                keyPoints: [],
            },
        ],
        image: "/Service_images/Enterprice.png",
        question: "What skills will fuel your growth and resilience?",
        answer:
            "Let’s discover, empower, and elevate your expertise together for a future that shines bright!",
    },
    {
        type: "Universities/colleges",
        heading: "Shaping Futures. Empowering Careers.",
        sub_heading: "A Catalyst for Employability, Industry Relevance & Growth.",
        Description: [
            {
                content: "We empower universities and colleges with globally recognized certifications, AI-driven academic programs, and transformative curriculum innovation—cultivating academic distinction, elevating institutional branding, and equipping students to excel as leaders in an ever-evolving global landscape. ",
                keyPoints: [
                ],
            },
        ],
        image: "/Service_images/Academic.png",
        question:
            "What key skills or programs would best support your institution’s goals?",
        answer: "Let’s collaborate to create impactful learning experiences!",
    },
    {
        type: "Schools",
        heading: "Igniting Young Minds. Building Brighter Futures.",
        sub_heading: "Your Launchpad for Learning, Creativity & Lifelong Skills.",
        Description: [
            {
                content: "We partner with educational institutions to offer tailored academic programs, industry-recognized certifications, and comprehensive student development initiatives—enhancing academic quality, empowering educators, and preparing students for success in a competitive world.",
                keyPoints: [
                ],
            },
        ],
        image: "/Service_images/Gov.png",
        question: "What skills do your students need to thrive?",
        answer: "Let’s explore and create their brightest future together!",
    },
    {
        type: "Government",
        heading: "",
        sub_heading: "",
        Description: [
            {
                content: "",
                keyPoints: [],
            },
        ],
        image: "/Service_images/Gov.png",
        question: "",
        answer: "",
    },
];

// const logos: Logo[] = [
//   {
//     image: "/Service_images/gc.png",
//     url: "https://cloud.google.com/",
//   },
//   {
//     image: "/Service_images/ibm.png",
//     url: "https://gkcloud.ai/",
//   },
// ];

const LearningEdge: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextCard = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === categories.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - 1 : prevIndex - 1
        );
    };

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setActiveIndex((prevIndex) =>
    //       prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    //     );
    //   }, 5000);

    //   return () => clearInterval(interval);
    // }, []);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        const startAutoSlide = () => {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prevIndex) =>
                    prevIndex === categories.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
        };

        startAutoSlide();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);


    const handleMouseEnter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseLeave = () => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === categories.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
    };




    return (
        <div
            className="flex h-full justify-center w-full gap-4 overflow-visible py-8 relative z-20 mt-0  md:mt-10 "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <svg width="0" height="0">
                <defs>
                    <clipPath id="smoothCurveClip" clipPathUnits="objectBoundingBox">
                        <path d="M0.12,0.02 C0.25,0.03,0.5,0.045,0.85,0.02 C0.95,0.01,1,0,1,0 L1,1 C1,1,0.95,0.99,0.85,0.98 C0.5,0.955,0.25,0.97,0.12,0.98 C0.05,0.985,0,1,0,1 L0,0 C0,0,0.05,0.015,0.12,0.02 Z" />
                    </clipPath>
                </defs>
            </svg>

            {isMobile ? (
                <div className="w-full h-[580px] relative">
                    <div
                        className="h-full w-full text-white relative overflow-hidden rounded-xl transition-all duration-700 ease-in-out"
                        style={{
                            backgroundImage: `url(${categories[activeIndex].image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute right-2 w-auto justify-end p-4">
                            <h2 className="text-lg mb-1 text-white">
                                {categories[activeIndex].type}
                            </h2>
                        </div>

                        <div className="flex justify-between flex-col h-full w-full">
                            <div className="p-2 ml-8 mt-8 w-[90%] text-white bg-opacity-50">
                                <h2
                                    className="text-xl mb-2"
                                    style={{ fontFamily: "Times New Roman, serif" }}
                                >
                                    {categories[activeIndex].heading}
                                </h2>
                                <h3 className="text-sm mb-2 text-white opacity-80">
                                    {categories[activeIndex].sub_heading}
                                </h3>
                                {categories[activeIndex].Description.map((desc, i) => (
                                    <div key={i} className="w-[90%]">
                                        {desc.content && (
                                            <p className="text-xs opacity-80 mb-2">{desc.content}</p>
                                        )}
                                        {desc.keyPoints && (
                                            <ul className="list-disc opacity-80 pl-5">
                                                {desc.keyPoints.map((point, index) => (
                                                    <li key={index} className="text-xs mb-1">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="ml-8 p-2">
                                {activeIndex === 0 && (
                                    <>
                                        <p className="text-sm opacity-70">Ready to stay ahead?</p>
                                        <div className="flex flex-col items-start gap-1 mt-1">
                                            <div className="inline-flex items-center group gap-2 px-6 py-2 rounded-full bg-[#0F0F0F]/80 border transition hover:shadow-lg border-blue-500 text-white font-semibold text-sm sm:text-base">
                                                Let’s glow up together!
                                                <ArrowUpRightIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex flex-col items-start gap-1 mt-3">
                                    <p className="text-white text-sm">
                                        {categories[activeIndex].question}
                                    </p>
                                    <p className="text-white text-xs opacity-80">
                                        {categories[activeIndex].answer}
                                    </p>
                                </div>
                                <div className="flex justify-end gap-5 p-2 border-t border-dashed mt-2">
                                    <button onClick={prevCard} className="cursor-pointer">
                                        <CiCircleChevLeft size={30} />
                                    </button>
                                    <button onClick={nextCard} className="cursor-pointer">
                                        <CiCircleChevRight size={30} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2"
          >
            {"<"}
          </button>
          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2"
          >
            {">"}
          </button> */}
                </div>
            ) : (
                <div className="flex w-full h-[470px] gap-4">
                    {categories.map((category, index) => {
                        const isActive = activeIndex == index;

                        return (
                            <div
                                key={index}
                                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-in-out ${isActive ? "flex-[5]" : "flex-[0.7]"
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div
                                    className="w-full h-full flex flex-col justify-between"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {isActive ? (
                                        <div className="flex flex-col justify-between h-full w-full text-white p-6">
                                            <div>
                                                <div className="flex justify-end items-end">
                                                    <h2 className="text-lg mb-4">{category.type}</h2>
                                                </div>
                                                <h2
                                                    className="text-2xl mb-2"
                                                    style={{ fontFamily: "Times New Roman, serif" }}
                                                >
                                                    {category.heading}
                                                </h2>
                                                <h3 className="text-sm mb-2">{category.sub_heading}</h3>
                                                {categories[activeIndex].Description.map((desc, i) => (
                                                    <div key={i}>
                                                        {desc.content && (
                                                            <p className="text-xs opacity-80 w-11/12 text-justify mb-2">
                                                                {desc.content}
                                                            </p>
                                                        )}
                                                        {desc.keyPoints && (
                                                            <ul className="list-disc opacity-80 pl-5">
                                                                {desc.keyPoints.map((point, index) => (
                                                                    <li key={index} className="text-xs mb-1">
                                                                        {point}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                {activeIndex == 0 && (
                                                    <>
                                                        <p className="text-sm opacity-70">
                                                            Ready to stay ahead?
                                                        </p>
                                                        <div className="flex flex-col items-start gap-1 mt-1">
                                                            <div className="inline-flex items-center group gap-2 px-6 py-2 rounded-full bg-[#0F0F0F]/80 border transition hover:shadow-lg border-blue-500 text-white font-semibold text-sm sm:text-base">
                                                                Let’s glow up together!
                                                                <ArrowUpRightIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="flex flex-col items-start gap-1 mt-6">
                                                    <p className="text-white text-sm">
                                                        {category.question}
                                                    </p>
                                                    <p className="text-white text-xs opacity-80">
                                                        {category.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // <div
                                        //   className="h-full w-full text-white "
                                        //   style={{
                                        //     backgroundImage: `url(${category.image})`,
                                        //     backgroundSize: "cover",
                                        //     backgroundPosition: "center",
                                        //   }}
                                        // >
                                        //   <div className=" flex flex-col  backdrop-blur-xl h-full w-full justify-between  items-center p-4">
                                        //     <div className="transform rotate-90 flex items-center gap-2 text-sm mt-12">
                                        //       <span>{category.type}</span>
                                        //     </div>
                                        //     <Image
                                        //       src={"/Service_images/Plus_icon.png"}
                                        //       alt="icon"
                                        //       height={12}
                                        //       width={30}
                                        //     />
                                        //   </div>
                                        // </div>

                                        <div
                                            className="h-full w-full text-white"
                                            style={{
                                                backgroundImage: `url(${category.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            <div className="flex flex-col backdrop-blur-xl h-full w-full justify-between items-center p-4">
                                                <div className="transform rotate-90 text-sm origin-left ml-12  w-full whitespace-nowrap">
                                                    <span className="flex justify-start ">{category.type}</span>
                                                </div>
                                                <div
                                                >

                                                    <Image
                                                        src="/Service_images/Plus_icon.png"
                                                        alt="icon"
                                                        height={12}
                                                        width={30}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LearningEdge;
