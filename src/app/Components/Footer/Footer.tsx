"use client";

import Image from "next/image";
import React from "react";

interface FooterProps {
    activeSection: string;
}

const Footer: React.FC<FooterProps> = ({ activeSection }) => {
    const getFooterBackground = () => {
        switch (activeSection) {
            case "home":
                return "bg-[#101010]";
            default:
                return "bg-[#1A1A1A]";
        }
    };

    const getTextColour = () => {
        switch (activeSection) {
            case "home":
                return "text-white";
            default:
                return "text-white";
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer
            className={`${getFooterBackground()} ${getTextColour()} px-6 py-12 md:py-16 relative`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
                    {/* Left Section - Logo and Subscribe */}
                    <div className="flex flex-col gap-6 w-full lg:w-auto">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Image
                                src={'/gkt_light.png'}
                                alt="My Logo"
                                width={100}
                                height={10}
                            />
                        </div>

                        {/* Subscribe Button and Get Started */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <input type="text" placeholder="Subscribe now" className="text-[#262626]  px-6 py-2.5 rounded-full text-sm font-medium bg-gray-100 transition-colors w-full sm:w-auto " />
                            {/* <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto">
                Subscribe now
              </button> */}
                            <button className="text-white text-sm bg-[#262626] p-2 cursor-pointer rounded-2xl hover:text-gray-300 transition-colors">
                                Get started
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-8 h-8  hover:scale-105  rounded-full flex items-center justify-center bg-white/10 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 hover:scale-105   rounded-full flex items-center justify-center bg-white/10 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 hover:scale-105   rounded-full flex items-center justify-center bg-white/10 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 hover:scale-105  rounded-full flex items-center justify-center bg-white/10 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Section - Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-sm w-full lg:w-auto font-light text-[#FFFFFFE0]">
                        {/* Index */}
                        <div>
                            <h3 className=" mb-4 ">Index</h3>
                            <ul className="space-y-2.5 text-gray-400 ">
                                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Our Presence</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className=" mb-4 ">Resources</h3>
                            <ul className="space-y-2.5 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Course</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">AI assistant</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className=" mb-4 ">Support</h3>
                            <ul className="space-y-2.5 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community Forums</a></li>
                            </ul>
                        </div>

                        {/* Legal - Hidden on mobile, shown on md+ */}
                        {/* <div className="hidden md:block">
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2.5 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div> */}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © 2025 Global Knowledge Technologies. All rights reserved.
                    </p>

                    {/* Legal Links for Mobile */}
                    <div className="flex items-center justify-center w-full md:w-1/2 gap-4 text-sm text-gray-400 ">
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute cursor-pointer bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center border border-white transition-all shadow-lg hover:shadow-xl z-50"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            </div>
        </footer>
    );
};

export default Footer;