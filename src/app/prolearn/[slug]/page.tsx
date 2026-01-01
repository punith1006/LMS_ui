"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosPublic } from "@/app/common/axiosPublic";
import ProlearnCourse from "@/app/Components/ProlearnCourse/ProlearnCourse";
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";

const ProlearnPage = () => {
    const params = useParams();
    const slug = params?.slug;
    const [course, setCourse] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchData = async () => {
                try {
                    const response = await axiosPublic.get("/lms/course-details", {
                        params: { slug },
                    });
                    setCourse(response.data.courses);
                } catch (error) {
                    console.error("Error fetching course details:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header activeSection="home" />
            <div className="flex-1 mt-20">
                <ProlearnCourse course={course} />
            </div>
            <Footer activeSection="prolearn" />
        </div>
    );
};

export default ProlearnPage;
