// 'use client'
// import { axiosPublic } from "@/app/common/axiosPublic";
// import { useState, useEffect } from "react";
// import PlayerComponent from "@/app/Component/player_components/player_component";
// import ModuleList from "@/app/Component/player_components/module_list_component";
// import { axiosPrivate } from "@/app/common/axiosPrivate";
// import useUserData from "@/app/hooks/userData";
// import { useRouter } from "next/router";
// import { ChevronRightIcon } from '@heroicons/react/24/outline'
// import CircleProgressBar from "@/app/circleProgress/page";
// import ErrorBoundary from "@/app/helper/error_boundary";
// import { basepath } from "@/app/common/constants";


// export async function getServerSideProps(context: any) {

//   // Fetch data from external API
//   try {
//     const id = context.params.courseId;

//     const result = await axiosPublic.get("/lms/course-details", {
//       params: {
//         courseId: id
//       }
//     })


//     if (result.data.courses.length == 0) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       }
//     }

//     return { props: {data:result.data.courses[0], title: result.data.courses[0]?.title, modules: result.data.courses[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? [], id: id } }
//   } catch (error) {

//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
// }
// export default function Player({data, modules, id, title }: {data:any, modules: any, id: any, title: any }) {
//   const basePath  = basepath;
//   const router = useRouter();
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [moduleId, setModuleId] = useState(null);
//   const { userData, } = useUserData();
//   const [notes, setNotes] = useState('');
//   // useEffect(() => {
//   //   // If the initial selectedItem is null, set it to the first item of the first module
//   //   if (!selectedItem && modules.length > 0 && (modules[0].moduleitems??[]).length > 0) {
//   //     setSelectedItem(modules[0].moduleitems[0]);
//   //   }
//   // }, [selectedItem, modules]);

//   const fetchUserProgress = async () => {
//     try {
//       const response = await axiosPrivate.get("/user/user-course-progress", {
//         params: {
//           courseId: id,
//           "userId": userData.userId

//         }
//       });

//       const userCourseProgress = (response?.data?.userCourseProgresses ?? []);

//       if (userCourseProgress.length == 0) {

//         setModuleId(modules[0]?.moduleId);
//         setSelectedItem(modules[0]?.moduleItems ? modules[0]?.moduleItems[0] : modules[0]?.details[0]);
//       } else {
//         setNotes(userCourseProgress[0].notes);
//         const currentModule = modules.find((e: any) => e.moduleId == userCourseProgress[0].moduleId);
//         const moduleIndex = modules.findIndex((e: any) => e.moduleId == userCourseProgress[0].moduleId);

//         if (moduleIndex < 0) {
//           return;
//         }

//         const moduleItemIndex = currentModule.moduleItems ? currentModule.moduleItems.findIndex((e: any) => e.moduleItemId == userCourseProgress[0].moduleItemId) : currentModule.details.findIndex((e: any) => e.id == userCourseProgress[0].moduleItemId);

//         if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
//           setModuleId(userCourseProgress[0].moduleId);
//           setSelectedItem(currentModule.moduleItems ? currentModule.moduleItems[moduleItemIndex + 1] : currentModule.details[moduleItemIndex + 1])
//         } else {
//           setModuleId(modules[moduleIndex + 1].moduleId);
//           setSelectedItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
//         }

//       }


//     } catch (error) {

//     }
//   }

//   useEffect(() => {
//     fetchUserProgress();


//   }, [userData]);





//   return (
//     <ErrorBoundary>
//     <main
//       className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
//     >
//       <div className="w-full flex items-center justify-between md:justify-start py-2">
//         <div className="flex flex-shrink-0 items-center">
//           <img
//             onClick={(e) => {
//               router.push("/")
//             }}
//             className="h-14 md:h-20 w-auto cursor-pointer"
//             src={`${basePath}/logo.png`}
//             alt="GK cloud solutions"
//           />

