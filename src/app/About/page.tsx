"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from 'next/head';

// import ContactUs from "@/components/contact/ContactUs";

import Journey from "../Component/about-us/about-us/Journey";
import { ParallaxProvider } from "react-scroll-parallax";
import Mission from "../Component/about-us/about-us/Mission";
import FixedImage from "../Component/about-us/about-us/animation";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import { basepath } from "../common/constants";
 
const Aboutpage: React.FC = () => {
  const [visibleCardIndex, setVisibleCardIndex] = useState(0); // Track the currently visible card
 

 

 
  return (
    <div
      className="bg-black h-auto  scroll-smooth w-auto"
      style={{ scrollBehavior: "smooth" }}
    >
      <Head>
       <title></title>
        <meta name="description" content="This is my project description" />
        <link rel="icon" href={`${basepath}/logo/mc1.png`} />
      </Head>

        <Header />
      <div>
        {/* <AboutUS/> */}
        <div className="relative">
           <FixedImage />
          <div className="h-[200vh]"></div>
          </div>
 
          <div className="z-30 relative bg-black">
          <ParallaxProvider>
      <Journey />
      <Mission />
    </ParallaxProvider>

    <Footer/>

          </div>
         
        {/* <Model3D/> */}
 
        {/* <Card/> */}
        {/* <ContactUs/> */}
      </div>
    </div>
  );
};
 
export default Aboutpage;