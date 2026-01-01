import { ReactNode } from "react";
import { Key } from "readline";
import { axiosPublic } from "../common/axiosPublic";

interface Partner {
  partnerId: number;
  partnerName: string;
}
interface Academic {
  academicsId: number;
  academicsName: string;
}

interface CourseCategory {
  categoryName: string;
}

export interface CourseData {
  Academic?:Academic;
  Partner?: Partner;
  CourseCategory?: CourseCategory;
  courseId: number;
  title: string;
  slug:string;
  originalPrice: string;
  discountedPrice: string;
}

export const fetchCourses = async (): Promise<CourseData[]> => {
  const response = await fetch('https://project.globalknowledgetech.com:5004/lms/course');
  const data = await response.json();
  return data.courses;
};

interface CertificationPartner {
  partnerId: number;
  partnerName: string;
}
interface Course {
  slug: Key | null | undefined;
  title: ReactNode;
  id: number;
  name: string;
  duration: string;
}

interface CertificationCategory {
  CertificateCourseItems: Course[];
}

export interface CertificationData {
  slug:string;
  certificateCourseId: number;
  title: string;
  description?: string;
  CertificateCourseCostPlans:CertificationCategory[];
  

}

export const fetchCertifications = async (): Promise<CertificationData[]> => {
  try {
    const response = await fetch('https://project.globalknowledgetech.com:5004/lms/certificate-course');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Check if data has the expected structure
    if (!data || !Array.isArray(data.certificateCourses)) {
      console.error('Invalid API response structure:', data);
      return [];
    }
    
    return data.certificateCourses;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
};

export const fetchCoursesByPartner = async () => {
  try {
    const response = await fetch('https://project.globalknowledgetech.com:5004/lms/course');
    const data = await response.json();
    
    // Group courses by partner
    const groupedCourses = data.courses.reduce((acc: Record<string, CourseData[]>, course: CourseData) => {
      const partnerName = course.Partner?.partnerName || 'Other';
      if (!acc[partnerName]) {
        acc[partnerName] = [];
      }
      acc[partnerName].push(course);
      return acc;
    }, {});

    return groupedCourses;
  } catch (error) {
    console.error('Error fetching courses by partner:', error);
    return {};
  }
};



export interface CertificateCourseItem {
  certificateCourseItemId: number;
  courseId: number;
  Course: Course;
}

export interface CertificateCourseCostPlan {
  certificateCourseCostPlanId: number;
  certificateCourseId: number;
  CertificateCourseItems: CertificateCourseItem[];
}

export interface CertificateData {
  slug: string;
  title: string;
  description: string | null;
  CertificateCourseCostPlans: CertificateCourseCostPlan[];
}

export const fetchCertificateBySlug = async (slug: string): Promise<CertificateData> => {
  const response = await axiosPublic.get("/lms/certificate-course", {
      params: {
          slug
      }
  });
  return response.data.certificateCourses[0];
};
