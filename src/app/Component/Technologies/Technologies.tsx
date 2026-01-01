"use client";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import WhyUs from "../Why-us/Why-us";
import { title } from "process";
import { useRouter } from 'next/navigation';
import { basepath } from "@/app/common/constants";


const Technologies = () => {
          const router = useRouter();
  
  const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  };
  const isMobile = useMediaQuery("(max-width: 1034px)");

  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const height = useTransform(scrollYProgress, [0.1, 0.3], ["0vh", "100vh"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.23], [0, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0.03, 0.2, 0.5],
    ["circle(1% at 50% 50%)", "circle(1% at 50% 50%)", "circle(80% at 50% 50%)"]
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(150);

  // Update radius based on screen size
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 640) {
        // sm
        setRadius(100);
      } else if (window.innerWidth <= 768) {
        // md
        setRadius(120);
      } else {
        setRadius(150);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const logos = [
    `${basepath}/Techimages/ai.png`,
    `${basepath}/Techimages/azure.png`,
    `${basepath}/Techimages/azureinfrastructure.png`,
    `${basepath}/Techimages/cloud-computing.png`,
    `${basepath}/Techimages/infrastructure.png`,
    `${basepath}/Techimages/management.png`,
    `${basepath}/Techimages/security.png`,
    `${basepath}/Techimages/server.png`,
  ];

  const data = [
    {
      title: "Cloud",
      avatarSrc: `${basepath}/user/ps1.jpeg`,
      description:
        "Cloud technology enables the delivery of computing services like storage, servers, databases, and software over the internet. It provides scalable, on-demand resources, reducing infrastructure costs and improving accessibility.",
      highlight: "bootcamp",
    },
    {
      title: "AI",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "AI enables machines to learn, reason, and automate tasks, enhancing efficiency and decision-making.",
      highlight: "cloud",
    },
    {
      title: "Microsoft Azure",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "Microsoft Azure is a cloud computing platform offering services for computing, storage, AI, and more.",
      highlight: "cloud",
    },
    {
      title: "iScience",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "iScience School, we are fortunate to be able to take a principled approach based on current research in education around the globe.",
      highlight: "desktop",
    },
    {
      title: "Cloud Computing",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "Cloud computing enables on-demand access to computing resources, storage, and services over the internet. It offers scalability, flexibility, and cost efficiency for businesses and individuals.",
      highlight: "bootcamp",
    },
    {
      title: "Infrastructure",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "Infrastructure technology provides scalable, secure, and high-performance computing, storage, and networking solutions for businesses to build and deploy applications efficiently.",
      highlight: "cloud",
    },
    {
      title: "Business Automation",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "Business Automation offers AI-powered solutions to streamline workflows, automate tasks, and enhance operational efficiency across enterprises.",
      highlight: "cloud",
    },
    {
      title: "Security",
      avatarSrc: "/user/ps1.jpeg",
      description:
        "Security provides advanced cybersecurity solutions, including threat detection, identity management, data protection, and AI-driven security analytics to help businesses safeguard their digital assets.",
      highlight: "desktop",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRotating(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRotating && !isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRotating, isPaused, logos.length]);



  const InfoCard = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div
      className="bg-gradient-to-bl  from-gray-800 to-black shadow-md shadow-gray-800  opacity-100 rounded-lg space-y-2 p-2 w-64 md:w-72 lg:w-80 mt-4 md:mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-xl md:text-4xl lg:text-2xl font-bold text-white ml-3">
        {title}
      </h2>
      <p className="text-sm md:text-2xl lg:text-base text-white opacity-80 m-3 line-clamp-3  text-justify">
        {description}
      </p>
      <div className="w-full flex justify-start">
        <button
          type="submit"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => {
            router.push(`/Courses?technology=${title}`); 
          }}
          className="flex justify-center gap-2 items-center font-semibold ml-2 shadow-xl text-sm md:text-lg bg-purple-400 backdrop-blur-md isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 pl-2 text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-1 py-0.5 overflow-hidden rounded-full group"
        >
          Read More
          <svg
            className="w-6 h-6 md:w-8 md:h-8 justify-end group-hover:rotate-90 bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:h-[300vh] z-40 relative" ref={container}>
      <div className="md:sticky md:top-0 lg:top-0 flex items-center justify-center min-h-screen bg-black overflow-hidden">
        {isMobile ? (
          <>
            <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden ">
              <div className="relative flex flex-col items-center mt-10">
                <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 bg-white rounded-full shadow-md flex items-center justify-self-center top-[70px] md:top-[100px] z-30">
                  <h1 className="text-xs md:text-base lg:text-xl font-semibold text-gray-800 m-2">
                    Technologies
                  </h1>
                </div>
                <div className="relative">
                  {logos.map((logo, idx) => {
                    const angle =
                      ((idx - currentIndex + logos.length) % logos.length) *
                      (360 / logos.length);
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                    const targetPosition = (currentIndex + 2) % logos.length;
                    const isTargetPosition = idx === targetPosition;

                    const bgColorClass = isTargetPosition
                      ? "bg-purple-400"
                      : "bg-white";

                    return (
                      <div
                        key={`logo-${idx}`}
                        className={`absolute -ml-6 w-12 h-12 md:w-16 md:h-16 ${bgColorClass} rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 transform hover:scale-110 transition-transform`}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        <img
                          src={logo}
                          alt={`Logo ${idx + 1}`}
                          className="w-8 h-8 md:w-12 md:h-12 object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-40 md:mt-60 flex  flex-col justify-center items-center gap-8 md:gap-32 lg:gap-72">
                  <div className="flex flex-col items-center gap-2 md:gap-4">
                    <img
                      src={`${basepath}/arrow/Down.png`}
                      alt="left arrow"
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                    />
                    <InfoCard
                      title={data[(currentIndex + 3) % data.length].title}
                      description={
                        data[(currentIndex + 3) % data.length].description
                      }
                    />
                  </div>
                  <div className="z-50 text-black font-bold text-xl w-full flex justify-center items-center">
                    <WhyUs />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute w-36 h-36 md:w-36 md:h-36 lg:w-36 lg:h-36 bg-white rounded-full shadow-md flex items-center justify-center z-30 ">
              <h1 className="text-xs md:text-base lg:text-xl font-semibold text-gray-800 ">
                Technologies
              </h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {logos.map((logo, idx) => {
                const angle =
                  ((idx - currentIndex + logos.length) % logos.length) *
                  (360 / logos.length);
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                const isEvenPosition =
                  ((idx - currentIndex + logos.length) % logos.length) % 2 ===
                  0;
                const bgColorClass = isEvenPosition
                  ? "bg-white"
                  : "bg-purple-400";

                return (
                  <div
                    key={`logo-${idx}`}
                    className={`absolute w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${bgColorClass} rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 transition-transform duration-1000 ease-in-out cursor-pointer hover:scale-110`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <img
                      src={logo}
                      alt={`Logo ${idx + 1}`}
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!isMobile && (
          <div className="absolute inset-0 flex flex-col justify-between py-4 md:py-6 lg:py-10">
            <div className="flex justify-center items-center gap-8 md:gap-32 lg:gap-72">
              <div className="flex items-center gap-2 md:gap-4">
                <InfoCard
                  title={data[(currentIndex + 6) % data.length].title}
                  description={
                    data[(currentIndex + 6) % data.length].description
                  }
                />
                <img
                  src={`${basepath}/arrow/Arrow_Left.png`}
                  alt="left arrow"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <img
                  src={`${basepath}/arrow/Arrow_Right.png`}
                  alt="right arrow"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
                <InfoCard
                  title={data[currentIndex].title}
                  description={data[currentIndex].description}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 md:gap-32 lg:gap-72">
              <div className="flex items-center gap-2 md:gap-4">
                <InfoCard
                  title={data[(currentIndex + 4) % data.length].title}
                  description={
                    data[(currentIndex + 4) % data.length].description
                  }
                />
                <img
                  src={`${basepath}/arrow/Arrow_D_Left.png`}
                  alt={`${basepath}down left arrow`}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <img
                  src={`${basepath}/arrow/Arrow_D_Right.png`}
                  alt="down right arrow"
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
                <InfoCard
                  title={data[(currentIndex + 2) % data.length].title}
                  description={
                    data[(currentIndex + 2) % data.length].description
                  }
                />
              </div>
            </div>
          </div>
        )}
        {!isMobile && (
          <motion.div
            className="z-40 text-black font-bold text-xl w-full bg-purple-300 flex justify-center items-center absolute"
            style={{ height: height, opacity, clipPath: clip }}
          >
            <WhyUs />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Technologies;
