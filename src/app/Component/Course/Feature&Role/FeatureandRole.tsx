import React, { useState, useEffect, useRef } from "react";
import { axiosPublic } from "@/app/common/axiosPublic";
import { slugData } from "@/app/common/constants";
import imageHelper from "@/app/common/image_helper";
 
interface Feature {
  image: string;
  keyName: string;
}
 
interface KeyFeaturesData {
  description: string;
  features: Feature[];
}
 
const KeyFeatures = ({course}:{course:any}) => {
  const [visible, setVisible] = useState<boolean[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [feature, setFeature] = useState<KeyFeaturesData | null>(null);
 
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
      if (entry.isIntersecting) {
        setVisible((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }
    });
  };
 
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);
 
  const fetchTools = async (slug: string) => {
    try {
      const response = await axiosPublic.get("/lms/course-details", {
        params: { slug },
      });
      const keyFeaturesImpact = response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.Key_Features_Impact;
      setFeature(keyFeaturesImpact || { description: "", features: [] });
    } catch (error) {
      console.error("Error fetching course details.", error);
    }
  };
 
  useEffect(() => {
     
             if(course.length>0){
              fetchTools(course[0].slug);

                
                    }
  }, [course]);
 
  if (!feature?.features?.length) {
console.log(feature);
    
    return null;
  }
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 bg-black bg-opacity-30 rounded-2xl border-2 border-purple-400 border-opacity-35">
        <div className="space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-blue-400 hover:text-white transition-all duration-700 ease-in-out">
            Key Features & Impact
          </h1>
          <p className="text-base sm:text-lg text-justify text-white">
            {feature?.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {feature?.features.map((featureItem, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg bg-gray-800 bg-opacity-50 transform transition-all duration-700 ease-in-out`}
              >
                <img
                  src={imageHelper(featureItem.image)}
                  alt={featureItem.keyName}
                  className="w-12 h-12"
                />
                <p className="text-gray-300 font-semibold text-sm sm:text-base">
                  {featureItem.keyName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
 
};
 
export default KeyFeatures;
 
 