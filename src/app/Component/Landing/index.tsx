"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import CountUp from "react-countup";
import { useRouter } from 'next/navigation';

import dynamic from "next/dynamic";
import Popular_courses from "../Popularcourse/Popularcourse";
import Why_us from "../Why-us/Why-us";
import { basepath } from "@/app/common/constants";

export default function Landing() {
  const container = useRef<HTMLDivElement | null>(null);
      const router = useRouter();
  
  const items = [
    {
      image: "/mentor.png",
      title: 20,
      desc: "Mentors",
    },
    {
      image: "/year.png",
      title: 25,
      desc: "Years",
    },
    {
      image: "/book.png",

      title: 50000,
      desc: "Courses",
    },
    {
      image: "/students.png",
      title: 15000,
      desc: "Students",
    },
  ];
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        setIsLoaded(true);
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 0.9],
    [1, 20, 3, 1]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 0.9],
    [0, 0, 100, 0]
  );

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7],
    ["0%", "10%", "70%", "100%"]
  );

  const height = useTransform(scrollYProgress, [0.03, 0.3], ["0vh", "100vh"]);
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const border = useTransform(scrollYProgress, [0.9, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0.01, 0.23], [0, 1]);

  const Top = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7],
    ["0%", "30%", "50%"]
  );

  const width = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 0.8],
    [6, 100, 1000, 0]
  );

  const translateYText = useTransform(
    scrollYProgress,
    [0.6, 0.8, 1],
    ["200%", "100%", "100%"]
  );

  const opacityText = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0.03, 0.2, 0.5],
    ["circle(1% at 50% 50%)", "circle(1% at 50% 50%)", "circle(80% at 50% 50%)"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("x changed to", latest);
  });

  return (
    <div className="w-full relative" ref={container}>
      <div className="h-screen relative -top-20 z-0 pt-32">
        <div className="flex items-center flex-col justify-center px-4 md:px-10 w-full h-full">
          <video
            className="absolute top-0 left-0 w-full bg-black opacity-30 h-full object-cover -z-10"
            src={`${basepath}/video/aibg.mp4`}
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col lg:flex-row space-y-20 md:space-y-40 lg:space-y-0">
          <div className="basis-7/12 mt-10">
                <div className="flex items-end w-full justify-end relative">
                  <hr className="w-4/12 border-t-8 border-white -top-8 md:-top-16  right-6 lg:right-28 absolute" />
                  <hr className="w-4/12 border-t-4 border-[#711cbf] rotate-90  right-1 md:-top-5 lg:right-10  absolute" />
                </div>

                <motion.h1
                  initial={{ x: 0 }}
                  whileInView={{ x: -100 }}
                  transition={{ type: "spring", duration: 2 }}

                  className="text-4xl md:text-6xl  font-semibold text-white dark:text-white text-center ml-32  md:m-0 "
                >
                  LE<span className="text-[#711cbf]">A</span>RNING
                </motion.h1>
                <motion.h1
                  initial={{ transform: "translateX(-100px)" }}
                  whileInView={{ transform: "translateX(0px)" }}
                  transition={{ type: "spring", duration: 2 }}
                  className="text-4xl md:text-6xl  font-semibold text-white mt-2 dark:text-white text-center "
                >
                  REDEF<span className="text-[#711cbf]">I</span>NED
                </motion.h1>
                <hr className="w-4/12 border-t-8 border-[#711cbf] mt-10" />
                <hr className="w-4/12 border-t-4 border-white rotate-90 -ml-10  md:-ml-16 -mt-10 md:-mt-12" />
              </div>
            <div className="basis-full md:basis-5/12 text-justify ">
              <hr className="w-1/12 border-t-4 border-[#711cbf] mb-2" />
              <span className="text-sm md:text-2xl lg:text-sm text-white font-Poppins">
                Meta Cognitive empowers students and professionals with
                personalized pathways in emerging technologies, leveraging AI
                to drive innovation and success. We deliver industry-relevant
                courses tailored to individual goals, aligned with market
                demands, and enriched with practical projects and real-world
                case studies. Through AI-driven solutions, we personalize
                learning, promote creativity, and equip learners with essential
                future-ready skills.
              </span>
              <div className="flex flex-col sm:flex-row justify-start gap-6 md:gap-12 py-8 w-full md:w-3/4">
                <button
                  type="submit"
                  className="flex justify-center text-white gap-2 items-center shadow-xl hover:scale-105 text-lg bg-gradient-to-b from-[#711cbf] via-[#7f56f3] to-[#5691f3] backdrop-blur-md lg:font-semibold isolation-auto relative z-10 px-4 py-2 rounded-full group"
                  onClick={() => router.push('/Offers')}
                >
                  GET STARTED
                  <svg
                    className="w-6 md:w-8 h-6 md:h-8 group-hover:rotate-90 bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 md:p-2 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-gray-800 group-hover:fill-gray-800"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
