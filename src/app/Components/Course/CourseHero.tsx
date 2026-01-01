"use client";

import React from "react";
import { motion } from "framer-motion";

// Stats data for the strip below hero
const stats = [
    { label: "Learners Trained", value: "5,000+" },
    { label: "Career Growth Rate", value: "85%" },
    { label: "Job Placement Support", value: "1,000+" },
    { label: "Hours of Learning Delivered", value: "10,000+" },
    { label: "Average Rating", value: "4.8/5" },
];

const CourseHero = () => {
    return (
        <>
            <section className="relative w-full bg-white pt-8 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-center relative z-10">

                    {/* Left Image Section */}
                    <div className="flex-shrink-0 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative w-[240px] sm:w-[280px]"
                        >
                            <img
                                src="/spotlight/spotlightimg5.png"
                                alt="Students collaborating"
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* Right Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col space-y-4 flex-1"
                    >
                        <h1 className="text-2xl lg:text-3xl font-bold text-[#7B7B7B] leading-tight text-center lg:text-left">
                            Unlock The Power Of AI And Transform Your Career With Tailored Learning
                        </h1>

                        <p className="text-[#7B7B7B] text-[11px] sm:text-xs leading-relaxed text-justify">
                            At Global Knowledge Technologies (GKT), we are dedicated to empowering individuals with the cutting-edge skills needed to thrive in today’s fast-paced, technology-driven world. Our expert-led AI, data science, and IT training programs are designed for those who want to gain practical, industry-relevant knowledge and boost their career prospects. Whether you're looking to upskill or switch careers, our flexible, on-demand learning solutions provide you with the tools to succeed. With personalised support, expert trainers, and recognised certifications, GKT ensures you’re not just learning – you're evolving. Join us today and take the first step towards transforming your future.
                        </p>

                        {/* Floating Cards Section */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 ml-4 justify-center lg:justify-start items-stretch">
                            {/* White Card */}
                            <div className="bg-white p-3 rounded-[16px] shadow-lg border border-gray-100 w-full sm:w-[170px] md:w-[180px] flex flex-col justify-center gap-2 min-h-[110px]">
                                <div className="flex items-center gap-2">
                                    <div className="p-1">
                                        <img
                                            src="/spotlight/auto_awesome_motion.png"
                                            alt="Icon"
                                            className="w-5 h-5 object-contain"
                                        />
                                    </div>
                                    <h3 className="text-[11px] font-bold text-[#000000]">In Every Classroom,</h3>
                                </div>
                                <p className="text-[9px] text-[#00000096] leading-relaxed">
                                    Education is the process of acquiring knowledge, skills, values, and attitudes that empower individuals
                                </p>
                            </div>

                            {/* Orange Card - Image with content inside */}
                            <div className="relative w-full sm:w-[190px] md:w-[210px]">
                                {/* Background Shape */}
                                <img
                                    src="/spotlight/Rectangle 5.png"
                                    alt="Stats card background"
                                    className="w-full h-auto rounded-[20px] shadow-md"
                                />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 px-4 py-3 text-white flex flex-col justify-between">

                                    {/* Top-right squares */}
                                    <div className="flex justify-end gap-1.5">
                                        <img
                                            src="/spotlight/image.png"
                                            alt="square 1"
                                            className="w-12 h-12  opacity-80"
                                        />
                                        <img
                                            src="/spotlight/image.png"
                                            alt="square 2"
                                            className="w-12 h-12 opacity-80"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div>
                                        <p className="text-[9px] uppercase tracking-wider opacity-90 mb-1">
                                            MORE THAN
                                        </p>

                                        <h3 className="text-[32px] font-bold leading-none mb-2 ml-4">
                                            250K
                                        </h3>

                                        <div className="w-8 h-[1px] bg-white/60 mb-2"></div>

                                        <p className="text-[9px] leading-relaxed opacity-90">
                                            Education is the process of acquiring knowledge, skills, values, and attitudes
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
                {/* Background Grid Pattern (Linear Gradient from Spotlight) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_2px,transparent_3px),linear-gradient(to_bottom,#ccc_1px,transparent_3px)] bg-[size:50px_40px] opacity-10 pointer-events-none z-0" />
            </section>

            {/* Stats Strip */}
            <div className="w-full bg-white py-6 border-t border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center min-w-[100px]">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#EB900C]">{stat.value}</h3>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CourseHero;
