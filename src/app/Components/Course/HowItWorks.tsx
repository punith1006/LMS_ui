"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Sign Up",
        description: "Create your account on our platform and choose your preferred course."
    },
    {
        number: "02",
        title: "Start Learning",
        description: "Access on-demand videos, join live sessions, and dive into interactive exercises."
    },
    {
        number: "03",
        title: "Get Certified",
        description: "Complete the course and earn a certification that enhances your resume and skills."
    },
    {
        number: "04",
        title: "Apply Your Knowledge",
        description: "Use your newly acquired skills to advance your career or work on personal projects."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
                >

                    {/* Left Content - Steps List */}
                    <div className="w-full lg:w-[48%]">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">How It Works</h2>

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="flex justify-between items-end mb-1">
                                        <h3 className="text-sm font-bold text-gray-800">{step.title}</h3>

                                        {/* Dashed line filler */}
                                        <div className="flex-grow mx-3 mb-1.5 border-b border-dashed border-gray-400"></div>

                                        <span className="text-xl font-normal text-gray-800">{step.number}</span>
                                    </div>

                                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-[95%]">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full lg:w-[45%] relative mt-4 lg:mt-0"
                    >
                        {/* Reduced container size */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                            <img
                                src="/spotlight/spotlightimg.png"
                                alt="How it works"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;