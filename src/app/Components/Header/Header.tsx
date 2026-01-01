"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Menu, ChevronDown, User, LogOut, BookOpen, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import AllCourses from './AllCourses';
import useUserData from "@/app/hooks/userData";

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
    const [isMobileProgramsOpen, setIsMobileProgramsOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getHeaderBackground = () => {
        switch (activeSection) {
            case 'home':
                return 'bg-white';
            case 'consulting':
                return 'bg-[#FFFFFF] text-black';
            default:
                return 'bg-[#FFFFFF] text-black';
        }
    };

    const getHeaderTextColor = () => {
        switch (activeSection) {
            case 'home':
                return 'text-[#838383]';
            default:
                return 'text-black';
        }
    };


    const getButtonColor = () => {
        switch (activeSection) {
            case 'home':
                return 'text-black bg-white';
            default:
                return ' bg-[#004881] text-white';
        }
    };

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProgramsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (value: string) => {
        console.log('Search value:', value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            handleSearch(searchValue.trim());
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleSearchToggle = () => {
        if (isSearchOpen && searchValue.trim()) {
            handleSearch(searchValue.trim());
        }
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchValue('');
        }
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setSearchValue('');
    };

    const handleProgramsClick = (item: string) => {
        console.log('Selected program:', item);
        setIsProgramsDropdownOpen(false);
        // Add your navigation logic here
    };

    const handleMobileProgramsClick = (item: string) => {
        console.log('Selected mobile program:', item);
        setIsMobileProgramsOpen(false);
        // Add your navigation logic here
    };

    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        // Check for session token on mount and route changes  
        const session = localStorage.getItem("userData");
        if (session) {
            setIsLoggedIn(true);
            try {
                const parsedSession = JSON.parse(session);
                // Try multiple common field names for user name
                console.log("Parsed Session Data:", parsedSession);

                const name =
                    parsedSession.firstName ||
                    parsedSession["UserCredential.username"] ||
                    parsedSession.username ||
                    parsedSession.name ||
                    parsedSession.fullname ||
                    parsedSession.user?.firstName ||
                    parsedSession.user?.["UserCredential.username"] ||
                    parsedSession.user?.username ||
                    parsedSession.user?.name ||
                    parsedSession.user?.fullname ||
                    parsedSession.email?.split('@')[0] ||
                    parsedSession.user?.email?.split('@')[0] ||
                    "User";

                console.log("Resolved Name:", name);
                setUserName(name);
            } catch (e) {
                console.error("Error parsing session:", e);
                setUserName("Profile");
            }
        } else {
            setIsLoggedIn(false);
            setUserName("Profile");
        }
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        localStorage.clear();
        router.push("/");
        window.location.reload();
        //setIsLoggedIn(false);
        //setUserName("Profile");
        //setIsProfileDropdownOpen(false);

    };

    // ... existing search/background logic ...

    return (
        <>
            <header className={` ${getHeaderTextColor()} bg-white  fixed top-0 left-0 z-50 w-full font-[family-name:var(--font-poppins)] transition-colors duration-500`}>
                <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-20">
                    <div className="flex md:justify-center justify-between md:gap-2 item-center md:items-end  h-16 p-2">
                        {/* ... Logo and Nav code remains same ... */}
                        <div className="flex items-end gap-8">
                            <div className=" flex h-full items-center justify-center cursor-pointer" onClick={() => router.push('/')}>
                                <Image
                                    src={'/gkt.png'}
                                    alt="My Logo"
                                    width={100}
                                    height={10}
                                />
                            </div>
                            <div className='flex '>
                                <nav className={`hidden md:flex bg-[#F6F6F6] rounded-2xl gap-5  justify-start  ${isSearchOpen ? 'md:hidden lg:flex' : ''}`}>
                                    <AllCourses />
                                    <a onClick={() => router.push('/Course')} className=" relative group px-3 py-2 text-sm font-normal hover:text-white hover:bg-[#EB900C] cursor-pointer rounded-3xl">
                                        Our Programs
                                        <span className="absolute left-2  top-10 w-[90%] h-[1px] bg-black hidden  group-hover:block"></span>
                                    </a>
                                    <a href="#" className="relative group px-3 py-2 text-sm font-normal hover:text-white hover:bg-[#EB900C] cursor-pointer rounded-3xl">
                                        Career
                                        <span className="absolute left-2  top-10 w-[90%] h-[1px] bg-black hidden  group-hover:block"></span>
                                    </a>
                                    <a onClick={() => router.push('/Consulting&Outsourcing')} className=" relative px-3 py-2 text-sm font-normal hover:text-white group hover:bg-[#EB900C] cursor-pointer rounded-3xl ">
                                        About Us
                                        <span className="absolute left-2  top-10 w-[90%] h-[1px] bg-black hidden  group-hover:block"></span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                        <div className='flex gap-5 justify-between'>
                            <div className="flex items-center">
                                {isSearchOpen ? (
                                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                                        <div className="relative">
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                value={searchValue}
                                                onChange={handleInputChange}
                                                placeholder="Search..."
                                                className="w-32 md:w-56 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCloseSearch}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2  hover:text-gray-600 cursor-pointer"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <button type="submit" className="ml-2  hover:text-gray-600 cursor-pointer">
                                            <Search className="h-5 w-5" />
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={handleSearchToggle}
                                        className="text-[#838383] bg-white border-1 border-[#C4C4C4] hover:text-gray-900 cursor-pointer transition-colors duration-200 rounded-full p-1"
                                    >
                                        <Search className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            <button
                                className="md:hidden"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <div className="hidden md:flex items-center space-x-4 ml-10">

                                <div className={` cursor-pointer border-1 border-[#C4C4C4] rounded-full p-1   ${getHeaderTextColor}`}>
                                    <select defaultValue={'IND'} className=" cursor-pointer text-sm">
                                        <option value="IND" className='cursor-pointer text-black'>IND</option>
                                        <option value="SGP" className='cursor-pointer  text-black'>SGP</option>
                                        <option value="UAE" className='cursor-pointer  text-black'>UAE</option>
                                        <option value="USA" className='cursor-pointer  text-black'>USA</option>
                                    </select>
                                </div>

                                {isLoggedIn ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                            className={`flex items-center gap-2 px-4 bg-[#F6F6F6] py-2 text-black rounded-2xl hover:text-white hover:bg-[#EB900C] text-sm font-medium transition-colors duration-200`}
                                        >
                                            <User className="h-4 w-4" />
                                            <span>{userName}</span>
                                            <ChevronDown className="h-3 w-3" />
                                        </button>

                                        {isProfileDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                                                <button
                                                    onClick={() => router.push('/profile/my-learning')}
                                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                                                >
                                                    <BookOpen className="h-4 w-4 text-[#EB900C]" />
                                                    My Learning
                                                </button>
                                                <button
                                                    onClick={() => router.push('/profile/my-webinar')}
                                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                                                >
                                                    <Calendar className="h-4 w-4 text-[#EB900C]" />
                                                    My Schedules
                                                </button>
                                                <div className="h-px bg-gray-100 my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => router.push("/auth/signin")}
                                        className={`px-6 bg-[#F6F6F6] py-2 text-black rounded-2xl hover:text-white hover:bg-[#EB900C]  text-sm font-medium hover:scale-105 cursor-pointer transition-colors duration-200`}
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <span className="text-lg font-bold">Menu</span>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    <a href="#" className="text-white text-base hover:text-gray-300">
                        Our story
                    </a>

                    <div className="relative">
                        <button
                            onClick={() => setIsMobileProgramsOpen(!isMobileProgramsOpen)}
                            className="text-white text-base hover:text-gray-300 flex items-center justify-between w-full cursor-pointer"
                        >
                            <span>Our programs</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileProgramsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMobileProgramsOpen && (
                            <div className="mt-2 ml-4 space-y-2">
                                <button
                                    onClick={() => handleMobileProgramsClick('Webinars')}
                                    className="block text-gray-300 text-sm hover:text-white transition-colors duration-150 cursor-pointer"
                                >
                                    Webinars
                                </button>
                                <button
                                    onClick={() => handleMobileProgramsClick('Schedules')}
                                    className="block text-gray-300 text-sm hover:text-white transition-colors duration-150 cursor-pointer"
                                >
                                    Schedules
                                </button>
                            </div>
                        )}
                    </div>

                    <a href="#" className="text-white text-base hover:text-gray-300">
                        Career
                    </a>

                    {isLoggedIn ? (
                        <>
                            <div className="h-px bg-gray-700 my-2" />
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Account</h3>
                            <button
                                onClick={() => {
                                    router.push('/profile/my-learning');
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-white text-base hover:text-[#EB900C] w-full"
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>My Learning</span>
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/profile/my-webinar');
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-white text-base hover:text-[#EB900C] w-full"
                            >
                                <Calendar className="h-5 w-5" />
                                <span>My Schedules</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-red-400 text-base hover:text-red-300 w-full mt-2"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => router.push("/auth/signin")}
                            className="bg-white text-black px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 mt-4"
                        >
                            Login
                        </button>
                    )}
                </nav>
            </div>

            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                ></div>
            )}
        </>
    );
};

export default Header;