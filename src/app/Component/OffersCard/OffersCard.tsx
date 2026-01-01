import React, { memo, useEffect, useState } from "react";
import { CourseData, fetchCourses } from "@/app/utils/api";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  courses: CourseData[];
}

const OffersCard: React.FC<CourseCardProps> = memo(({ courses }) => {
const [Allcourses,setallcourses]=useState<CourseData[]>([]);
  useEffect(()=>{
    const getCourses = async () => {

    const fetchedCourses = await fetchCourses();
    const course=fetchedCourses;
    setallcourses(course)

  }
    getCourses();
  },[])

  
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<number | null>(null);
const Academicshub = Allcourses
    .filter((course) => course.Academic?.academicsId === 1)
    .slice(0, 4);
  const Educationhub = Allcourses
    .filter((course) => course.Academic?.academicsId === 2)
    .slice(0, 4);
    const Corporatehub = Allcourses
    .filter((course) => course.Academic?.academicsId === 3)
    .slice(0, 4);
    const OEMhub = Allcourses
    .filter((course) => course.Academic?.academicsId === 4)
    .slice(0, 4);

  return (
    <div className="overflow-x-hidden">
       <h1 className="text-2xl text-green-400 mx-2 mt-5 ">
       Academics Hub
        </h1>
      <div className="flex flex-wrap gap-6 h-auto pt-2 m-2  md:flex-row md:justify-start flex-col lg:flex-row items-center justify-center  lg:justify-start">
        {Academicshub.map((course, index) => (
          <div
            key={course.courseId}
            className="relative border-[0.3px] w-56 h-36 rounded-lg bg-[rgba(105,13,197,0.23)] flex flex-col overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => router.push(`/Courses/${course.slug}`)}
          >
            <div
              className={`circle-animation ${
                isHovered === index ? "" : "reversed"
              }`}
            ></div>

            <div className="p-4 flex flex-col text-white text-base ">
              <div className="flex justify-between items-center mb-2 h-10">
                {course.Partner && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.Partner.partnerName}
                  </span>
                )}
                {course.CourseCategory && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              <h3 className="text-sm leading-tight">{course.title}</h3>
            </div>
          </div>
        ))}

        <div className="flex justify-center col-span-4 items-center">
        
          <button
  className="bg-white text-center w-40 rounded-2xl h-10 relative text-black text-xl font-semibold group"
  type="button"
  onClick={() => {
    sessionStorage.setItem("Partner", "Artificial Intelligence");
    router.push(`/Courses?HUB=${Academicshub[0].Academic?.academicsId}`);
  }}
>

  <div
    className="bg-purple-400  rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="25px"
      width="25px"
      className="rotate-180 "
    >
      <path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        fill="#000000"
      ></path>
      <path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        fill="#000000"
      ></path>
    </svg>
  </div>
  <p className="translate-x-2">Explore</p>
</button>
        </div>
      </div>
        <h1 className="text-2xl text-green-400  mx-2 mt-5">
            Education Hub
        </h1>
      <div className="flex flex-wrap gap-6 h-auto flex-col  md:flex-row md:justify-start lg:flex-row items-center pt-2 m-2 justify-center  lg:justify-start">
        {Educationhub.map((course, index) => (
          <div
            key={course.courseId}
            className="relative border-[0.3px] w-56 h-36 rounded-lg bg-[rgba(105,13,197,0.23)] flex flex-col overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => router.push(`/Courses/${course.slug}`)}
          >
            <div
              className={`circle-animation ${
                isHovered === index ? "" : "reversed"
              }`}
            ></div>

            <div className="p-4 flex flex-col text-white text-base ">
              <div className="flex justify-between items-center mb-2 h-10">
                {course.Partner && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.Partner.partnerName}
                  </span>
                )}
                {course.CourseCategory && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              <h3 className="text-sm leading-tight">{course.title}</h3>
            </div>
          </div>
        ))}

        <div className="flex justify-center col-span-4 items-center">
        
          <button
  className="bg-white text-center w-40 rounded-2xl h-10 relative text-black text-xl font-semibold group"
  type="button"
  onClick={() => {
    sessionStorage.setItem("Partner", "Artificial Intelligence");
    router.push(`/Courses?HUB=${Educationhub[0].Academic?.academicsId}`);
  }}
>

  <div
    className="bg-purple-400  rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="25px"
      width="25px"
      className="rotate-180 "
    >
      <path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        fill="#000000"
      ></path>
      <path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        fill="#000000"
      ></path>
    </svg>
  </div>
  <p className="translate-x-2">Explore</p>
</button>
        </div>
      </div>
      <h1 className="text-2xl text-green-400  mx-2 mt-5">
            Corporate Hub
        </h1>
      <div className="flex flex-wrap gap-6 h-auto pt-2 m-2 flex-col  md:flex-row md:justify-start lg:flex-row items-center justify-center lg:justify-start">
        {Corporatehub.map((course, index) => (
          <div
            key={course.courseId}
            className="relative border-[0.3px] w-56 h-36 rounded-lg bg-[rgba(105,13,197,0.23)] flex flex-col overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => router.push(`/Courses/${course.slug}`)}
          >
            <div
              className={`circle-animation ${
                isHovered === index ? "" : "reversed"
              }`}
            ></div>

            <div className="p-4 flex flex-col text-white text-base ">
              <div className="flex justify-between items-center mb-2 h-10">
                {course.Partner && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.Partner.partnerName}
                  </span>
                )}
                {course.CourseCategory && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              <h3 className="text-sm leading-tight">{course.title}</h3>
            </div>
          </div>
        ))}

        <div className=" relative flex justify-center  items-center">
        
          <button
  className="bg-white text-center w-40 rounded-2xl h-10 relative text-black text-xl font-semibold group"
  type="button"
  onClick={() => {
    sessionStorage.setItem("Partner", "Artificial Intelligence");
    router.push(`/Courses?HUB=${Corporatehub[0].Academic?.academicsId}`);
  }}