//         </div>
//         <div className="hidden ml-4 flex-1 md:flex flex-row gap-1 items-center">
//           <p className="hover:text-blue cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
//             router.back();
//             router.back();
//           }}>Dashboard</p>
//           <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
//           <p className="hover:text-blue cursor-pointer text-[#A1A1A1] text-base font-normal" onClick={(e) => {
//             router.back();
//           }}>{title}</p>
//           <ChevronRightIcon className="text-[#A1A1A1] h-4 w-4" />
//           <p className="hover:text-blue cursor-pointer text-text_grey_one text-base font-normal">{selectedItem != null ? selectedItem?.mode ? "Quiz" : selectedItem?.moduleItemName : ""}</p>
//         </div>

//         <div className="flex flex-shrink-0 gap-2 items-center">
//           <CircleProgressBar percentage={((moduleId ?? 0) * 100) / (modules.length)} />
//           <p className="cursor-pointer text-text_grey_one text-base font-normal">Your Progress</p>
//         </div>


//       </div>

//       <div className="w-full flex h-full">
//         <div className="h-auto flex-1  md:w-full">
//         <PlayerComponent notes={notes} setNotes={setNotes} data={data} setMouduleId={setModuleId} onSelectItem={setSelectedItem} modules={modules} item={selectedItem} moduleId={moduleId} />
//         </div>
//         <div className="hidden md:flex w-[30%] h-[70vh]">
//           {selectedItem && <ModuleList modules={modules} setMouduleId={setModuleId} onSelectItem={setSelectedItem} currentItem={selectedItem} moduleId={moduleId} />}
//         </div>
//       </div>
//       <section></section>
//     </main>
//      </ErrorBoundary>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { axiosPublic } from "@/app/common/axiosPublic";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import useUserData from "@/app/hooks/userData";
import { useRouter, useParams } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import CircleProgressBar from "@/app/Components/CircleProgressBar";
import ErrorBoundary from "@/app/helper/error_boundary";
import { basepath } from "@/app/common/constants";
import PlayerComponent from "@/app/Component/player_components/player_component";
import ModuleList from "@/app/Component/player_components/module_list_component";

