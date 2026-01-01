// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform,useSpring, useInView, useMotionValueEvent } from "framer-motion";
// import SmoothScroll from "../SmoothScroll";

// const services = [
//   {
//     id: 1,
//     title: "Specialist Resource Support",
//     description:
//       "Strengthen your team with top-tier IT professionals tailored to your project needs. Our flexible resource augmentation services help bridge skill gaps, handle peak workloads, and infuse specialized expertise into your initiatives.",
//     detail:
//       "We ensure a perfect fit by aligning our experts with your unique requirements, enabling smooth integration and instant value delivery.",
//     image: "/Consulting/outsourcing/support1.png",
//     color: "from-blue-500 to-purple-600",
//   },
//   {
//     id: 2,
//     title: "End-to-End IT Support",
//     description:
//       "Focus on your business priorities while we take full ownership of your IT environment. Our managed services deliver continuous oversight and expert care for your infrastructure, software, and operational processes.",
//     detail:
//       "With proactive monitoring, routine maintenance, and swift issue resolution, we ensure your systems remain secure, efficient, and reliable, eliminating downtime and reducing risks. Partner with us to transform your IT from a cost centre into a strategic asset.",
//     image: "/Consulting/outsourcing/end1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 3,
//     title: "Adaptive Workforce Solutions",
//     description:
//       "Stay agile in a dynamic business environment with our customizable staffing options. From short-term contracts and contract-to-hire arrangements to permanent hires",
//     detail:
//       "we deliver the precise talent your organization needs. Whether you're scaling for a project or strengthening your core team, our flexible approach ensures you get the right professionals exactly when you need them.",
//     image: "/Consulting/outsourcing/workforce1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 4,
//     title: "Industry-Leading Expertise",
//     description:
//       "Tap into a curated network of IT specialists across diverse fields such as cloud computing, cybersecurity, DevOps, data analytics, artificial intelligence, networking, and beyond.",
//     detail:
//       "Our professionals continuously upgrade their skills and certifications to stay ahead of industry advancements, delivering innovative solutions and deep domain knowledge that empower your business to thrive.",
//     image: "/Consulting/outsourcing/leading1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 5,
//     title: "Affordable Talent Solutions",
//     description:
//       "Maximize your budget while accessing top-tier talent through our economical outsourcing options. Designed to deliver exceptional value",
//     detail:
//       "our flexible pricing and engagement structures let you adjust team size effortlessly to align with your project demands and financial goals, eliminating the pressure of fixed, long-term expenses.",
//     image: "/Consulting/outsourcing/solutions1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 6,
//     title: "Global Talent Footprint",
//     description:
//       "Stay agile in a dynamic business environment with our customizable staffing options. From short-term contracts and contract-to-hire arrangements to permanent hires",
//     detail:
//       "we deliver the precise talent your organization needs. Whether you're scaling for a project or strengthening your core team, our flexible approach ensures you get the right professionals exactly when you need them.",
//     image: "/Consulting/outsourcing/global1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 7,
//     title: "Talent on Demand",
//     description:
//       "Seize opportunities without delay through our swift resource deployment services. Designed for speed and precision, we quickly match you with skilled professionals who are ready to contribute from day one.",
//     detail:
//       "Our agile approach and efficient onboarding processes help you maintain project momentum and meet tight timelines with confidence.",
//     image: "/Consulting/outsourcing/talent1.png",
//     color: "from-cyan-500 to-blue-600",
//   },
// ];
// const ConsultingServices: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });
//   const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 250]);
//   const wheelRotate = useSpring(rawRotate, { stiffness: 280, damping: 30 });

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     console.log("Scroll Progress:", latest); // value from 0 to 1
//   });
//   // ---- tweak here ----
//   const radius = 530;          // how far spokes extend
//   const arcDegrees = 250;      // span of the arc
//   const startAngle = -70;      // starting angle in degrees (top-left)
//   // ---------------------

