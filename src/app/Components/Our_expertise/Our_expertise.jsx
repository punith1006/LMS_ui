'use client'
import { Bot, Brain, ChevronRight, CornerDownRight, HandHeart, HeartPulse } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

const expertiseData = {
    sections: [
        {
            id: 'gkt-learning',
            title: 'GKT Learning Edge',
            subtitle: 'Empower students with cutting-edge skills for career',
            categories: [
                {
                    name: 'Enterprise',
                    icon: '↗',
                    description: 'A strategic model for growth, innovation, and execution—delivering industry-aligned training, emerging tech programs, and CRM-enriched learning for new employees and professional rehab.'
                },
                {
                    name: 'Corporate',
                    icon: '↗',
                    description: 'A strategic model for growth, innovation, and execution—enhancing industry-aligned training, emerging tech programs, and CRM-enriched learning to help enterprises and professionals project.'
                },
                {
                    name: 'College',
                    icon: '↗',
                    description: 'A strategic model for growth, innovation, and resilience—delivering industry-aligned training, emerging/challenging career, and CRM-enriched learning to help enterprises and professionals excel.'
                },
                {
                    name: 'Government',
                    icon: '↗',
                    description: 'A strategic model for growth, innovation, and resilience—delivering industry-aligned training, emerging tech programs, and CRM-enriched learning for new employees and professional rehab.'
                }
            ]
        },
        {
            id: 'consulting',
            title: 'Consulting & Outsourcing',
            subtitle: 'End-to-end enterprise solutions crafted meticulously for careers',
            features: [
                'End-to-end application development using Agile methodologies',
                'Custom app development and legacy system modernization',
                'Infrastructure support including system administration and migrations',
                'Quality assurance, testing, and open deployment maintenance',
                'Expertise in AI, cloud integration, SRE automation, API, and strategic solutions',
                'Expert in technologies like JAVA, SAP, React.js, Python, IBM datapoint, and more'
            ]
        },
        {
            id: 'products',
            title: 'Products',
            subtitle: 'Empower students with cutting-edge skills for career',
            items: [
                {
                    name: 'Vivaah Ai',
                    image: '/Products/Vivaaha.png',
                    icon: <HandHeart />,
                    description: 'Learn efficiently deliver AI-armed content helping you pass work-life balance, pass job exams and streamline modular.ai',
                },
                {
                    name: 'Stu',
                    image: '/Products/Stu.png',
                    icon: <Bot />,
                    description: 'Learn efficiently deliver AI-armed content helping you pass work-life balance, pass job exams and streamline education.',
                },

                {
                    name: 'PHC',
                    image: '/Products/Phc.png',
                    icon: <HeartPulse />,
                    description: 'Learn efficiently deliver AI-armed content helping you pass work-life balance, pass job exams and streamline modular.ai',
                },
                {
                    name: 'AIA',
                    image: '/Products/Aia.png',
                    icon: <Brain />,
                    description: 'Learn efficiently deliver AI-armed content helping you pass work-life balance, pass job exams and streamline modular.ai',
                }
            ]
        }
    ]
};

