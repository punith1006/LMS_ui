


"use client";

import { Fragment, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useUserData from "@/app/hooks/userData";
import ButtonLoginHeader from "@/app/Component/buttons/header_login_btn_component";
import { signOut } from "../cookie/index";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const { userData, isLoading } = useUserData();
  console.log(userData)
  const [background, setBackground] = useState("transparent");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  //const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setBackground(window.scrollY > 50 ? "#000000" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (userData) {
      const name =
        userData?.firstName ||
        userData?.username ||
        userData?.name ||
        userData?.fullname ||
        userData?.["UserCredential.username"] ||
        userData?.email?.split('@')[0] ||
        'User';
      setUserName(name);
    }
  }, [userData]);

  const defaultMenu = [
    { name: "Home", url: "/" },
    { name: "Who We Are", url: "/About" },
    { name: "Our Products", url: "/Products" },
    { name: "What We Offer", url: "/Offers" },
    { name: "Contact Us", url: "/ContactUs" },
  ];

  const profileMenu = [
    { name: "Dashboard", url: "/profile/my-learning" },
    { name: "Achievement", url: "/profile/my-achivement" },
    { name: "Notification", url: "/profile/my-notification" },
    { name: "Upcoming Webinar", url: "/profile/upcoming-webinar" },
    { name: "Talk to Us", url: "/profile/talk-to-us" },
    { name: "Purchase History", url: "/profile/my-history" },
  ];

  return (
    <nav className="bg-transparent text-white p-2 items-center w-full z-50 sticky top-0" style={{ backgroundColor: background }}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <img
            src="/mct_logo2.png"
            className="w-28 md:w-36 cursor-pointer"
            onClick={() => router.push("/")}
            alt="Logo"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Login Button in Mobile View */}
          {isLoading ? (
            <div className="w-20"></div>
          ) : userData === null ? (
            <ButtonLoginHeader />
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-white gap-2">
                Hello <span className="text-purple-600">{userData?.firstName || userData["UserCredential.username"]}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push("/profile/my-learning")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Dashboard
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a onClick={() => router.push("/profile/update")} className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>Your Profile</a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          localStorage.clear();
                          signOut();
                          window.dispatchEvent(new Event("userUpdated"));
                          router.push("/");
                        }}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
          <button onClick={toggleSidebar} className="text-3xl focus:outline-none">
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Navigation & Login Button */}
        <div className="hidden md:flex gap-8 items-center">
          {defaultMenu.map((item, index) => (
            <span
              key={index}
              className={`hover:cursor-pointer hover:text-lg hover:font-bold ${path === item.url ? "underline font-bold" : ""}`}
              onClick={() => router.push(item.url)}
            >
              {item.name}
            </span>
          ))}
          {isLoading ? (
            <div className="w-32"></div>
          ) : userData === null ? (
            <ButtonLoginHeader />
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-white gap-2">
                <h1 className="text-xl font-semibold">
                  Hello{' '}
                  <span className="text-purple-600">
                    {userName}
                  </span>
                </h1>
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute cursor-pointer right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push("/profile/my-learning")}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Dashboard
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a onClick={() => router.push("/profile/update")} className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>Your Profile</a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          localStorage.clear();
                          signOut();
                          window.dispatchEvent(new Event("userUpdated"));
                          router.push("/");
                        }}
                        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[70%] bg-black z-40 text-white p-6 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-scroll max-h-screen scrollbar-hide`}>
        <div className="flex flex-col space-y-8 pt-24 cursor-pointer ">
          {defaultMenu.map((item, index) => (
            <span key={index} className="text-2xl hover:text-cyan-300" onClick={() => { setSidebarOpen(false); router.push(item.url); }}>
              {item.name}
            </span>
          ))}
          {path.includes("/profile") && (
            <>
              <button onClick={toggleProfileMenu} className="text-xl text-gray-400 hover:text-white mt-4">
                {profileMenuOpen ? "▲ Hide LMS Menu" : "▼ Show LMS Menu"}
              </button>
              {profileMenuOpen && profileMenu.map((item, index) => (
                <span key={index} className="text-2xl hover:text-cyan-300" onClick={() => { setSidebarOpen(false); router.push(item.url); }}>
                  {item.name}
                </span>
              ))}

            </>
          )}
        </div>
      </div>
    </nav>
  );
}
