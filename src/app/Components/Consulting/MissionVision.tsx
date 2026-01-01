"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MissionVision = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Image - Hands joining */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/3"
                    >
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/spotlight/spotlightimg6.png" // Placeholder
                                alt="Team collaboration"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </motion.div>

                    {/* Center - Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/3 space-y-6"
                    >
                        <h3 className="text-gray-600 text-3xl font-light">Mission</h3>
                        <div className="space-y-6 text-gray-500 text-sm leading-relaxed text-justify font-light">
                            <p>
                                To empower students, learners, and professionals with advanced skills, hands-on knowledge, and globally recognized certifications, preparing them to thrive in a rapidly evolving, technology-driven world.
                            </p>
                            <p>
                                We aim to deliver impactful, industry-ready training that keeps learners and organizations future-proof.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right - Vision */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full lg:w-1/3 space-y-6"
                    >
                        <h3 className="text-gray-600 text-3xl font-light">Vision</h3>
                        <div className="space-y-6 text-gray-500 text-sm leading-relaxed text-justify font-light">
                            <p>
                                To shape an AI-powered future where every learner, institution, and organization can harness the transformative power of technology.
                            </p>
                            <p>
                                We envision a world where learning is dynamic, skills stay ahead of the curve, and innovation becomes accessible to all.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MissionVision;