export default function ExpertiseNavigator() {
    const [activeSection, setActiveSection] = useState(0);
    const parentContainerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Track parent container scroll and update active section
    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            const container = parentContainerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const containerTop = rect.top;
            const containerHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate how far through the container we've scrolled
            const scrollProgress = -containerTop / (containerHeight - viewportHeight);
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // Calculate which section based on progress
            const sectionIndex = Math.floor(clampedProgress * expertiseData.sections.length);
            const clampedIndex = Math.max(0, Math.min(sectionIndex, expertiseData.sections.length - 1));

            setActiveSection(clampedIndex);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    const renderContent = (section) => {
        if (section.id === 'gkt-learning') {
            return (
                <div className="space-y-6 w-fit relative flex flex-col md:block">
                    {section.categories.map((category, index) => (
                        <div
                            key={index}
                            className={`
        bg-[#FAFAFA] rounded-2xl p-2 
        w-fit md:w-[60%]
      `}
                            style={{
                                marginLeft:
                                    !isMobile && index === 1 ? "14rem" : !isMobile && index === 2 ? "10rem" : "0px"
                            }}
                        >
                            <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                                {category.name}
                                <span className="text-sm font-bold">{category.icon}</span>
                            </h3>

                            <p className="text-xs text-gray-600 font-light leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>

            );
        }

        if (section.id === 'consulting') {
            return (
                <div className="relative w-full h-[450px] md:h-[400px] overflow-hidden">
                    <img
                        src="/featurebg.png"
                        alt="bg"
                        className="absolute w-full h-full object-fill"
                    />

                    <div className="relative z-10 p-2">
                        <h3 className="text-xl sm:text-2xl font-normal mb-10">Features</h3>
                        <ul className="space-y-4">
                            {section.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CornerDownRight className='text-[#5B5B5B]' />
                                    <span className="text-sm font-light text-[#5B5B5B]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className='w-full flex justify-end items-start md:items-center'>
                            <button className="mt-2 md:mt-14 px-4 md:px-10 py-2 border-2 border-gray-800 rounded-full cursor-pointer hover:bg-gray-800 hover:text-white transition-colors text-sm ">
                                Get Started
                            </button>
                        </div>

                    </div>
                </div>


            );
        }

        if (section.id === 'products') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-20 md:p-30 ">
                    {section.items.map((item, index) => (
                        <div key={index} className={`bg-white hover:bg-[#EB900C] hover:flex hover:flex-col-reverse cursor-pointer hover:text-white rounded-lg p-4  text-black group`}>
                            <img
                                src={item.image}
                                alt="bg"
                                className="h-28 w-[100%] mx-auto mb-2"
                            />
                            <div className='p-1'>

                                {/* <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.image}</div> */}
                                <div className='flex justify-between'>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-2">{item.name}</h3>
                                    <span className='stroke-1 bg-[#EB900C] group-hover:bg-white group-hover:text-[#EB900C] p-1 h-8 w-8 rounded-xs text-white'>{item.icon}</span>
                                </div>


                                <p className="text-xs font-light opacity-90">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            {/* Mobile Tabs */}
            <div className="lg:hidden bg-[#F6F6F9] px-3 py-3 sticky top-0 z-50 shadow-sm">
                <div className="mb-2">
                    <span className="inline-block px-3 py-1.5 bg-orange-50 text-orange-500 rounded-full text-xs font-medium">
                        Our Expertise
                    </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {expertiseData.sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${activeSection === index
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            onClick={() => setActiveSection(index)}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Sticky Container */}
            <div className="hidden lg:grid sticky-scroll-container px-40 grid-cols-2 justify-end gap-8" ref={parentContainerRef}>
                <div className="sticky-inner col-span-2 grid grid-cols-2">
                    {/* Left Sidebar */}
                    <div className="sidebar-sticky bg-[#F6F6F9] w-full">
                        <div className="mb-2">
                            <span className="inline-block px-4 py-2 text-orange-500 shadow-md bg-white rounded-full text-sm font-light">
                                Our Expertise
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col">
                            {/* Timeline container */}
                            <div className="flex-1 flex relative">
                                {/* Content sections on the left */}
                                <div className="flex-1 flex flex-col justify-evenly pr-8">
                                    {expertiseData.sections.map((section, index) => (
                                        <div key={section.id} className="relative py-4 text-left">
                                            <h3 className={`text-md font-medium mb-2 transition-colors ${activeSection === index ? 'text-gray-900' : 'text-gray-400'
                                                }`}>
                                                {section.title}
                                            </h3>
                                            <p className={`text-sm font-light transition-colors ${activeSection === index ? 'text-gray-600' : 'text-gray-300'
                                                }`}>
                                                {section.subtitle}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigator dots and line on the right */}
                                <div className="flex flex-col items-center justify-center ml-1">
                                    {/* Top dot */}
                                    <div className="w-4 h-4 rounded-full bg-orange-500 mb-2 flex-shrink-0" />

                                    {/* Vertical line with moving arrows */}
                                    <div className="relative h-[70%] w-0.5 bg-[#EB900C]">


                                        {/* Moving arrows indicator */}
                                        <div
                                            className="absolute left-0  transition-all duration-500"
                                            style={{
                                                top: `${activeSection * 50}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div className="flex flex-col gap-1 bg-[#F6F6F9] rounded-full p-1">
                                                {/* Up arrow - orange if not first section */}
                                                <ChevronRight
                                                    className={`w-6 h-6 -rotate-90 transition-colors rounded-full text-white  ${activeSection > 0 ? 'bg-[#EB900C]' : 'bg-black'
                                                        }`}
                                                />
                                                {/* Down arrow - orange if not last section */}
                                                <ChevronRight
                                                    className={`w-6 h-6 rotate-90 transition-colors rounded-full text-white ${activeSection < expertiseData.sections.length - 1 ? 'bg-[#EB900C]' : 'bg-black'
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom dot */}
                                    <div className="w-4 h-4 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Display based on active section */}
                    <div className="content-area w-full">
                        <div className="max-w-4xl  p-4">
                            {renderContent(expertiseData.sections[activeSection])}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Content */}
            <div className="lg:hidden p-4 bg-[#F6F6F9]">
                <div className="max-w-4xl mx-auto">
                    {renderContent(expertiseData.sections[activeSection])}
                </div>
            </div>

            <style jsx>{`
        .sticky-scroll-container {
          height: 350vh;
          background: #F6F6F9;
          position: relative;
        }

        .sticky-inner {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          overflow: hidden;
        }

        .sidebar-sticky {
          width: 320px;
          padding: 2rem;
          background: #F6F6F9;
          display: flex;
          flex-direction: column;
        }

        .content-area {
          flex: 1;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
}