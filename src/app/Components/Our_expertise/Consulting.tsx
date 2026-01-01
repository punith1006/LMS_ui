"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const Consulting: React.FC = () => {
    const contentList = [
        "End-to-end application development using Agile methodologies",
        "Custom app development and legacy system modernization",
        "Infrastructure support including system administration and migrations",
        "Quality assurance, testing, and post-deployment maintenance",
        "Expertise in AI, cloud integration, ERP, cybersecurity, and multiple industries",
        "Skilled in technologies like OKTA, SAP, ReactJS, Python, IBM WatsonX, and more",
    ];

    return (
        <div className="relative w-full max-w-4xl  flex justify-center items-center mx-auto  mt-0 md:mt-10 overflow-visible">
            <div className="absolute  w-[90%] h-[100%] md:h-[105%] xl:h-96 z-0 overflow-hidden shadow-xl rounded-3xl">
                <Image
                    src="/Consulting/background.png"
                    alt="Background"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                />
            </div>

            <div className="relative z-10  bg-gradient-to-br from-white to-transparent backdrop-blur-xl rounded-3xl p-14 shadow-lg text-black w-[90%]">
                <h2 className="text-xl md:text-3xl xl:text-3xl font-bold text-[#004781] mb-6">
                    Consulting & Outsourcing
                </h2>

                <div className="space-y-4">
                    {contentList.map((content, index) => (
                        <div
                            key={index}
                            className="flex items-end text-sm md:text-md xl:text-md"
                        >
                            <Check
                                className="text-[#004781] mt-1 mr-3 flex-shrink-0"
                                size={20}
                            />
                            <span className="text-[#484848]">{content}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Consulting;
