"use client";
import React from "react";
import { motion } from "framer-motion";
import { basepath } from "@/app/common/constants";

const Nasscom = () => {
  return (
    <div className=" mx-auto flex flex-col justify-center items-center mt-32 px-4 sm:px-8">
      <div className="text-center mb-8">
        <p className="text-white text-2xl sm:text-3xl font-semibold">
          Pioneering Excellence with NASSCOM Membership
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-6/12 lg:w-5/12">
          <motion.div
            initial={{ y: -100 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="bg-light_blue p-2 md:p-6 rounded-xl flex flex-col justify-center items-center shadow-md"
          >
            <p className="text-white text-justify text-sm sm:text-base">
              Meta Cognitive Technologies (MCT) is proud to be a NASSCOM member,
              reinforcing its commitment to innovation and industry excellence.
              As a trusted partner for industry leaders like Google, IBM, RedHat,
              and Azure, MCT is committed to delivering cutting-edge learning
              solutions, including its own AI-driven courses, to shape the future
              of technology and education.
            </p>
          </motion.div>
        </div>

        <div className="hidden md:block h-32 w-[2px] rounded-lg bg-white"></div>

        <div className="w-full md:w-6/12 lg:w-5/12 flex justify-center">
          <motion.div
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="bg-light_blue rounded-xl flex justify-center items-center p-4 shadow-md"
          >
            <img
              src={`${basepath}/Techimages/nas.png`}
              alt="Nasscom"
              className="h-40 sm:h-48 md:h-52 lg:h-64 object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Nasscom;
