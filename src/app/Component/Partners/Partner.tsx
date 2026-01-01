import { basepath } from "@/app/common/constants";
import React from "react";
import Marquee from "react-fast-marquee";
 
const Partner: React.FC = () => {
  const logos = [
    `${basepath}/logo/11.png`,
    `${basepath}/logo/12.png`,
    `${basepath}/logo/13.png`,
    `${basepath}/logo/12.png`,
    `${basepath}/logo/13.png`,
    `${basepath}/logo/12.png`,
    `${basepath}/logo/13.png`,
    `${basepath}/logo/14.png`,
  ];
 
  return (
    <div className="w-full mt-10  bg-black flex items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-row justify-center text-left space-y-6 p-4">
          <p className="text-white text-3xl md:text-4xl text-center">
          Valued Partners <br />
            <span className="text-purple-500">We've Collaborated With</span>
          </p>
        </div>
 
        <Marquee
          gradient={false}
          speed={50}
          loop={0}
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-4">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                height={100}
                width={150}
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
 
export default Partner;
 
 