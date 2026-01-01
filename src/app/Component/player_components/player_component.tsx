// components/Player.js
'use client'
import React, { useState, useEffect } from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'
import { axiosPrivate } from '@/app/common/axiosPrivate';
import { useParams, useRouter } from 'next/navigation'
import useUserData from '@/app/hooks/userData';
import classNames from '@/app/helper/add_class';
import ErrorBoundary from '@/app/helper/error_boundary';
import ModuleList from './module_list_component';
import ChatBot from './ChatBot';



const PlayerComponent = ({ notes, setNotes, data, modules, item, moduleId, setMouduleId, onSelectItem }: { notes: any, setNotes: any, data: any, modules: any, item: any, moduleId: any, setMouduleId: any, onSelectItem: any }) => {
    const params = useParams();
    const router = useRouter()
    const [isLoading, setLoading] = useState(true);


    const { userData, } = useUserData();
    const updateCourseItem = async (moduleId: any, itemId: any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    // "courseId": parseInt(params.courseId[0]),
                    courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                // "courseId": parseInt(params.courseId[0]),
                courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                "progressDate": new Date(),
                "moduleId": moduleId,
                "moduleItemId": itemId,

            }
            if (userCourseProgress.length != 0) {
                payload.userCourseProgressId = userCourseProgress[0].userCourseProgressId

            }


            //[]
            await axiosPrivate.post("/user/upsert-user-course-progress", payload);


        } catch (error) {

        }
    }

    const updateCourseStatus = async (moduleId: any, itemId: any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    // "courseId": parseInt(params.courseId[0]),
                    courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                //  "courseId": parseInt(params.courseId[0]),
                "courseId": params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                "progressDate": new Date(),
                "courseStatus": "Completed",
                "notes": notes,
            }
            if (userCourseProgress.length != 0) {
                payload.userCourseProgressId = userCourseProgress[0].userCourseProgressId

            }

            await axiosPrivate.post("/user/upsert-user-course-progress", payload);


        } catch (error) {

        }
    }
    const updateNotes = async (moduleId: any, itemId: any, note: any) => {
        try {
            const response = await axiosPrivate.get("/user/user-course-progress", {
                params: {
                    "userId": userData.userId,
                    // "courseId": parseInt(params.courseId[0]),
                    courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                }
            });

            const userCourseProgress = (response?.data?.userCourseProgresses ?? []);
            let payload: any = {
                "userId": userData.userId,
                // "courseId": parseInt(params.courseId[0]),
                courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,

                "notes": note,
            }
            if (userCourseProgress.length != 0) {
                payload.userCourseProgressId = userCourseProgress[0].userCourseProgressId

            }

            //[]
            await axiosPrivate.post("/user/upsert-user-course-progress", payload);


        } catch (error) {

        }
    }
    const updateQuiz = async (moduleId: any, itemId: any, answer: any) => {
        try {

            const response = await axiosPrivate.post("/user/upsert-course-quiz", {
                "quizId": itemId,
                // "courseId": parseInt(params.courseId[0]),
                courseId: params?.courseId?.[0] ? parseInt(params.courseId[0]) : null,
                "moduleId": moduleId,
                "moduleItemId": itemId,
                "moduleItemDetailId": itemId,
                // "quizName": "AI Cloud Quiz",
                "isActive": true,
                "isEnabled": true,
                // "quizURL": "http://gkcloud.ai/quiz/ai/9898",
                "attendedDate": new Date(),
                // "remarks": "Sundar",
                "quizResponse": { "quiz": JSON.stringify(answer) }

            });


        } catch (error) {

        }
    }
    const [index, setIndex] = useState(0);
    const [showLab, setShowLab] = useState(false);

    useEffect(() => {
        setShowLab(false);
        // If it's a video item but has no URL, stop loading immediately (Lab View)
        if (item?.moduleItemDetails?.[0]?.mode === "video" && !item?.moduleItemDetails?.[0]?.url) {
            setLoading(false);
        } else if (item?.moduleItemDetails?.[0]?.url) {
            setLoading(true);
        }
    }, [item]);

    const handleNextModule = async () => {
        // if (readonlyMode) return;
        setLoading(true);
        await updateCourseItem(moduleId, item.moduleItemId);
        const currentModule = modules.find((e: any) => e.moduleId == moduleId);
        const moduleIndex = modules.findIndex((e: any) => e.moduleId == moduleId);
        if (moduleIndex < 0) {
            setLoading(false);
            return;
        }
        const moduleItemIndex = (currentModule.moduleItems ?? currentModule.details).findIndex((e: any) => e.moduleItemId == item.moduleItemId);

        if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {

            setMouduleId(moduleId);
            onSelectItem((currentModule.moduleItems ?? currentModule.details)[moduleItemIndex + 1])
        } else {
            const checkIndex = modules.findIndex((e: any) => e.moduleId == (moduleId + 1));
            if (checkIndex < 0) {
                await updateCourseStatus(moduleId, item.moduleItemId);
                router.refresh();
                setLoading(false);
                return;
            }

            setMouduleId(modules[moduleIndex + 1].moduleId);
            onSelectItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
        }
        setLoading(false);
    };

    return (<div className='w-full h-screen md:h-auto'>
        <ChatBot courseData={data} />
        <ErrorBoundary>
            <section className='w-full h-[30vh] md:h-[70vh]'>{
                item == null ? <></> : item.moduleItemDetails && item.moduleItemDetails.length != 0 && item.moduleItemDetails[0].mode == "video" ?
                    <div className="h-full w-full bg-dark_blue relative">
                        {
                            isLoading && <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="w-16 h-16 border-4 border-t-transparent border-blue rounded-full animate-spin"></div>
                            </div>
                        }

                        {item.moduleItemDetails[0].url ? (
                            <ReactPlayer style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0
                            }}

                                onStart={() => {

                                }}
                                onReady={() => {
                                    setLoading(false);

                                }}
                                onEnded={handleNextModule}
                                url={item.moduleItemDetails[0].url} width="100%" height="100%" controls
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white relative">
                                {!showLab ? (
                                    <button
                                        onClick={() => {
                                            window.open("https://aws.amazon.com/console/", "_blank");
                                            setShowLab(true);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        Start Sim Lab
                                    </button>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                                        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-xl max-w-md">
                                            <h3 className="text-xl font-bold mb-4">Lab Started</h3>
                                            <p className="text-gray-300 mb-6">The AWS Console has opened in a new tab. Please complete your lab tasks there.</p>
                                            <p className="text-sm text-gray-400">Once finished, click below to proceed.</p>
                                        </div>
                                        <button
                                            onClick={handleNextModule}
                                            className="absolute bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg z-50 transition-colors"
                                        >
                                            Next Module →
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div> : !item?.moduleItemDetails && item.mode == "quiz" ? <div className="h-full w-full relative bg-normal_white">
                        <Quiz questions={item.quiz} submit={async (answer: any) => {
                            // if (readonlyMode) return;
                            await updateCourseItem(moduleId, item.id);
                            await updateQuiz(moduleId, item.id, answer);

                            const currentModule = modules.find((e: any) => e.moduleId == moduleId);
                            const moduleIndex = modules.findIndex((e: any) => e.moduleId == moduleId);
                            if (moduleIndex < 0) {
                                return;
                            }
                            const moduleItemIndex = (currentModule.moduleItems ?? currentModule.details).findIndex((e: any) => e.moduleItemId == item.moduleItemId);

                            if (moduleItemIndex < ((currentModule.moduleItems ?? currentModule.details).length - 1)) {

                                setMouduleId(moduleId);
                                onSelectItem((currentModule.moduleItems ?? currentModule.details)[moduleItemIndex + 1])
                            } else {
                                const checkIndex = modules.findIndex((e: any) => e.moduleId == (moduleId + 1));
                                if (checkIndex < 0) {
                                    await updateCourseStatus(moduleId, item.moduleItemId);
                                    router.refresh();
                                    return;
                                }

                                setMouduleId(modules[moduleIndex + 1].moduleId);
                                onSelectItem(modules[moduleIndex + 1].moduleItems ? modules[moduleIndex + 1].moduleItems[0] : modules[moduleIndex + 1].details[0]);
                            }
                        }} />
                    </div> : <></>
            }</section>
        </ErrorBoundary>
        <ErrorBoundary>
            <section className='w-full md:p-4 md:ml-4  h-[70vh] md:h-auto flex-col'>
                <section className={classNames("w-full cursor-pointer text-sm  flex flex-row flex-wrap mt-12 justify-start items-center  gap-7")}>
                    <div className={index != 0 ? "text-white font-normal" : "text-blue-300 font-medium"} onClick={(e) => setIndex(0)}>
                        OverView
                    </div>
                    <div className='h-6 w-[1px] rounded-lg bg-gray-400'></div>
                    <div className={index != 1 ? "text-white font-normal" : "text-blue-300 font-medium"} onClick={(e) => setIndex(1)}>
                        Notes
                    </div>
                    <div className='h-6 w-[1px] rounded-lg bg-gray-400'></div>

                    <div className='h-6 w-[1px] rounded-lg bg-grey md:hidden'></div>
                    <div className={index != 3 ? "text-white font-normal md:hidden" : "text-blue font-medium md:hidden"} onClick={(e) => setIndex(3)}>
                        Lectures
                    </div>


                </section>

                <main className='mt-2 w-full flex-1 md:h-auto md:block'>
                    {
                        index == 0 ? <section className='w-full'>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Course Description</h2>
                                <section>

                                    <p className='my-6 leading-6 font-normal text-sm text-white text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.description?.description ?? data?.CourseContent?.courseContent?.course?.courseDetails?.description ?? ""}</p>

                                    {
                                        (data?.CourseContent?.courseContent?.course?.courseDetails?.description?.descriptionList ?? []).map((e: any, index: any) => (e?.title ?? e ?? "").length == 0 ? <></> :
                                            <section key={index}>
                                                <div className='w-full flex flex-row gap-2 mb-4'>
                                                    <p className='leading-6 font-medium text-lg text-white'>{index + 1}.</p>
                                                    <p className='leading-6 font-medium text-lg  text-white flex-1 text-justify'>{e?.title ?? e}</p>

                                                </div>
                                                {
                                                    (e?.titleListItems ?? []).map((e: any, subIndex: any) => (e ?? "").length == 0 ? <></> :
                                                        <div key={`${index}${subIndex}`} className='ml-4 mt-4 w-full flex flex-row gap-2 '>
                                                            <p className='leading-6 font-normal text-sm text-white'>{index + 1}.{subIndex + 1}.</p>
                                                            <p className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>

                                                        </div>)
                                                }
                                            </section>)
                                    }
                                </section>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).length != 0 ? <section className='mt-10'>
                                        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Highlights</h2>
                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.heighlights ?? []).map((e: any, index: any) => (e ?? "").length == 0 ? <></> : <p key={index} className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}. {e}</p>)
                                        }
                                    </section> : <></>
                                }
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).length != 0 ? <section className='mt-10'>
                                        <h2 className='font-semibold text-2xl text-white mb-6 text-justify'>Course Benefit Include</h2>
                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.courseBenefitInclude ?? []).map((e: any, index: number) => (e ?? "").length == 0 ? null : (
                                                <div key={index} className='w-full flex flex-row gap-2 '>
                                                    <p className='leading-6 font-normal text-sm text-white'>{index + 1}.</p>
                                                    <p className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                                </div>)
                                            )
                                        }
                                    </section> : <></>
                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Objectives</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>
                                    {data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).length != 0 ?
                                        <section className=''>

                                            {
                                                (data?.CourseContent?.courseContent?.course?.courseDetails?.objectives?.objectiveList ?? []).map((e: any, index: number) => (e ?? "").length == 0 ? null : (
                                                    <div key={index} className='w-full flex flex-row gap-2 '>
                                                        <p className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                        <p className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                                    </div>)
                                                )
                                            }
                                        </section>
                                        : <></>
                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Audience</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).length != 0 ?
                                        <section>
                                            {(data?.CourseContent?.courseContent?.course?.courseDetails?.audience?.audienceList ?? []).map((e: any, index: number) =>
                                                (e ?? "").length === 0 ? null : (
                                                    <div key={index} className="w-full flex flex-row gap-2">
                                                        <p className="leading-6 font-normal text-sm text-white text-justify">{index + 1}.</p>
                                                        <p className="leading-6 font-normal text-sm text-white flex-1 text-justify">{e}</p>
                                                    </div>
                                                )
                                            )}
                                        </section> : <></>

                                }

                            </main>
                            <main className='mb-8'>
                                <h2 className='font-semibold text-2xl text-white mb-3 text-justify'>Prerequisites</h2>
                                <h2 className='font-normal text-sm text-white mb-6 text-justify'>{data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.description ?? ""}</h2>
                                {
                                    (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).length != 0 ? <section className=''>

                                        {
                                            (data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites?.PrerequisiteList ?? []).map((e: any, index: any) => (e ?? "").length !== 0 && <div key={index} className='w-full flex flex-row gap-2 '>
                                                <p className='leading-6 font-normal text-sm text-white text-justify'>{index + 1}.</p>
                                                <p className='leading-6 font-normal text-sm text-white flex-1 text-justify'>{e}</p>
                                            </div>)
                                        }
                                    </section> : <></>
                                }

                            </main>
                        </section> : index == 1 ? <textarea

                            rows={5}

                            value={notes ?? ""}
                            onChange={(e) => {
                                updateNotes(moduleId, item.moduleItemId, e.target.value);
                                setNotes(e.target.value);

                            }}



                            className="block px-4 w-full rounded-sm bg-slate-700  text-  placeholder:font-medium placeholder:text-white placeholder:pl-3 text-white  sm:text-sm sm:leading-6"
                        /> : index == 2 ? <></> : <div className=" md:hidden w-full h-full overflow-y-auto">
                            {item && <ModuleList modules={modules} setMouduleId={setMouduleId} onSelectItem={onSelectItem} currentItem={item} moduleId={moduleId} />}
                        </div>
                    }
                </main>


            </section>
        </ErrorBoundary>
    </div>)


};

export default PlayerComponent;
