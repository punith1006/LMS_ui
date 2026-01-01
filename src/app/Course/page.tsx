"use client";

import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CourseHero from "../Components/Course/CourseHero";
import HowItWorks from "../Components/Course/HowItWorks";
import LeadForm from "../Components/Course/LeadForm";
import TestimonialCarousel from "../Components/Course/TestimonialCarousel";

export default function CoursePage() {
  return (
    <div className="font-[family-name:var(--font-poppins)]">
      <Header activeSection="programs" />
      <main className="min-h-screen bg-white">
        <CourseHero />
        <HowItWorks />
        <LeadForm />
        <TestimonialCarousel />
      </main>
      <Footer activeSection="course" />
    </div>
  );
}