>

  <div
    className="bg-purple-400  rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="25px"
      width="25px"
      className="rotate-180 "
    >
      <path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        fill="#000000"
      ></path>
      <path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        fill="#000000"
      ></path>
    </svg>
  </div>
  <p className="translate-x-2">Explore</p>
</button>
        </div>
      </div>
      <h1 className="text-2xl text-green-400  mx-2 mt-5">
            OEM Hub
        </h1>
      <div className="flex flex-wrap flex-col md:flex-row md:justify-start lg:flex-row items-center gap-6 h-auto pt-2 m-2 justify-center  lg:justify-start">
        {OEMhub.map((course, index) => (
          <div
            key={course.courseId}
            className="relative  border-[0.3px] w-56 h-36 rounded-lg bg-[rgba(105,13,197,0.23)] flex flex-col overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => router.push(`/Courses/${course.slug}`)}
          >
            <div
              className={`circle-animation ${
                isHovered === index ? "" : "reversed"
              }`}
            ></div>

            <div className="p-4 flex flex-col text-white text-base ">
              <div className="flex justify-between items-center mb-2 h-10">
                {course.Partner && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.Partner.partnerName}
                  </span>
                )}
                {course.CourseCategory && (
                  <span className="text-[0.6rem] font-normal text-[rgba(240,248,255,0.691)]">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              <h3 className="text-sm leading-tight line-clamp-3">{course.title}</h3>
            </div>
          </div>
        ))}

        <div className="flex justify-center col-span-4 items-center">
        
          <button
  className="bg-white text-center w-40 rounded-2xl h-10 relative text-black text-xl font-semibold group"
  type="button"
  onClick={() => {
    sessionStorage.setItem("Partner", "Artificial Intelligence");
    router.push(`/Courses?HUB=${OEMhub[0].Academic?.academicsId}`);
  }}
>

  <div
    className="bg-purple-400  rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="25px"
      width="25px"
      className="rotate-180 "
    >
      <path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        fill="#000000"
      ></path>
      <path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        fill="#000000"
      ></path>
    </svg>
  </div>
  <p className="translate-x-2">Explore</p>
</button>
        </div>
      </div>
    </div>
  );
});

OffersCard.displayName = "OffersCard";
export default OffersCard;
