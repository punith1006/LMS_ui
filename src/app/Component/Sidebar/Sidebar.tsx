"use client"
import React, { useState, useMemo, useEffect } from "react";
import { CourseData } from "@/app/utils/api";
import { usePathname, useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

interface SidebarProps {
  onFilter: (partnerId: number | null, technology: string | null, hub: number | null) => void;
  courses: CourseData[];
  onSearch: (query: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setDisplayedCourses: React.Dispatch<React.SetStateAction<CourseData[]>>;
  setFilteredCourses: React.Dispatch<React.SetStateAction<CourseData[]>>;
  setCurrentFilters: React.Dispatch<React.SetStateAction<any>>;
  coursesPerPage: number;
}

interface Filters {
  partner: number | null;
  HUB: number | null;
  technology: string | null;
  search: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onFilter,
  courses,
  onSearch,
  setCurrentPage,
  setDisplayedCourses,
  setFilteredCourses,
  setCurrentFilters,
  coursesPerPage,

}) => {

  const params = new URLSearchParams(window.location.search);

  const tech = params.get("technology")
  const filter = params.get("filter")
  const hub = params.get("HUB")

  const [filters, setFilters] = useState<Filters>({
    partner: filter ? Number(filter) : null,
    technology: tech as string | null,
    search: "",
    HUB: hub ? Number(hub) : null,

  });



  const { partners, technologies, HUB } = useMemo(() => {
    const partnerMap: Record<number, string> = {};
    const hubnum: Record<number, string> = {};
    const techSet = new Set<string>();

    courses.forEach((course: CourseData) => {
      if (course.Partner) {
        if (course.Partner.partnerId == 1) {

        } else {
          partnerMap[course.Partner.partnerId] = course.Partner.partnerName;

        }
      }
      if (course.Academic) {
        hubnum[course.Academic.academicsId] = course.Academic.academicsName
      }
    });

    const relevantCourses = filters.partner
      ? courses.filter(
        (course) => course.Partner?.partnerId === filters.partner
      )
      : courses;

    relevantCourses.forEach((course: CourseData) => {
      if (course.CourseCategory?.categoryName) {
        techSet.add(course.CourseCategory.categoryName);
      }
    });

    return {
      partners: Object.entries(partnerMap).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
      technologies: Array.from(techSet),
      HUB: Object.entries(hubnum).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
    };
  }, [courses, filters.partner]);

  const handleFilterChange = (
    type: keyof Filters,
    value: string | number | null
  ) => {

    const newFilters = { ...filters };

    if (type === "HUB") {
      newFilters.HUB = value as number | null;
      newFilters.partner = null;
      newFilters.technology = null;
    } else if (type === "partner") {
      newFilters.partner = value as number | null;
      newFilters.technology = null;
    } else if (type === "technology") {
      newFilters.technology = value as string | null;
    } else {
      newFilters.search = value as string;
    }

    setFilters(newFilters);

    if (type === "search") {
      onSearch(newFilters.search);
    } else {

      onFilter(newFilters.partner, newFilters.technology, newFilters.HUB);
    }
  };


  const handleReset = () => {
    setFilters({ partner: null, technology: null, search: "", HUB: null });
    onSearch("");
    onFilter(null, null, null);
    setFilteredCourses(courses);
    setDisplayedCourses(courses.slice(0, coursesPerPage));
    setCurrentPage(1);
    setCurrentFilters({
      partnerId: null,
      technology: null,
      hub: null
    });
  };

  return (
    <div className="h-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-white rounded-t-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-3 py-1 rounded-full transition-all"
          >
            Clear All
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {/* HUB Section */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Hubs
          </h3>
          <div className="space-y-1">
            {HUB.map((hub) => (
              <button
                key={hub.id}
                onClick={() => handleFilterChange("HUB", hub.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.HUB === hub.id
                    ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {hub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Partner Section */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Partners
          </h3>
          <div className="space-y-1">
            {partners.map((partner) => (
              <button
                key={partner.id}
                onClick={() => handleFilterChange("partner", partner.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.partner === partner.id
                    ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {partner.name}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Technologies
          </h3>
          <div className="space-y-1">
            {technologies.map((technology) => (
              <button
                key={technology}
                onClick={() => handleFilterChange("technology", technology)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.technology === technology
                    ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {technology}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
