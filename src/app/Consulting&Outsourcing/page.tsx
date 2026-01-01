"use client";

import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ConsultingHero from "../Components/Consulting/ConsultingHero";
import ConsultingValues from "../Components/Consulting/ConsultingValues";
import MissionVision from "../Components/Consulting/MissionVision";
//import ConsultingPillars from "../Components/Consulting/ConsultingPillars";
import Timeline from "../Components/Consulting/Timeline";
import TeamGrid from "../Components/Consulting/TeamGrid";

export default function ConsultingOutsourcingPage() {
  return (
    <div className="font-[family-name:var(--font-poppins)]">
      <Header activeSection="consulting" />
      <main className="min-h-screen bg-white">
        <ConsultingHero />
        <ConsultingValues />
        <MissionVision />
        <Timeline />
        <TeamGrid />
      </main>
      <Footer activeSection="Consulting" />
    </div>
  );
}
