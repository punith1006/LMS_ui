"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Contactservices from "../Contactservices";
import { basepath } from "@/app/common/constants";
export default function Services() {
  const container = useRef<HTMLDivElement | null>(null);
  const [imagevalue, setimagevalue] = useState(1);

  const [key, setKey] = useState(0);
  const [PopupVisible, setPopupVisible] = useState(false);
  const togglePopup = () => {
    setPopupVisible(!PopupVisible);
  };
  
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [imagevalue]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.66, 0.67], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);
  const content = useTransform(scrollYProgress, [0, 0.43, 0.76], [1, 2, 3]);

  const xFirst = useTransform(scrollYProgress, [0.33, 0.5], [100, 0]);

  const text = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66],
    ["ailearning", "customize learning", "1-1 training"]
  );
  content.onChange((value) => {
    setimagevalue(Math.round(value));
  });
  return (
    <div className="h-[500vh] relative" ref={container}>
      <div className="p-10 sticky h-screen top-10 ">
        <h1 className="w-full text-white text-center text-4xl font-bold">
          SERVICES
        </h1>

        <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center h-full  ">
          <div className="md:basis-5/12 w-full flex justify-center mb-6 md:mb-0 md:mt-40 lg:mt-0">
            {imagevalue === 1 ? (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="relative w-40 h-40 md:w-72 md:h-72 bg-[#4c90ff] rounded-full flex justify-center items-center shadow-[0_0_0_10px_#ffffff,0_0_0_10px_#3b82f6]"
              >
                <div className="relative w-40 h-40 md:w-60 md:h-60 bg-white rounded-full flex justify-center items-center shadow-inner">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/ailearning.jpg`}
                    className="h-full w-full border object-cover"
                    style={{ clipPath: "circle(36% at 50% 50%)" }}
                  />
                </div>
                <div className="absolute -top-5 -left-5 bg-[#4c90ff] rounded-full p-3 md:p-5">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/ai-brain.png`}
                    className="h-12 md:h-24"
                  />
                </div>
              </motion.div>
            ) : imagevalue === 2 ? (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="relative w-40 h-40 md:w-72 md:h-72 bg-[#59b165] rounded-full flex justify-center items-center shadow-[0_0_0_10px_#ffffff,0_0_0_10px_#59b165]"
              >
                <div className="relative w-40 h-40 md:w-60 md:h-60 bg-white rounded-full flex justify-center items-center shadow-inner">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/customize1.png`}
                    className="h-full w-full border object-cover"
                    style={{ clipPath: "circle(40% at 50% 50%)" }}
                  />
                </div>
                <div className="absolute -top-5 -left-5 bg-[#59b165] rounded-full p-3 md:p-5">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/creativity.png`}
                    className="h-12 md:h-24"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="relative w-40 h-40 md:w-72 md:h-72 bg-[#9725ff] rounded-full flex justify-center items-center shadow-[0_0_0_10px_#ffffff,0_0_0_10px_#711cbf]"
              >
                <div className="relative w-40 h-40 md:w-60 md:h-60 bg-white rounded-full flex justify-center items-center shadow-inner">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/1to1.jpg`}
                    className="h-full w-full border object-cover"
                    style={{ clipPath: "circle(40% at 50% 50%)" }}
                  />
                </div>
                <div className="absolute -top-5 -left-5 bg-[#9725ff] rounded-full p-3 md:p-5">
                  <motion.img
                    key={key}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    src={`${basepath}/learning.png`}
                    className="h-12 md:h-24"
                  />
                </div>
              </motion.div>
            )}
          </div>
          <div className="md:basis-6/12 w-full text-white flex flex-col items-start justify-start">
            {imagevalue === 1 ? (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-full bg-white text-black p-4 md:p-5 rounded-xl"
              >
                <motion.h1 className="text-[#4c90ff] font-bold text-xl md:text-3xl lg:text-3xl mb-4">
                  AI Learning
                </motion.h1>
                <p className="text-justify text-sm md:text-base lg:text-base">
                  AI Learning refers to the process of acquiring knowledge and
                  skills related to artificial intelligence (AI). It encompasses
                  understanding key concepts such as machine learning, neural
                  networks, natural language processing, and computer vision.
                </p>
                <button                 onClick={togglePopup}
 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 mt-4 px-5 py-2.5 rounded-lg shadow-lg hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300">
                  Know More
                </button>
              </motion.div>
            ) : imagevalue === 2 ? (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-full bg-white text-black p-4 md:p-5 rounded-xl"
              >
                <motion.h1 className="text-[#59b165] font-bold text-xl md:text-3xl lg:text-3xl mb-4">
                  Customized Learning
                </motion.h1>
                <p className="text-justify text-sm md:text-base lg:text-base">
                  Discover a personalized and interactive way to learn with our
                  platform. Whether you're advancing your career, diving into a
                  new hobby, or brushing up on your skills, our tailored
                  resources and tools ensure a seamless and engaging learning
                  experience.
                </p>
                <button           
                      onClick={togglePopup}
 className="text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 mt-4 px-5 py-2.5 rounded-lg shadow-lg hover:bg-gradient-to-br focus:ring-4 focus:ring-emerald-300">
                  Know More
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={key}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-full bg-white text-black p-4 md:p-5 rounded-xl"
              >
                <motion.h1 className="text-[#9725ff] font-bold text-xl md:text-3xl lg:text-3xl mb-4">
                  1 to 1 Training
                </motion.h1>
                <p className="text-justify text-sm md:text-base lg:text-base">
                  Unlock your full potential with dedicated 1-to-1 training
                  tailored to your unique goals and pace. Work closely with
                  expert instructors who provide personalized guidance and
                  support.
                </p>
                <button
                                onClick={togglePopup}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 mt-4 px-5 py-2.5 rounded-lg shadow-lg hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300">
                  Know More
                </button>
              </motion.div>
            )}
          </div>
          {PopupVisible && (
                <div className="fixed  top-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Contactservices
                            isFromOffer={false}
                            data={null}
                            closeModel={() => setPopupVisible(false)}
                 />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
