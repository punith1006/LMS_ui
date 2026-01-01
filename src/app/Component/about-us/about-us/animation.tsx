"use client";
import { basepath } from "@/app/common/constants";
import { useEffect, useState } from "react";

const FixedImage: React.FC = () => {
  const [position, setPosition] = useState("");
  const [positionR, setPositionR] = useState("");
  const [positionL, setPositionL] = useState("");
  const [isCentered, setIsCentered] = useState(false);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [isMerged, setIsMerged] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100 && !isCentered) {
        setPosition("top-1 translate-y-[-380%]");
        setPositionR("translate-x-[20%]");
        setPositionL("translate-x-[-20%]");
        setIsCentered(true);
      } else if (scrollY <= 100 && isCentered) {
        setPosition("");
        setPositionR("");
        setPositionL("");
        setIsCentered(false);
      }

      const newScale = Math.min(1 + scrollY / 300, 1.5);
      const newOpacity = Math.max(1 - scrollY / 500, 0.2);
      setScale(newScale);
      setOpacity(newOpacity);
      setIsMerged(newScale >= 1.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCentered, isDesktop]);

  return (
    <div className="fixed w-full h-screen flex justify-center items-center bg-black overflow-hidden">
      <img
        src={`${basepath}/logo/mc1.png`}
        alt="Fixed Image"
        className={`absolute transition-transform ease-in-out duration-500 -mt-20 -ml-5 ${
          !isDesktop && "hidden"
        }`}
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
          width: "200px",
          height: "200px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white space-y-10 px-4">
        {isDesktop ? (
            <p className="text-sm md:text-xl duration-500 mt-6 max-w-3xl text-justify">
              At Metacognitive, we are dedicated to harnessing the power of AI
              to deliver transformative learning experiences for students and
              professionals alike. Our curriculum empowers learners to develop
              critical thinking, problem-solving, and self-regulation skills
              essential for success in today's dynamic world.
            </p>
        
        ) : (
          <div className="relative space-y-4 px-6">
            <div className="absolute inset-0 flex justify-center items-center opacity-40">
              <img
                src={`${basepath}/logo/mc1.png`}
                alt="Background Logo"
                className="h-52 w-52 object-contain"
              />
            </div>
            <h2 className="text-purple-600 text-xl font-bold relative z-10">
              Meta Cognitive
            </h2>
            <p className="text-base text-justify relative z-10">
              At Metacognitive, we are dedicated to harnessing the power of AI
              to deliver transformative learning experiences for students and
              professionals alike. Our curriculum empowers learners to develop
              critical thinking, problem-solving, and self-regulation skills
              essential for success in today's dynamic world.
            </p>
          </div>
        )}

        {isDesktop && (
          <h2
            className={`text-purple-600 text-2xl md:text-6xl font-bold transition-all ease-in-out duration-500 ${position}`}
          >
            Meta Cognitive
          </h2>
        )}
      </div>
    </div>
  );
};

export default FixedImage;
