"use client"
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";
import CountUp from "react-countup";
import { basepath } from "@/app/common/constants";

const Why_us = () => {
    const container = useRef<HTMLDivElement | null>(null);

    const items = [
        {
            image: `${basepath}/mentor.png`,
            title: 20,
            desc: "Mentors",
        },
        {
            image: `${basepath}/year.png`,
            title: 25,
            desc: "Years",
        },
        {
            image: `${basepath}/book.png`,
            title: 50000,
            desc: "Courses",
        },
        {
            image: `${basepath}/students.png`,
            title: 15000,
            desc: "Students",
        },
    ];

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const opacity1 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <div className="w-full">
            <main className="flex flex-col justify-center items-center gap-14 mt-24 w-full px-4 sm:px-8 md:px-12 lg:px-16">
                <motion.h1 className="text-white lg:text-black text-3xl sm:text-4xl font-bold text-center">WHY US</motion.h1>
                <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-center justify-around">
                    {items.map((e, index) => {
                        return (
                            <motion.div
                                key={e.title}
                                className="flex flex-col justify-around items-center text-center space-y-4"
                                style={{ opacity: opacity1 }}
                            >
                                <motion.div>
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 rounded-full bg-purple-500 flex items-center justify-center">
                                        <img alt={e.desc} className="h-10 sm:h-12 md:h-14 w-auto" src={e.image} />
                                    </div>
                                </motion.div>
                                <motion.div>
                                    <div className="text-xl sm:text-2xl md:text-2xl font-bold text-white lg:text-black">
                                        <CountUp enableScrollSpy end={e.title} /> <span>+</span>
                                    </div>
                                    <p className="text-base sm:text-lg md:text-sm text-white lg:text-black font-medium">
                                        {e.desc}
                                    </p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </section>
            </main>
        </div>
    );
};

export default Why_us;
