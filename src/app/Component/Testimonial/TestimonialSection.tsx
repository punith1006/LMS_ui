"use client"
import { basepath } from "@/app/common/constants";
import React, { useState, useEffect } from "react";
 
interface TestimonialProps {
  RightSrc: string;
  bottomSrc: string;
  avatarSrc: string;
  testimonialText: string;
  authorName: string;
  authorTitle: string;
}
 
const TestimonialSection: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      RightSrc: "/images/blue-round.png",
      bottomSrc: "/images/gradient-round.png",
      avatarSrc:
        `${basepath}/user/ps1.jpg`,
      testimonialText:
        "If anyone is looking to create a book cover, this is the place you need to visit. My editor recommended design and I am glad she did. My only regret is that I didn't hear about them for my first 3 books. They did a great job!!",
      authorName: "Sagar",
      authorTitle: "Cloud Architect",
    },
    {
      RightSrc: "/images/blue-round.png",
      bottomSrc: "/images/gradient-round.png",
      avatarSrc:
      `${basepath}/user/ps2.jpg`,
      testimonialText:
        "I had an amazing experience working with this team. The designs were outstanding, and the turnaround time was incredibly fast. Highly recommend!",
      authorName: "Samantha",
      authorTitle: "Data Analyst",
    },
    {
      RightSrc: "/images/blue-round.png",
      bottomSrc: "/images/gradient-round.png",
      avatarSrc:
      `${basepath}/user/ps3.jpg`,
      testimonialText:
        "Professional, talented, and creative—this team exceeded all my expectations! I love my new book cover!",
      authorName: "Disha",
      authorTitle: "System Engineer",
    },
    {
      RightSrc: "/images/blue-round.png",
      bottomSrc: "/images/gradient-round.png",
      avatarSrc:
      `${basepath}/user/ps4.jpg`,
      testimonialText:
        "Simply the best! The attention to detail and quality of work are unmatched. I can't recommend them enough!",
      authorName: "Karthik",
      authorTitle: "Data Analyst",
    },
  ];
 
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
 
    return () => clearInterval(interval);
  }, [testimonials.length]);
 
  const testimonialData = testimonials[currentTestimonialIndex];
 
  return (
    <div className="flex overflow-hidden flex-col items-center px-6 pt-20 pb-16 text-white bg-black md:px-20 md:pt-32 md:pb-24 ">
      <h1 className="font-bold text-4xl text-primary mb-16">Testimonials</h1>
      <div className="relative flex flex-col p-5 mt-10 w-full max-w-3xl rounded-3xl bg-gradient-to-bl from-gray-500 opacity-100 to-black text-center shadow-lg border-white border-t-2 ">
        <div className="items-start">
          <img
            loading="lazy"
            src={testimonialData.avatarSrc}
            alt={`${testimonialData.authorName}'s profile picture`}
            className="z-10 -mt-24 ml-10 justify-start items-start place-content-start h-36 w-36 object-cover rounded-full border-4 border-white shadow-md"
          />
          <p className="relative z-10 mt-8 px-8 text-lg italic md:text-xl">
            {testimonialData.testimonialText}
          </p>
        </div>
        <div className="relative z-10 mt-10 flex flex-col items-center text-center">
          <span className="text-2xl font-semibold">
            {testimonialData.authorName}
          </span>
          <span className="text-sm text-gray-400">
            {testimonialData.authorTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
 
export default TestimonialSection;