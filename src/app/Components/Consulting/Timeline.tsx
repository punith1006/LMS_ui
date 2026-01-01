"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const milestones = [
    { year: "2002", title: "Foundation & Vision", description: "GKT is established in Bangalore with the goal of bridging education and technology, laying the foundation for our future ecosystem." },
    { year: "2008", title: "First Major Partnerships", description: "Partnered with global tech giants to deliver certified training programs." },
    { year: "2012", title: "Expansion to Corporate Training", description: "We enter enterprise training, large-scale corporate solutions, and international collaborations." },
    { year: "2016", title: "Global Footprint", description: "Expanded operations to USA, UAE, and Singapore." },
    { year: "2020", title: "Academic Transformation & Innovation", description: "We collaborate with leading universities, launch STEM and certification-driven tech programs, and build scalable learning solutions through our R&D teams." },
    { year: "2024", title: "Leading AI Education", description: "At the forefront of AI and Generative AI education and solutions." }
];

const Timeline = () => {
    // This ref helps track scroll progress for generic animation if needed
    const ref = useRef(null);

    return (
        <section className="py-20 bg-[#F6F6F9] overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Growth & Milestones</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A journey of excellence and continuous innovation spanning over two decades.
                    </p>
                </div>

                <div className="relative">
                    {/* Center Line connected */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2" />

                    <div className="space-y-12">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                                className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Date Circle */}
                                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#004881] border-4 border-white shadow-lg transform -translate-x-1/2 z-10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>

                                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                                    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        {/* Arrow for desktop */}
                                        <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45 ${index % 2 === 0 ? "-left-2 border-r-0 border-t-0 border-b border-l shadow-[-2px_2px_2px_-1px_rgba(0,0,0,0.05)]" : "-right-2 shadow-[2px_-2px_2px_-1px_rgba(0,0,0,0.05)]"
                                            }`} />

                                        <span className="inline-block px-3 py-1 bg-blue-50 text-[#004881] font-bold rounded-full text-sm mb-2">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
