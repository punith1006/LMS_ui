'use client'
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { slugData } from '@/app/common/constants';
import { axiosPublic } from '@/app/common/axiosPublic';
 
interface ModuleItem {
  moduleItemName: string;
  moduleItemId?: string;
  mode?: string;
}
 
interface Section {
  name: string;
  subtitle: string;
  description?: string;
  moduleItems?: ModuleItem[];
}
 
const fetchCourseDetails = async (slug: string): Promise<Section[]> => {
  try {
    console.log(slug);
    
    const response = await axiosPublic.get("/lms/course-details", {
      params: { slug },
    });
 
    const modules =
      response.data?.courses?.[0]?.CourseContent?.courseContent?.course
        ?.courseDetails?.content?.modules || [];
 
    if (!Array.isArray(modules)) {
      throw new Error("Modules data not found or invalid structure");
    }
 
    return modules.map((module: any) => ({
      name: module.name?.trim() || "Untitled Module",
      subtitle: module.name?.trim() || "Untitled Module",
      description: module.moduleDescription || "",
      moduleItems: module.moduleItems || module.details || [],
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch course details"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
 
const CourseAccordion = ({course}:{course:any}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (course.length>0) {
      console.log(course);

      const fetchData = async () => {
        try {
          setLoading(true);
          
          const data = await fetchCourseDetails(course[0].slug);
          console.log(data);
          
          setSections(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
   
      fetchData();
    }
 
  }, [course]);
 
  if (loading) {
    return (
      <div className="h-auto bg-gradient-to-b from-purple-900 to-black p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading course content...</div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="h-auto bg-gradient-to-b from-purple-900 to-black p-6 flex items-center justify-center">
        <div className="p-4 text-red-500 bg-red-100 rounded-md">
          Error loading course content: {error}
        </div>
      </div>
    );
  }
 
  return (
    <div className="h-auto bg-primary_color p-6">
      <div className="max-w-4xl mx-auto z-50">slug
        <h2 className="text-3xl font-bold text-white text-center mb-8 z-50">
        Modules covered in this course
                </h2>
 
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-purple-500/20 last:border-0"
              >
                <AccordionTrigger className="hover:no-underline group">
                  <div className="flex flex-col items-start">
                    <span className="text-base text-white ml-5 group-hover:text-purple-400 transition-colors">
                      Module {index + 1}: {section.name}
                    </span>
                  </div>
                </AccordionTrigger>
               
                <AccordionContent className="text-gray-200">
                  {section.description && (
                    <p className="mb-4 text-gray-300 text-start px-5 ">
                      {section.description}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {section.moduleItems?.map((item, itemIndex) => (
                      (item.moduleItemName || item.mode === "quiz") ? (
                        <li
                          key={item.moduleItemId || itemIndex}
                          className="flex items-center gap-3 text-gray-200 ml-5"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          <span>
                            {item.mode === "quiz" ? "Module Quiz" : item.moduleItemName}
                          </span>
                        </li>
                      ) : null
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
};
 
export default CourseAccordion;
 