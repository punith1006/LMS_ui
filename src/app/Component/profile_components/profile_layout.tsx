'use client'
import { useRouter } from "next/navigation";
import Header from "@/app/Components/Header/Header"
import { usePathname } from "next/navigation";
import classNames from "@/app/helper/add_class";


export default function ProfileLayout({
    children
}: { children: any }) {
    const router = useRouter();
    const pathname = usePathname();
    return (

        <div className="w-full bg-black min-h-screen">
            <main
                className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col pt-16`}
            >

                <Header activeSection="home" />
                <main className="flex-1 max-h-full w-full flex flex-row mt-8 gap-10">
                    {
                        pathname.includes("profile/update") ? null : <section className="hidden md:flex flex-col gap-4 text-white text-sm w-56 my-2 shrink-0 sticky top-24 self-start h-fit cursor-pointer">
                            <div onClick={() => {
                                router.push("/profile/my-learning")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C] cursor-pointer transition-all duration-200 flex items-center gap-3", pathname?.includes("/profile/my-learning") ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Dashboard</div>
                            <div onClick={() => {
                                router.push("/profile/my-achivement")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C]  cursor-pointer transition-all duration-200 flex items-center gap-3", pathname == "/profile/my-achivement" ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Achievement</div>
                            <div onClick={() => {
                                router.push("/profile/my-notification")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C] cursor-pointer transition-all duration-200 flex items-center gap-3", pathname == "/profile/my-notification" ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Notification</div>
                            <div onClick={() => {
                                router.push("/profile/upcoming-webinar")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C] cursor-pointer transition-all duration-200 flex items-center gap-3", pathname == "/profile/upcoming-webinar" ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Upcoming Webinar</div>
                            <div onClick={() => {
                                router.push("/profile/talk-to-us")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C] cursor-pointer transition-all duration-200 flex items-center gap-3", pathname == "/profile/talk-to-us" ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Talk to us</div>
                            <div onClick={() => {
                                router.push("/profile/my-history")
                            }} className={classNames("px-4 py-3 rounded-xl font-medium hover:bg-[#EB900C] cursor-pointer transition-all duration-200 flex items-center gap-3", pathname == "/profile/my-history" ? "bg-[#004881] shadow-lg" : "bg-gray-900/50 hover:pl-6")}>Purchase History</div>
                        </section>
                    }
                    <section className="flex-1 w-full">{children}</section>
                </main>


            </main>
        </div>

    )
}