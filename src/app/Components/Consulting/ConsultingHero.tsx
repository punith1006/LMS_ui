import React from 'react';

const AboutUsHero = () => {
    return (
        <section className="relative bg-white pt-8 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-600 leading-tight">
                            About Us
                        </h1>
                        <div className="space-y-6 text-gray-500 text-sm leading-relaxed text-justify font-light">
                            <p>
                                Global Knowledge Technologies (GKT) is a future-focused learning and technology organization empowering students, professionals, and institutions with real-world, industry-ready skills. Since 2002, we have been enabling the seamless adoption of Artificial Intelligence, emerging technologies, and globally recognized certifications through impactful training, collaborations, and innovation-driven solutions.
                            </p>
                            <p>
                                With a strong focus on bridging the gap between academia and industry, we deliver practical training programs, hands-on workshops, and transformative learning experiences that prepare individuals for the future of work.
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative flex justify-end lg:justify-center mt-8 lg:mt-0">
                        <div className="relative w-full max-w-xs">
                            <img
                                src="/Consulting/cons.png"
                                alt="About Us"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Grid Pattern (Linear Gradient from Spotlight) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_2px,transparent_3px),linear-gradient(to_bottom,#ccc_1px,transparent_3px)] bg-[size:50px_40px] opacity-10 pointer-events-none z-0" />
        </section>
    );
};

export default AboutUsHero;