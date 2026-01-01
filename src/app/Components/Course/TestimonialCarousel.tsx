"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsRight, Quote } from "lucide-react";

const testimonials = [
  {
    content: "I was impressed by the depth and breadth of the cybersecurity course offered by GKT. The trainers were highly knowledgeable, and the content was incredibly relevant to the industry. I feel much more confident in my role now.",
    author: "James Anderson",
    role: "Cybersecurity Analyst",
    id: 1,
  },
  {
    content: "The web development bootcamp was intense but incredibly rewarding. I went from zero coding knowledge to building full-stack applications in just a few months. The mentorship was top-notch.",
    author: "Sarah Jenkins",
    role: "Full Stack Developer",
    id: 2,
  },
  {
    content: "The AI & Data Science program at GKT helped me transition from a generalist role to a highly specialized data scientist. It was exactly what I needed.",
    author: "Lentera Putri Atmaja",
    role: "Data Scientist",
    id: 3,
  },
  {
    content: "GKT's corporate training optimized our team's workflow significantly. The customized curriculum addressed our specific gaps expertly.",
    author: "Michael Chang",
    role: "CTO, TechFlow",
    id: 4,
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold text-[#EB900C] mb-8">Testimonial</h2>

          <div className="flex items-center gap-6 md:gap-10 min-h-[250px]">

            {/* Main Active Card - Bright & Large */}
            <div className="w-full md:w-[60%] flex-shrink-0 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 min-h-[220px] flex flex-col justify-between"
                >
                  <div className="flex gap-4 items-start">
                    <Quote className="text-[#EB900C] w-8 h-8 flex-shrink-0 fill-[#EB900C] transform rotate-180 mt-0.5" />
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                      {testimonials[activeIndex].content}
                    </p>
                  </div>
                  <div className="text-right mt-4">
                    <p className="text-sm font-bold text-gray-900">{testimonials[activeIndex].author}</p>
                    <p className="text-[10px] text-gray-400">{testimonials[activeIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Preview Card - Light, Small & Shifted */}
            <div className="hidden md:flex flex-1 items-center justify-start relative pl-2 opacity-100">
              {/* Visual container for the 'next' card look */}
              <div
                className="w-full bg-white rounded-[24px] p-6 border border-gray-100 opacity-40 scale-75 origin-left select-none relative"
                onClick={nextTestimonial}
              >
                <div className="flex gap-2 items-start">
                  <Quote className="text-[#EB900C] w-5 h-5 flex-shrink-0 fill-[#EB900C] transform rotate-180" />
                  <p className="text-gray-900 text-xs leading-relaxed line-clamp-3">
                    {testimonials[(activeIndex + 1) % testimonials.length].content}
                  </p>
                </div>
                <div className="text-right mt-3">
                  <p className="text-[11px] font-bold text-gray-500">{testimonials[(activeIndex + 1) % testimonials.length].author}</p>
                  <p className="text-[9px] text-gray-400">{testimonials[(activeIndex + 1) % testimonials.length].role}</p>
                </div>
              </div>

              {/* Arrow Button - Clearly separated to the right */}
              <button
                onClick={nextTestimonial}
                className="absolute right-0 translate-x-1/2 z-20 text-[#EB900C] hover:text-orange-600 transition-colors p-2.5 bg-white shadow-sm rounded-full cursor-pointer hover:shadow-md"
              >
                <ChevronsRight size={28} />
              </button>
            </div>

          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 border ${idx === activeIndex
                  ? "w-2.5 h-2.5 bg-gray-600 border-gray-600"
                  : "w-2.5 h-2.5 bg-white border-gray-300 hover:border-gray-400"
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