//   const angleStep = arcDegrees / (services.length - 1);
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
//   const rawTranslateY = useTransform(scrollYProgress, [0, 0.3,0.6,0.7,1], ["0%", "-26%","-8%","14%","28%"]);
//   const translateY = useSpring(rawTranslateY, { stiffness: 280, damping: 30 });

//   const rawTranslateX = useTransform(scrollYProgress, [0,0.2, 0.5,0.6,0.7,0.95,1], ["12%","25%","50%","56%","56%","40%","35%"]);
//   const translateX = useSpring(rawTranslateX, { stiffness: 280, damping: 30 });

// const ref = useRef<HTMLDivElement | null>(null);
//   const isInView = useInView(ref, { amount: 0.5, once: false });
//   useEffect(() => {
//     const handleScroll = () => {
//       sectionRefs.current.forEach((section, index) => {
//         if (!section) return;
//         const rect = section.getBoundingClientRect();
//         if (
//           rect.top <= window.innerHeight / 2 &&
//           rect.bottom >= window.innerHeight / 2
//         ) {
//           setActiveIndex(index);
//         }
//       });
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const prevIndex = activeIndex > 0 ? activeIndex - 1 : null;
//   const nextIndex = activeIndex < services.length - 1 ? activeIndex + 1 : null;

//   return (
//     <div ref={containerRef}>
//                            <SmoothScroll />


//       <div className="relative flex w-full min-h-screen max-w-7xl    py-10">
//         <div className="w-3/4 px-20 py-20  bg-white flex flex-col justify-center ">
//          <p className="text-[#001A75] text-2xl  font-semibold ">
//         Outsourcing
//       </p>
//           {services.map((service, index) => {
//               const ref = useRef<HTMLDivElement | null>(null);
//   const isInView = useInView(ref, { once: false, margin: '-10% 0px -80% 0px' });

//   return(
//             <motion.div
//              ref={(el) => {
//                 sectionRefs.current[index] = el;
//                           ref.current = el;      

//               }}
//             initial={{opacity:0}}
//       whileInView={{ opacity: 1 }}

//             transition={{duration:1,ease:"easeOut"}}
//               key={service.id}

//               className={` flex flex-col justify-center w-full ${index==0?'py-10':'py-18'}`}
//             >
//               <h2 className="text-4xl font-bold text-black mb-3">
//                 {service.title}
//               </h2>
//               <p className="mt-4 mb-3 text-lg text-gray-700">
//                 {service.description}
//               </p>
//               <p className="mt-2 text-lg text-gray-700">{service.detail}</p>
//             </motion.div>)
// })}
//         </div>

//         <div className="w-1/2 sticky top-20  h-[510px] flex items-start justify-center overflow-hidden"> 
//       <motion.div
//   style={{
//     rotate:wheelRotate,
//     position: "absolute",
//     right: -radius,
//     top: "50%",
//     width: radius * 2,
//     height: radius * 2,
//     marginTop: -radius,
//     pointerEvents: "none",
// y:translateY,
// x:translateX
//   }}
// >
//         {services.toReversed().map((s, i) => {

//           const angle = startAngle + i * angleStep + (i == 2 ? 4 : i==1?6:i==0?6:0)   ; // deg
//           const tileW = 480;
//           const tileH = 120;

//           return (
//             <motion.div
//               key={s.id}
//               style={{
//                 position: "absolute",
//                 left: "50%",
//                 top: "50%",
//                 width: `${tileW}px`,
//                 height: `${tileH}px`,
//                 transform: `rotate(${angle}deg) translate(${radius}px)`,
//                 transformOrigin: "center center",
//                 display: "flex",
//                 alignItems: "start",
//                 justifyContent: "center",

//               }}

//   animate={{
//     opacity: activeIndex === 6 - i ? 1 : 0.1, // smooth transition
//   }}
//   transition={{
//     duration: 0.8, // duration in seconds
//     ease: "easeInOut",
//   }}
//             >
//               <Image
//                 src={s.image}
//                 alt={s.title}
//                 width={tileW}
//                 height={tileH}
//                 className="object-cover  rounded-sm scale-y-[-1] scale-x-[-1] "
//                 unoptimized  
//               />
//             </motion.div>
//           );
//         })}
//       </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultingServices;


