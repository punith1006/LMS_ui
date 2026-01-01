"use client";
import { useState, useEffect } from "react";
import { CourseData, fetchCourses } from "@/app/utils/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
export const useCourseManagement = (coursesPerPage: number,technology:string|null,filter:any,hub:any) => {
  
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<CourseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  // const params = useSearchParams();
  // const params = new URLSearchParams(window.location.search);

//   const technology= params.get("technology")
//  const filter= params.get("filter")
//  const hub= params.get("HUB")

  const [currentFilters, setCurrentFilters] = useState({
    partnerId: filter ? Number(filter) : null,
    technology: technology as string | null,
    HUB: hub ? Number(hub) : null,
  });

  useEffect(() => {
  console.log(hub);
  setCurrentFilters({
    partnerId: filter ? Number(filter) : null,
    technology: technology ,
    HUB: hub ? Number(hub) : null,
  })
    const getCourses = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);

      let defaultFilteredCourses = fetchedCourses;

      if (filter) {
        defaultFilteredCourses = fetchedCourses.filter(
          (course) => course.Partner?.partnerId === Number(filter)
        );
      } else if (technology) {
        defaultFilteredCourses = fetchedCourses.filter(
          (course) => course.CourseCategory?.categoryName === technology
        );
      } else if (hub) {
        console.log(hub,"hub");
        
        defaultFilteredCourses = fetchedCourses.filter(
          (course) => course.Academic?.academicsId === Number(hub)
        );
      }
console.log(defaultFilteredCourses);

      setFilteredCourses(defaultFilteredCourses);
      setDisplayedCourses(defaultFilteredCourses.slice(0, coursesPerPage));
    };

    getCourses();
  }, [coursesPerPage, filter, technology, hub]); // Ensure `hub` is included

  useEffect(() => {
    const applyFilters = () => {
      let filtered = courses;

      if (currentFilters.partnerId !== null) {
        console.log("Partnercurrent", currentFilters.partnerId);

        filtered = filtered.filter(
          (course) => course.Partner?.partnerId === currentFilters.partnerId
        );
      }

      if (currentFilters.technology) {
        filtered = filtered.filter(
          (course) =>
            course.CourseCategory?.categoryName === currentFilters.technology
        );
      }

      if (currentFilters.HUB) {
        console.log("HUBcurrent", currentFilters.HUB);

        filtered = filtered.filter(
          (course) => course.Academic?.academicsId === currentFilters.HUB
        );
      }

      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredCourses(filtered);
      setDisplayedCourses(filtered.slice(0, coursesPerPage));
      setCurrentPage(1);
    };

    applyFilters();
  }, [courses, currentFilters, searchQuery, coursesPerPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    setDisplayedCourses((prev) => [
      ...prev,
      ...filteredCourses.slice(startIndex, endIndex),
    ]);
    setCurrentPage(nextPage);
  };

  const handleFilter = (
    partnerId: number | null,
    technology: string | null,
    hub: number | null
  ) => {
    setCurrentFilters((prevFilters) => {
      if (hub !== prevFilters.HUB) {
        return {
          partnerId: partnerId,
          technology: technology,
          HUB: hub,
        };
      }

      if (partnerId !== prevFilters.partnerId) {
        return {
          ...prevFilters,
          partnerId: partnerId,
          technology: null,
        };
      }

      return {
        ...prevFilters,
        partnerId: partnerId !== null ? partnerId : prevFilters.partnerId,
        technology: technology !== null ? technology : prevFilters.technology,
        HUB: hub !== null ? hub : prevFilters.HUB,
      };
    });

    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    courses,
    filteredCourses,
    displayedCourses,
    setCurrentPage,
    setDisplayedCourses,
    setFilteredCourses,
    setCurrentFilters,
    coursesPerPage,
    handleLoadMore,
    handleFilter,
    handleSearch,
    hasMore: displayedCourses.length < filteredCourses.length,
  };
};
