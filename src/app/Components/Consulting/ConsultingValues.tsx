"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const values = [
    {
        title: "Practical, Job-Ready Training",
        description: "Industry-aligned programs taught by certified experts with real-world experience",
        image: "/Consulting/consulting1.png"
    },
    {
        title: "Globally Recognized Certifications",
        description: "Credentials that strengthen employability and organizational capability",
        image: "/Consulting/consulting3.png"
    },
    {
        title: "Customized Learning Paths",
        description: "Tailored programs designed to meet the needs of students, universities, and corporates",
        image: "/Consulting/consulting2.png"
    },
    {
        title: "Future-Ready Technology Focus",
        description: "Training aligned with AI, Cloud, Data, Cybersecurity, DevOps, and more",
        image: "/Consulting/consulting4.png"
    }
];

const ConsultingValues = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose GKT</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group text-center"
                        >
                            {/* Image Container - Fully Rounded */}
                            <div className="relative h-40 w-full mb-4 rounded-[24px] overflow-hidden shadow-sm">
                                <Image
                                    src={value.image}
                                    alt={value.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="px-2">
                                <h3 className="text-lg font-normal text-gray-800 mb-3 leading-snug">{value.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultingValues;