export default function Player() {
  const params = useParams();
  const id = params?.courseId || ""; // Ensure params is properly accessed
  const router = useRouter();
  const { userData } = useUserData();
  const [coursestatus, setcoursestatus] = useState(false);
  const [readonlyMode, setReadonlyMode] = useState(false);
  const [data, setData] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Fetch Course Data
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const result = await axiosPublic.get("/lms/course-details", {
          params: { courseId: id },
        });

        if (!result.data.courses || result.data.courses.length === 0) {
          router.push("/");
          return;
        }

        const courseData = result.data.courses[0];
        setData(courseData);
        setModules(courseData?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules ?? []);
      } catch (error) {
        console.error("Error fetching course data:", error);
        router.push("/");
      }
    };

    if (id) fetchCourseData();
  }, [id, router]);

  // Fetch User Progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axiosPrivate.get("/user/user-course-progress", {
          params: {
            courseId: id,
            userId: userData.userId,
          },
        });

        const userCourseProgress = response?.data?.userCourseProgresses ?? [];

        if (userCourseProgress.length === 0) {
          if (modules.length > 0) {
            setModuleId(modules[0]?.moduleId);
            setSelectedItem(modules[0]?.moduleItems?.[0] || modules[0]?.details?.[0]);


          }
        } else {
          setNotes(userCourseProgress[0].notes);
          const currentModule = modules.find((e) => e.moduleId === userCourseProgress[0].moduleId);
          const moduleIndex = modules.findIndex((e) => e.moduleId === userCourseProgress[0].moduleId);
          //setcoursestatus(userCourseProgress[0].courseStatus=="Completed"?true:false)
          setcoursestatus(userCourseProgress.length > 0 && userCourseProgress[0].courseStatus == "Completed" ? true : false)
          // const isCompleted = userCourseProgress[0].courseStatus === "Completed";
          // const isCompleted = userCourseProgress.length>0&&userCourseProgress[0].courseStatus=="Completed"?true:false
          // setcoursestatus(isCompleted);
          //setReadonlyMode(isCompleted);

          if (moduleIndex < 0) return;

          const moduleItemIndex = currentModule.moduleItems
            ? currentModule.moduleItems.findIndex((e: any) => e.moduleItemId === userCourseProgress[0].moduleItemId)
            : currentModule.details.findIndex((e: any) => e.id === userCourseProgress[0].moduleItemId);

          if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {
            setModuleId(userCourseProgress[0].moduleId);
            setSelectedItem(
              currentModule.moduleItems
                ? currentModule.moduleItems[moduleItemIndex + 1]
                : currentModule.details[moduleItemIndex + 1]
            );
          } else if (modules[moduleIndex + 1]) {
            setModuleId(modules[moduleIndex + 1]?.moduleId);
            setSelectedItem(modules[moduleIndex + 1]?.moduleItems?.[0] || modules[moduleIndex + 1]?.details?.[0]);
          } else {
            if (modules.length > 0) {
              setModuleId(modules[0]?.moduleId);
              setSelectedItem(modules[0]?.moduleItems?.[0] || modules[0]?.details?.[0]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    if (modules.length > 0) {
      fetchUserProgress();
    }
  }, [modules, userData, id]);

  if (!data) return <p>Loading...</p>;

  return (
    <ErrorBoundary>
      <main className="relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col pt-5 bg-black min-h-screen">
        {/* Header Section */}
        <div className="w-full flex items-center justify-between md:justify-start py-4 border-b border-gray-800 mb-6">
          <div className="flex flex-shrink-0 items-center">
            <img
              onClick={() => router.push("/")}
              className="h-10 w-auto cursor-pointer"
              src={`/gkt.png`}
              alt="Global Knowledge"
            />
          </div>
          {/* Breadcrumbs */}
          <div className="hidden ml-8 flex-1 md:flex flex-row gap-2 items-center">
            <p className="hover:text-[#EB900C] cursor-pointer text-gray-400 text-sm font-medium transition-colors" onClick={() => router.push("/profile/my-learning")}>
              Dashboard
            </p>
            <ChevronRightIcon className="text-gray-600 h-3 w-3" />
            <p className="hover:text-[#EB900C] cursor-pointer text-gray-400 text-sm font-medium transition-colors" onClick={() => router.push("/profile/my-learning")}>
              {data.title}
            </p>
            <ChevronRightIcon className="text-gray-600 h-3 w-3" />
            <p className="text-white text-sm font-medium">
              {selectedItem ? (selectedItem?.mode ? "Quiz" : selectedItem?.moduleItemName) : ""}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="flex flex-shrink-0 gap-3 items-center">
            <div className="">
              <CircleProgressBar percentage={(moduleId ? (modules.findIndex((m) => m.moduleId === moduleId) + 1) * 100 : 0) / modules.length} />
            </div>
            <p className="cursor-pointer text-gray-300 text-sm font-medium">Your Progress</p>
          </div>
        </div>
        {/* Content Section */}
        <div className="w-full flex h-full">
          <div className="h-auto flex-1 md:w-full">
            <PlayerComponent
              notes={notes}
              setNotes={setNotes}
              data={data}
              setMouduleId={setModuleId}
              onSelectItem={setSelectedItem}
              modules={modules}
              item={selectedItem}
              moduleId={moduleId}
            //readonlyMode={readonlyMode}

            />
          </div>
          {/* Sidebar with Modules List */}
          <div className="hidden md:flex w-[30%] h-[70vh] pr-2 scrollbar-thin">
            {selectedItem && (
              <ModuleList
                modules={modules}
                setMouduleId={setModuleId}
                onSelectItem={setSelectedItem}
                currentItem={selectedItem}
                moduleId={moduleId}
                courseImage={data?.courseImage}
                isCompleted={coursestatus}
              //readonlyMode={readonlyMode}
              />
            )}
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
