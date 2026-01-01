"use client";
import { axiosPublic } from "@/app/common/axiosPublic";
import React, { useEffect, useRef, useState } from "react";
import { FaCertificate, FaBookOpen, FaGraduationCap, FaAtom } from "react-icons/fa";
 
interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}
 
const Card: React.FC<CardProps> = ({ title, description, icon, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
      }
    );
 
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
 
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
 
  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ease-in-out transform cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      <div key={index} className="bg-black border-2 border-white border-opacity-35 hover:border-purple-400 hover:border-opacity-35 text-white p-8 rounded-xl h-full flex flex-col justify-start items-start text-left my-2 hover:scale-105 hover:shadow-xl  hover:bg-opacity-10 overflow-hidden">
        <div className="flex gap-5 items-center justify-start">
        <div className="text-purple-500 text-4xl mb-6 hover:text-white">{icon}</div>
        <h3 className="text-base font-semibold mb-4 ">{title}</h3>
        </div>
       
        <p className="text-gray-300 text-sm leading-relaxed text-justify ">{description}</p>
      </div>
    </div>
  );
};
 
 
const CardSection = ({ course }: { course: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [program, setProgram] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconMapping: Record<string, React.ReactNode> = {
    "oem certification": <FaCertificate />,
    "hands on learning": <FaBookOpen />,
    "immersive learning experience": <FaGraduationCap />,
    "stu generative ai tool": <FaAtom />,
  };
  
  const getIcon = (title: string): React.ReactNode => {
    for (const key in iconMapping) {
      if (title.toLowerCase().match(new RegExp(`^${key}$`, "i"))) {
        return iconMapping[key];
      }
    }
    return null; 
  };
  
  const fetchEligibility = async (slug: string) => {
    if (!slug) {
      setError("No slug provided");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });

      const Program =
        response.data?.courses?.[0]?.CourseContent?.courseContent?.course
          ?.Why_join_this_program || [];
      setProgram(Program);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError("Failed to load eligibility criteria");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (course.length > 0) {
      fetchEligibility(course[0].slug);
    }
  }, [course]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-transparent">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-transparent">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!program.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-black m-0 p-0 w-[1000px] justify-center items-center">
        <section
          className={`transition-all duration-1000 ease-in-out`}
        >
          <h2 className="text-3xl text-white font-bold mb-8 text-center">
            Why Join This Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-0">
            {program.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                icon={getIcon(card.title) ||  <FaCertificate /> }
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardSection;

 