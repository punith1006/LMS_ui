"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaRedhat } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { toast } from "react-toastify";
import axiosPublic from "../Constant/Api";
import { basepath } from "@/app/common/constants";

interface partnerimg {
  img: string;
 id:number;
}
interface CardProps {
  image: string;
  video?: string;
  icon: string;
  title: string;
  content: string;
  highlight: string;
  listofpartner:partnerimg[];
  onClick: () => void;
  onHover: () => void;
  active: boolean;
  index: number;
}

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};



const cardsData = [
  {
    image: `${basepath}/images/DT.png`,
    video: `${basepath}/video/bg3.mp4`,
    icon: `${basepath}/course_icon/college.png`,
    title: "Academic Hub",
    highlight: "Academic Hub",
    listofpartner:[],
    content:
      "The world is currently undergoing an extreme transformation due to rapid technological advancements and the emergence of new applications. Traditional education struggles to keep pace with these changes, resulting in a significant gap between theoretical knowledge and practical skills for graduates. Meta Cognitive technologies is here to bridge and address the learning skill gap that exists amongst academia and industry. We teach students, the practical tools rather than providing just theoretical knowledge in all areas especially Gen AI and other trending technologies. ",
  },
  {
    image: `${basepath}/images/bgcourse2.jpg`,
    video: `${basepath}/video/bg3.mp4`,
    icon: `${basepath}/course_icon/school.png`,
    title: "Education/Student Hub",
    highlight: "Education/Student Hub",
    listofpartner:[],
    content:
      "With our courses – AI for Middle school and iScience curriculum, we curate a principled approach based on current research in education around the globe. We design for outcomes that lead to personal development and high levels of engagement program, growth and real-world impact. We’re built to remain current. These are built on research and learning criteria that supports essential knowledge, future ready skills, and habits for success.",
  },
  {
    image: `${basepath}/images/Inf.png`,
    video: `${basepath}/video/bg3.mp4`,
    icon: `${basepath}/course_icon/work.png`,
    title: "Corporate Hub",
    highlight: "Corporate Hub",
    listofpartner:[],
    content:
      "The rapid pace of technological advancements, shifting market dynamics and changing customer preferences create a skill gap within the workforce that enterprises must bridge. AI is transforming the human-machine relationship. We enable and empower employees by cross-skilling, re-skilling and upskilling industry-ready professionals through technical and skill-based learning and certification programs ensuring they stay competitive and relevant. ",
  },
  {
    image: `${basepath}/images/cs.png`,
    video: `${basepath}/video/bg3.mp4`,
    icon: `${basepath}/course_icon/certificate.png`,
    title: "OEM Hub",
    highlight: "OEM Hub",
    listofpartner:[
      { img: `${basepath}/redhat.png`,id:2 },
      { img: `${basepath}/google_cloud.png`,id:3 },
      { img: `${basepath}/ibm.png`,id:5 },
      { img: `${basepath}/microsoft.png`,id:4 },

    ],
    content:
      "In today’s ever-evolving industry landscape, the demand for skilled and prepared talent is more pressing than ever. We are Authorized Training Partners of OEM alliances such as Google, Microsoft, IBM, RedHat, Tableau and many more. Working professionals taking up the relevant trainings and certifications eases them to get into client projects and adds value to their career. ",
  },
];

const Card = ({
  image,
  video,
  icon,
  title,
  highlight,
  listofpartner,
  content,
  onClick,
  onHover,
  active,
  index,
}: CardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router=useRouter();



  return (
    <div
      className={`relative flex flex-col md:flex-row items-center justify-center bg-cover bg-center rounded-2xl p-2 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden shadow-lg w-full ${
        active
          ? isMobile
            ? "h-[50%] w-[350px] justify-end gap-4 border-2 border-purple-500"
            : "md:w-[700px] h-[300px] justify-end gap-6 border-2 border-purple-500"
          : "w-[80px] md:w-[100px] sm:w-[400px] h-[100px] md:h-[300px] sm:h-[10px] gap-2 justify-start"
      }`}
      style={{ backgroundImage: active ? "none" : `url(${image})` }}
      onClick={onClick}
    >
      {active && video && (
        <div>
          <video
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-10"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-start justify-around w-full h-full p-4">
        {!active && (
          <div className="flex justify-center items-center mb-4">
            <div className="bg-white p-2 rounded-2xl">
              <img src={icon} alt="Icon" className="w-8 sm:w-10 h-8 sm:h-10" />
            </div>
          </div>
        )}

        {active && (
          <>
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-2xl">
                <img src={icon} alt="Icon" className="w-8 sm:w-10 h-8 sm:h-10" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
              <span  className="text-[#ACFCE8]">
                      {title}
                    </span>
              </h3>
            </div>
            <p className="text-white text-sm sm:text-base p-1 text-justify line-clamp-6">
              {content}
            </p>
            <div className="flex gap-10  items-center">

           
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2  bg-white rounded-full text-lg font-medium shadow hover:bg-emerald-500 hover:text-white transition-all"
              onClick={() => router.push(`/Courses?HUB=${index+1}`)}
              >
              Explore Now
            </button>
            {listofpartner?.length>0?

            listofpartner.map((img,index)=>(
              < div key={index} onClick={() =>router.push(`/Courses?filter=${img.id}`)} >
              {img.img==`${basepath}/redhat.png`?
              <FaRedhat style={{fill:"red",fontSize:"40px"}} className="hover:scale-125"/>:
              img.img==`${basepath}/microsoft.png`?
              <img src={img.img} className="h-8 hover:scale-125"/>:
              <img src={img.img} className="h-14 hover:scale-125"/>}

  </div>
            ))
           
:null}

            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Popular_courses = () => {
  const [activeCard, setActiveCard] = useState(0);
  const container = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
const [carddata,setcarddata]=useState([])
  useEffect(()=>{

    const fetchacademics=async()=>{
          try{

          const result = await axiosPublic.get("/lms/academics");
          setcarddata(result.data.academics)
                        toast.success(result.data.message)
    

        } catch (error: any) {
          console.log(error);
          
       
          toast.error(error.response.data.error);
    
      }
    }
    fetchacademics();
  },[])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: isMobile ? ["start start", "end end"] : ["start center", "end start"],
  });

  const scrollnum = useTransform(
    scrollYProgress,
    isMobile ? [0.1, 0.3, 0.5, 0.7] : [0.2, 0.4, 0.6, 0.8],
    [0, 1, 2, 3]
  );



  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };

  return (
    <div className={`w-full  relative`} ref={container}>
      <div className="flex flex-col w-full sticky top-20">
        <h1 className="text-white text-center text-3xl sm:text-4xl font-bold mb-8">
          POPULAR COURSES
        </h1>
        <div
          className={`flex ${isMobile ? "flex-col gap-8" : "flex-row gap-4"} justify-center px-4`}
        >
          {cardsData.map((card, index) => (
            <Card
              key={index}
              {...card}
              onClick={() => handleCardClick(index)}
              onHover={() => handleCardClick(index)}
              active={activeCard === index}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular_courses;
