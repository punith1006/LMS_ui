"use client";
import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { axiosPublic } from "@/app/common/axiosPublic";
import { slugData } from "@/app/common/constants";
import imageHelper from "@/app/common/image_helper";
 
const Tools = ({course}:{course:any}) => {
  const [tools, setTools] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(4).fill(false));
  const [isH2Visible, setIsH2Visible] = useState<boolean>(false);
  const [isPVisible, setIsPVisible] = useState<boolean>(false);
 
  const fetchTools = async (slug: string) => {
    try { 
      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });
      const coveredTools = response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.Covered_Tools || {};        
        setTools(coveredTools.tools || []);
        setDescription(coveredTools.description || "");


    } catch (error) {
      console.error("Error fetching course details.", error);
    }
  };
 
  useEffect(() => {
    if(course.length>0){
      const getData = async () => {
        await fetchTools(course[0].slug
        );
      };
      getData();
    }
    
  }, [course]);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            if (target.classList.contains("tool-card")) {
              const index = Number(target.getAttribute("data-index"));
              setIsVisible((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            } else if (target.id === "tools-section-h2") {
              setIsH2Visible(true);
            } else if (target.id === "tools-section-p") {
              setIsPVisible(true);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
 
    const elements = document.querySelectorAll(".tool-card, #tools-section-h2, #tools-section-p");
    elements.forEach((el) => observer.observe(el));
 
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
 
  return (
    <section id="tools-section" className="bg-black text-white py-12 px-4 md:px-8 lg:px-12">
          
      
      <div className="max-w-5xl mx-auto">
       {tools.length>0? <h2
          id="tools-section-h2"
          className={`text-3xl font-bold text-center mb-6 transition-all duration-500 ease-in-out ${
            isPVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Tools We Cover
        </h2>:null}
        <p
          id="tools-section-p"
          className={`text-justify text-gray-300 mb-12 transition-all duration-500 ease-in-out ${
            isPVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {description}
        </p>
 
        <Timeline position="alternate">
          {tools.map((tool: any, index: number) => (
            <TimelineItem key={index} className="tool-card" data-index={index}>
              <TimelineSeparator>
                <TimelineDot color={index % 2 === 0 ? "primary" : "secondary"} className="p-2 w-14">
                  <img src={imageHelper( tool.image)} alt={tool.toolName} className="w-12 h-12 object-contain" />
                </TimelineDot>
                {index < tools.length - 1 && <TimelineConnector className="h-8" />}
              </TimelineSeparator>
              <TimelineContent className="py-6">
                <Typography variant="h6" component="span">
                  {tool.toolName}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

    </section>
  );
};
 
export default Tools;
 
 