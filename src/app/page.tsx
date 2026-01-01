"use client";
import { ParallaxProvider } from "react-scroll-parallax";
import Spotlight from "./Components/Spotlight/Spotlight";
import ExpertiseScroll from "./Components/Our_expertise/Our_expertise";
import Header from "./Components/Header/Header";
import Network from "./Components/Our_network/Network";
import Clients from "./Components/Our_clients/Clients";
import Footer from "./Components/Footer/Footer";
import Prolearn from "./Components/Prolearn/Prolearn";
import { useState, useEffect, useRef } from "react";
import Newsletter from "./Components/NewsLetter/NewsLetter";
import Image from "next/image";

import Link from "next/link";
import useUserData from "@/app/hooks/userData";
import ConciergeBot from "@/components/ConciergeBot/ConciergeBot";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const { userData } = useUserData();

  const homeRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const prolearnRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 5;
      const sections = [
        { name: "home", ref: homeRef },
        { name: "network", ref: networkRef },
        { name: "expertise", ref: expertiseRef },
        { name: "prolearn", ref: prolearnRef },
        { name: "news", ref: newsRef },
        { name: "clients", ref: clientsRef },
      ];

      let newActiveSection = "home";

      sections.forEach(({ name, ref }) => {
        const element = ref.current;
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            newActiveSection = name;
          }
        }
      });

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);


  return (
    <>
      <Header activeSection={activeSection} />

      <ParallaxProvider>
        <div className="font-[family-name:var(--font-poppins)]">

          {/* <div className="h-[20vh]" /> */}
          <div className="relative  w-full  bg-[#F6F6F9]">
            <div ref={homeRef}>
              <Spotlight />
            </div>


            <div ref={prolearnRef}>
              <Prolearn />
            </div>



            <div ref={expertiseRef}>
              <ExpertiseScroll />
            </div>
            <div ref={networkRef}>
              <Network />
            </div>



            <div ref={clientsRef}>
              <Clients />
            </div>
            <div ref={newsRef}>
              <Newsletter />
            </div>
          </div>
        </div>
      </ParallaxProvider>
      <Footer activeSection={activeSection} />

      {/* Education Concierge Bot */}
      <ConciergeBot />
    </>
  );
}

