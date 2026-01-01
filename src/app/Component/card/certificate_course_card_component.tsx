import hideDuration from "@/app/helper/hide_duration";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { basepath } from "@/app/common/constants";
// import CourseDetailContainer from "@/app/Component/";
import { axiosPublic } from "@/app/common/axiosPublic";
 
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  try {
    const id = context.params.courseId;
    const result = await axiosPublic.get("/lms/course-details", {
      params: {
        slug: id
      }
    })
 
 
    if (result.data.courses.length == 0) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
 
    return { props: { data: result.data.courses[0] } }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
 
export default function CertificateCourseCard({
  data,
  showPrice,
}: {
  data: any;
  showPrice: boolean;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  let [course, setCourse] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);
 
  const [coursedata,setcoursedata]=useState<any[]>([]);
 
 
  const fetchCourse = async () => {
    try {
      const result = await axiosPublic.get("/lms/course-details", {
        params: {
          slug: data.slug
        }
      })
      setCourse(result.data.courses);
 
      setCourseList(result.data.courses);
    } catch (error) {}
  };
  useEffect(()=>{
    console.log("datas");
   
 
    try {
      const result =  axiosPublic.get("/lms/course-details", {
        params: {
          slug: data.slug
        }
      })
      // setCourse(result.data.courses);
 
      // setCourseList(result.data.courses);
    } catch (error) {}
  },[])
  const handleClick = async () => {
   
    try {
      const result = await axiosPublic.get("/lms/course-details", {
        params: {
          slug: data.Course.slug
        }
 
      })
  setcoursedata(result.data.courses[0]);
  console.log('data',result.data.courses[0]);
 
        } catch (error) {
          console.error("Error fetching job roles:", error);
        }
    setIsPopupOpen(true);
  };
 
  const closePopup = () => {
    setIsPopupOpen(false);
  };
 
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer box-border border flex flex-col p-6 justify-start items-start border-yellow/50 hover:scale-105 hover:shadow-md hover:shadow-yellow/50 transform duration-300 border-1 bg-primary_color rounded-2xl"
    >
      <section className="flex-1 flex-col">
        <span className="text-black text-xl font-medium">{data.Course.title}</span>
        {hideDuration(data.partnerId, data.categoryId) ? (
          <></>
        ) : (
          <div className="flex flex-row gap-1 mt-2 items-center">
            <img
              alt="clock icon"
              className="text-text_grey_one h-4 w-4"
              src={`${basepath}/Icon_clock.svg`}
            />
            <p className="text-text_grey_one text-base font-normal">
              {Math.round(data.CourseDuration.courseDuration)}{" "}
              {data.CourseDuration.courseDurationType}
            </p>
          </div>
        )}
      </section>
 
      {/* Popup Modal */}
      {isPopupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col z-40"
          onClick={closePopup}
        >
          <div
            className=" p-1 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-4  w-full flex justify-end items-end">
              <img src={`${basepath}/popclose.png`} alt="close" style={{height:'40px'}} onClick={closePopup} className="pointer"/>
             
            </div>
          </div>
          <div
            className=" rounded-lg mx-5 overflow-auto items-center  custom-scrollbar1"
            onClick={(e) => e.stopPropagation()}
          >
           {/* <CourseDetailContainer data={coursedata} popup={true}/> */}
           
          </div>
         
        </div>
      )}
    </div>
  );
}
 
 