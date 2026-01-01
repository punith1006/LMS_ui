import BootcampTopics from "@/app/Component/Course/Bootcamp/Bootcamp";
export const dynamic = "force-dynamic";
import Course_details from "@/app/Component/Course/Course_details/Course_details";
import Eligibility from "@/app/Component/Course/Eligibility/Eligibility";
import FAQSection from "@/app/Component/Course/FAQ/Faq";
import FeatureAndRolesSection from "@/app/Component/Course/Feature&Role/FeatureandRole";
import SessionForm from "@/app/Component/Course/Form/SessionForm";
import Top_hiring_company from "@/app/Component/Course/Hiring_company/Top";
import CardSection from "@/app/Component/Course/Program/Program";
import Tools from "@/app/Component/Course/Tools/Tools";
import Footer from "@/app/Component/Footer/Footer";
import Header from "@/app/Component/Header/Header";
import React, { Suspense } from "react";
import Home from "../Component/Allcourses/page";
const ALLCourses = () => {
  return (
    <div>
          <Suspense fallback={<div>Loading...</div>}>
     <Home/>
     </Suspense>
    </div>
  );
};

export default ALLCourses;
