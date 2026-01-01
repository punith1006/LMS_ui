"use client";

import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function OfferingsPage() {
    return (
        <div className="font-[family-name:var(--font-poppins)]">
            <Header activeSection="home" />
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Coming Soon</h1>
                    <p className="text-gray-500 text-lg">Our offerings are being curated for you. Stay tuned!</p>
                </div>
            </main>
            <Footer activeSection="offerings" />
        </div>
    );
}