"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import SmoothScroll from "../SmoothScroll"

const services = [
    {
        id: 1,
        title: "Specialist Resource Support",
        description:
            "Strengthen your team with top-tier IT professionals tailored to your project needs. Our flexible resource augmentation services help bridge skill gaps, handle peak workloads, and infuse specialized expertise into your initiatives.",
        detail:
            "We ensure a perfect fit by aligning our experts with your unique requirements, enabling smooth integration and instant value delivery.",
        image: "/Consulting/outsourcing/support1.png",
        color: "from-blue-500 to-purple-600",
    },
    {
        id: 2,
        title: "End-to-End IT Support",
        description:
            "Focus on your business priorities while we take full ownership of your IT environment. Our managed services deliver continuous oversight and expert care for your infrastructure, software, and operational processes.",
        detail:
            "With proactive monitoring, routine maintenance, and swift issue resolution, we ensure your systems remain secure, efficient, and reliable, eliminating downtime and reducing risks. Partner with us to transform your IT from a cost centre into a strategic asset.",
        image: "/Consulting/outsourcing/end1.png",
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: 3,
        title: "Adaptive Workforce Solutions",
        description:
            "Stay agile in a dynamic business environment with our customizable staffing options. From short-term contracts and contract-to-hire arrangements to permanent hires",
        detail:
            "We deliver the precise talent your organization needs. Whether you're scaling for a project or strengthening your core team, our flexible approach ensures you get the right professionals exactly when you need them.",
        image: "/Consulting/outsourcing/workforce1.png",
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: 4,
        title: "Industry-Leading Expertise",
        description:
            "Tap into a curated network of IT specialists across diverse fields such as cloud computing, cybersecurity, DevOps, data analytics, artificial intelligence, networking, and beyond.",
        detail:
            "Our professionals continuously upgrade their skills and certifications to stay ahead of industry advancements, delivering innovative solutions and deep domain knowledge that empower your business to thrive.",
        image: "/Consulting/outsourcing/leading1.png",
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: 5,
        title: "Affordable Talent Solutions",
        description:
            "Maximize your budget while accessing top-tier talent through our economical outsourcing options. Designed to deliver exceptional value",
        detail:
            "Our flexible pricing and engagement structures let you adjust team size effortlessly to align with your project demands and financial goals, eliminating the pressure of fixed, long-term expenses.",
        image: "/Consulting/outsourcing/solutions1.png",
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: 6,
        title: "Global Talent Footprint",
        description:
            "Stay agile in a dynamic business environment with our customizable staffing options. From short-term contracts and contract-to-hire arrangements to permanent hires",
        detail:
            "We deliver the precise talent your organization needs. Whether you're scaling for a project or strengthening your core team, our flexible approach ensures you get the right professionals exactly when you need them.",
        image: "/Consulting/outsourcing/global1.png",
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: 7,
        title: "Talent on Demand",
        description:
            "Seize opportunities without delay through our swift resource deployment services. Designed for speed and precision, we quickly match you with skilled professionals who are ready to contribute from day one.",
        detail:
            "Our agile approach and efficient onboarding processes help you maintain project momentum and meet tight timelines with confidence.",
        image: "/Consulting/outsourcing/talent1.png",
        color: "from-cyan-500 to-blue-600",
    },
];

