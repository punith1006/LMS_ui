import { basepath } from "@/app/common/constants";
import React from "react";
import { Parallax } from "react-scroll-parallax";

const Mission: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-white space-y-6 p-4">
                     <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
          Vision
              </h2>
              <p className="text-md leading-relaxed text-justify">
              To be a global leader in AI technology that drive sustainable development and improves the human experience.               </p>
             
            </div>
            <br/>
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
             Mission
              </h2>
              <p className="text-md leading-relaxed text-justify">
              To create Innovative and Ethical AI solutions that can positively impact people lives and transform industries. </p>
              {/* <div className="space-y-4">
                {[
                  "Identify Career Prospects",
                  "Build Customised Career Plans",
                  "Improve Employability",
                  "Industry-Recognized Certifications",
                ].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">✔️</span>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
          <div className="relative h-[350px] sm:h-[300px] md:h-[650px] lg:h-[480px] overflow-hidden rounded-lg">
            <Parallax translateY={[-20, 20]} className="h-full">
              <div className="w-full h-full bg-gradient-to-br rounded-lg">
                <img
                  src={`${basepath}/images/robot.jpeg`}
                  alt="Mission"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
