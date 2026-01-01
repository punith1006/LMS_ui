
import { Fragment, useState, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { SiGooglecloud } from "react-icons/si";
import { FaMicrosoft, FaRedhat } from "react-icons/fa6";
import { RiRobot2Fill } from "react-icons/ri";
import { axiosPublic } from '@/app/common/axiosPublic'
import { useRouter } from 'next/navigation';
import { basepath } from '@/app/common/constants';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const usePartnerMode = () => {
    const [partnerData, setPartnerData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data based on AllCourses.tsx expectations and popular course IDs
        const mockPartners = [
            { partnerName: "Artificial Intelligence", partnerId: 1 },
            { partnerName: "Google Cloud", partnerId: 3 },
            { partnerName: "Redhat", partnerId: 2 },
            { partnerName: "Microsoft", partnerId: 4 },
            { partnerName: "IBM", partnerId: 5 },
            //{ partnerName: "iScience", partnerId: 6 }
        ];
        setPartnerData(mockPartners);
        setIsLoading(false);
    }, []);

    return { partnerData, isLoading };
};

// Since the user code relied on 'commonbasePath' which might differ, I'll map it to 'basepath'
const commonbasePath = basepath;

export default function AllCourses() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true);
    let [course, setCourse] = useState<any[]>([]);
    let [selectedCat, setSelectedCat] = useState("All Courses");
    let [selectedid, setSelectedid] = useState(0);

    let courseList = useRef<any[]>([]);
    const shuffle = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };
    const fetchCourse = async () => {
        try {
            setLoading(true);

            let allCourses: any[] = [];
            try {
                const result = await axiosPublic.get('/lms/course');
                if (result.data.courses && result.data.courses.length > 0) {
                    allCourses = result.data.courses;
                }
            } catch (err) {
                console.log("API fetch failed, using mock data");
            }

            // Mock Data Fallback
            if (allCourses.length === 0) {
                allCourses = [
                    { courseId: 101, title: "Prompt Engineering for GEN AI", slug: "prompt-engineering-gen-ai", partnerId: 1 },
                    { courseId: 102, title: "AI-Driven Data Insights", slug: "ai-driven-data-insights", partnerId: 1 },
                    { courseId: 103, title: "Creating AI Powered Application with ChatGPT", slug: "creating-ai-chatgpt", partnerId: 1 },
                    { courseId: 104, title: "Building AI Application With Large Language Model", slug: "building-ai-llm", partnerId: 1 },
                    { courseId: 105, title: "Text Embedding: Everything you need to know", slug: "text-embedding", partnerId: 1 },
                    { courseId: 106, title: "Empowering Semantic Search with LLM", slug: "semantic-search-llm", partnerId: 1 },
                    { courseId: 107, title: "Langchain for Business", slug: "langchain-business", partnerId: 1 },
                    { courseId: 108, title: "Multi-platform Prompt Engineering", slug: "multi-platform-prompt", partnerId: 1 },
                    { courseId: 109, title: "AI FOR ALL", slug: "ai-for-all", partnerId: 1 },
                    { courseId: 110, title: "GEN AI For ALL", slug: "gen-ai-for-all", partnerId: 1 },
                    { courseId: 201, title: "Google Cloud Fundamentals", slug: "google-cloud-fundamentals", partnerId: 3 },
                    { courseId: 202, title: "Architecting with Google Compute Engine", slug: "architecting-google-compute", partnerId: 3 },
                    { courseId: 301, title: "Red Hat System Administration I", slug: "red-hat-sys-admin-i", partnerId: 2 },
                    { courseId: 401, title: "Microsoft Azure Fundamentals", slug: "azure-fundamentals", partnerId: 4 },
                    { courseId: 501, title: "IBM Data Science Professional", slug: "ibm-data-science", partnerId: 5 }
                ];
            }

            const shuffleCourses = shuffle(allCourses);
            // setCourse(shuffleCourses); // Avoid double setting causing flashes

            courseList.current = shuffleCourses;
            if (partnerData && partnerData.length > 0) {
                setCourse(courseList.current.filter((e: any) => e.partnerId == partnerData[0].partnerId));
                setSelectedCat(partnerData[0].partnerName);
                setSelectedid(partnerData[0].partnerId)
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const { partnerData } = usePartnerMode();


    useEffect(() => {
        if (partnerData.length != 0) {
            fetchCourse();
        }
    }, [partnerData])

    const timeoutDuration = 120
    const triggerRef = useRef<any>()
    const timeOutRef = useRef<any>()

    const handleEnter = (isOpen: any) => {
        if (partnerData.length != 0) {
            setCourse(courseList.current.filter((e: any) => e.partnerId == partnerData[0].partnerId));
            setSelectedCat(partnerData[0].partnerName);
            setSelectedid(partnerData[0].partnerId)

            clearTimeout(timeOutRef.current)
            !isOpen && triggerRef.current?.click()
        }

    }

    const handleLeave = (isOpen: any) => {
        timeOutRef.current = setTimeout(() => {
            isOpen && triggerRef.current?.click()
        }, timeoutDuration);

    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <div onMouseEnter={() => handleEnter(open)}
                    onMouseLeave={() => handleLeave(open)}
                >
                    {/* Updated Button Styling: removed opacity/text-white, added inherit color and hover styles from header */}
                    <Popover.Button ref={triggerRef} className="group inline-flex items-center gap-x-1 outline-none focus:outline-none border-none bg-transparent px-3 py-2 text-sm font-normal text-inherit hover:text-white hover:bg-[#EB900C] rounded-3xl cursor-pointer">
                        <span>Programs</span>
                        {show ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" /> : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />}
                    </Popover.Button>

                    <Transition

                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel onMouseLeave={(event) => setShow(false)} className="absolute mt-3 left-0 z-50 flex w-screen max-w-max" >
                            <div className="w-screen lg:max-w-5xl xl:max-w-4xl md:max-w-2xl h-[410px] flex flex-row overflow-hidden text-white  bg-[#11183d] text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                <div className=" w-1/4 ">
                                    {[...partnerData].map((item) => (
                                        <div onClick={(event) => {
                                            setSelectedCat(item.partnerName);
                                            setSelectedid(item.partnerId)


                                            setCourse(courseList.current.filter((e: any) => e.partnerId == item.partnerId));
                                        }} key={item.partnerName} onMouseEnter={(e) => {
                                            setSelectedCat(item.partnerName);
                                            setSelectedid(item.partnerId)

                                            setCourse(courseList.current.filter((e: any) => e.partnerId == item.partnerId));
                                        }} className={classNames("cursor-pointer group relative flex gap-x-6 p-4 justify-center items-center hover:bg-[#49517b]  text-base  border-b border-[#595a63] ", selectedCat == item.partnerName ? "bg-[#49517b]" : "")}>
                                            <div>
                                                {item.partnerName == "Google Cloud" ? <SiGooglecloud /> : item.partnerName == "Artificial Intelligence" ? <RiRobot2Fill /> : item.partnerName == "Redhat" ? <FaRedhat /> : item.partnerName == "Microsoft" ? <FaMicrosoft /> : item.partnerName == "IBM" ? <span className="font-bold text-2xl">IBM</span> : <img style={{ height: "24px" }} alt='Academics' src={`${commonbasePath}/academics.png`} />}
                                            </div>
                                            <div className='flex-1 group '>

                                                <a className={classNames(" font-medium text-white text-xl group-hover:text-white group-hover:font-bold", selectedCat == item.partnerName ? "text-white font-semibold " : "text-gray-300")}>
                                                    {item.partnerName}
                                                </a>
                                            </div>
                                            {/* <ChevronRightIcon className={classNames("h-4 w-4 text-gray-600 font-normal group-hover:text-blue", selectedCat == item.partnerName ? "text-blue" : "text-gray-600")} aria-hidden="true" /> */}

                                        </div>
                                    ))}
                                </div>
                                <section className="flex-1 p-4 flex flex-col justify-center items-center bg-[#0A181F] ">
                                    {
                                        isLoading ? <div className=" h-12 w-12 border-4 border-t-4 border-blue animate-spin absolute"></div> : course.length === 0 ? (
                                            <>
                                                <div className='cursor-pointer flex flex-row justify-center items-center bg-orange px-6 py-2 text-base font-normal text-white '>
                                                    Stay tuned! We’re working on some exciting new courses.
                                                </div>   <br /><br /></>
                                        ) : (
                                            <div className={`flex-1 grid custom-scrollbar1 grid-cols-2 gap-4 overflow-y-auto  bg-[#0A181F]  p-5 w-full `}>
                                                {
                                                    course.sort((a, b) => a.courseId - b.courseId).map((e, index) => {
                                                        if (index > 11) return <></>
                                                        return <a key={e.courseId} onClick={(event) => {
                                                            handleLeave(open)
                                                            router.push(`/prolearn/${e.slug}`)
                                                        }} className={`cursor-pointer font-normal text-white p-2  hover:text-white hover:font-semibold hover:bg-[#49517b] h-fit ${selectedCat == "iScience" ? 'text-xl' : ""} `}>
                                                            {e.title}
                                                        </a>
                                                    })
                                                }
                                            </div>
                                        )}

                                    {
                                        course.length != 0 && <div onClick={(e) => {
                                            handleLeave(open)
                                            router.push(`/AllCourses?type=partner&id=${selectedid}&name=${selectedCat}`);
                                            sessionStorage.removeItem("navtab");
                                        }} className='cursor-pointer mt-2 flex flex-row justify-center items-center bg-[#49517b] px-6 py-2 text-base font-medium  text-white rounded-lg'>All Courses</div>
                                    }
                                </section>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </div>
            )}

        </Popover>
    )
}