const ConsultingServices: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);


    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const wheelRotate = useSpring(rawRotate, { stiffness: 280, damping: 30 });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Scroll Progress:", latest); // value from 0 to 1
    });
    // ---- tweak here ----
    const radius = 530;          // how far spokes extend
    const arcDegrees = 250;      // span of the arc
    const startAngle = -70;      // starting angle in degrees (top-left)
    // ---------------------

    const angleStep = arcDegrees / (services.length - 1);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const rawTranslateY = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.7, 1], ["0%", "-20%", "-5%", "14%", "28%"]);
    const translateY = useSpring(rawTranslateY, { stiffness: 280, damping: 30 });

    const rawTranslateX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.6, 0.7, 0.9, 1], ["12%", "25%", "50%", "54%", "54%", "45%", "35%"]);
    const translateX = useSpring(rawTranslateX, { stiffness: 280, damping: 30 });

    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { amount: 0.5, once: false });
    useEffect(() => {
        const handleScroll = () => {
            sectionRefs.current.forEach((section, index) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                if (
                    rect.top <= window.innerHeight / 2 &&
                    rect.bottom >= window.innerHeight / 2
                ) {
                    setActiveIndex(index);
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const prevIndex = activeIndex > 0 ? activeIndex - 1 : null;
    const nextIndex = activeIndex < services.length - 1 ? activeIndex + 1 : null;
    if (isMobile) {
        return (
            <div ref={containerRef} className="relative w-full bg-white py-10">
                <div className="px-4 mb-8">
                    <p className="text-[#001A75] text-xl font-semibold">Outsourcing</p>
                </div>

                <div className="relative flex flex-col items-center">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            ref={(el) => { sectionRefs.current[index] = el }}
                            className="w-[90%] bg-white rounded-lg border border-gray-100 mb-8 p-4"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={400}
                                height={200}
                                className="object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg text-center font-semibold text-gray-900 mb-2 ">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 text-justify">{service.description}</p>
                            <p className="text-gray-600 text-sm text-justify">{service.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div ref={containerRef}>
            <SmoothScroll />


            <div className="relative flex w-full min-h-screen     py-10">
                <div className="w-3/4 px-20 py-20  bg-white flex flex-col justify-center ">
                    <p className="text-[#001A75] text-2xl  font-semibold ">
                        Outsourcing
                    </p>
                    {services.map((service, index) => {
                        return (
                            <ServiceSection
                                key={service.id}
                                service={service}
                                index={index}
                                sectionRefs={sectionRefs}
                            />
                        );
                    })}
                </div>

                <div className="w-1/2 sticky top-20  h-[510px] flex items-start justify-center overflow-hidden">
                    <motion.div
                        style={{
                            rotate: wheelRotate,
                            position: "absolute",
                            right: -radius,
                            top: "50%",
                            width: radius * 2,
                            height: radius * 2,
                            marginTop: -radius,
                            pointerEvents: "none",
                            y: translateY,
                            x: translateX
                        }}
                    >
                        {services.toReversed().map((s, i) => {

                            const angle = startAngle + i * angleStep + (i == 2 ? 4 : i == 1 ? 6 : i == 0 ? 2 : 0); // deg
                            const tileW = 480;
                            const tileH = 120;

                            return (
                                <motion.div
                                    key={s.id}
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        width: `${tileW}px`,
                                        height: `${tileH}px`,
                                        transform: `rotate(${angle}deg) translate(${radius}px)`,
                                        transformOrigin: "center center",
                                        display: "flex",
                                        alignItems: "start",
                                        justifyContent: "center",

                                    }}

                                    animate={{
                                        opacity: activeIndex === 6 - i ? 1 : 0.1, // smooth transition
                                    }}
                                    transition={{
                                        duration: 0.8, // duration in seconds
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Image
                                        src={s.image}
                                        alt={s.title}
                                        width={tileW}
                                        height={tileH}
                                        className="object-cover  rounded-sm scale-y-[-1] scale-x-[-1] "
                                        unoptimized
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ServiceSection: React.FC<{
    service: typeof services[0];
    index: number;
    sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}> = ({ service, index, sectionRefs }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "-10% 0px -80% 0px",
    });

    return (
        <motion.div
            ref={(el) => {
                sectionRefs.current[index] = el;
                ref.current = el;
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col justify-center w-full ${index === 0 ? "py-10" : "py-16"
                }`}
        >
            <h2 className="text-4xl font-bold text-black mb-3">
                {service.title}
            </h2>
            <p className="mt-4 mb-3 text-lg text-gray-700">
                {service.description}
            </p>
            <p className="mt-2 text-lg text-gray-700">{service.detail}</p>
        </motion.div>
    );
};

export default ConsultingServices;



