"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Mr. Sendhil Kumar",
        role: "Founder & Chairman",
        image: "/spotlight/team1.png", // Using placeholder available in project
    },
    {
        name: "Ms Lakshmi Sendhil",
        role: "Co-Founder",
        image: "/spotlight/team2.png",
    },
    {
        name: "Ms Radhika",
        role: "Vice President - Technology",
        image: "/spotlight/team3.png",
    },
    {
        name: "Mr.Dinesh",
        role: "Chief Technology Officer",
        image: "/spotlight/team4.png",
    },
    {
        name: "Ms. Chetana",
        role: "Business Head",
        image: "/spotlight/team5.png",
    },
    {
        name: "Mr. Pavan Kumar Bandham",
        role: "Product Development Head",
        image: "/spotlight/team6.png",
    },
    {
        name: "Ms. Lakshmi Prasanna",
        role: "Delivery & Operations Head",
        image: "/spotlight/team7.png",
    },
    {
        name: "Ms. Indu Priyadarshini",
        role: "Human Resource Head",
        image: "/spotlight/team8.png",
    },
    {
        name: "Mr. Peter Darius",
        role: "Practice Head - AI",
        image: "/spotlight/team9.png",
    },
    {
        name: "Mr. Sai Subramaniam",
        role: "Practice Head - Cloud & AI",
        image: "/spotlight/team10.png",
    }
];

const TeamGrid = () => {
    return (
        <section className="py-20 bg-[#F6F6F9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Team</h2>
                    <p className="text-gray-500 text-sm">
                        At the heart of GKT is a leadership team committed to innovation, transformation, and impact.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-transparent"
                        >
                            <div className="relative aspect-square mb-3 rounded-2xl overflow-hidden shadow-sm group">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-3 right-3 transition-opacity duration-300">
                                    <a href="#" className="p-2 bg-[#0077b5] rounded-full text-white inline-flex shadow-md hover:bg-[#006097] transition-colors">
                                        <Linkedin size={14} />
                                    </a>
                                </div>
                            </div>

                            <div className="text-left">
                                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">{member.name}</h3>
                                <p className="text-gray-500 text-[11px] font-medium">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
