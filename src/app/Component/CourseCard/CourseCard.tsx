import React, { memo } from "react";
import { CourseData } from "@/app/utils/api";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  courses: CourseData[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const CourseCard: React.FC<CourseCardProps> = memo(
  ({ courses, onLoadMore, hasMore }) => {
    const router = useRouter();

    return (
      <div className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="h-[180px] w-full bg-white border border-gray-200 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => router.push(`/prolearn/${course.slug}`)}
            >
              {/* Decorative Circle */}
              <div className="absolute h-24 w-24 -top-12 -right-12 rounded-full bg-purple-50 group-hover:bg-blue-100 group-hover:scale-[10] duration-500 z-0 transition-all"></div>

              <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  {/* Partner Badge */}
                  {course.Partner && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {course.Partner.partnerName}
                    </span>
                  )}

                  {/* Category Tag */}
                  {course.CourseCategory && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {course.CourseCategory.categoryName}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-700 line-clamp-2 transition-colors mt-2">
                  {course.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={onLoadMore}
              className="px-6 py-2.5 rounded-full bg-white text-gray-900 border border-gray-200 font-medium hover:bg-gray-50 hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm hover:shadow-md"
            >
              Load More Courses
            </button>
          </div>
        )}
      </div>
    );
  }
);

CourseCard.displayName = "CourseCard";
export default CourseCard;
