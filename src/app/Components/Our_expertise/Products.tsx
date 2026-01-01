"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface Product {
    title: string;
    content: string;
    image: string;
}

const products: Product[] = [
    {
        title: "PHC",
        content: "hello",
        image: "/Products/phc.png",
    },
    {
        title: "VivaahAI",
        content: "hello",
        image: "/Products/vivaaha1.png",
    },
    {
        title: "Stu",
        content: "hello",
        image: "/Products/phc.png",
    },
];

const AUTO_SLIDE_INTERVAL = 2000;

const Products: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % products.length);
        setProgress(0);
    };

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? products.length - 1 : prev - 1
        );
        setProgress(0);
    };

    useEffect(() => {
        let startTime = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / AUTO_SLIDE_INTERVAL) * 100, 100);
            setProgress(percentage);

            if (percentage >= 100) {
                nextSlide();
                startTime = Date.now();
            }
        }, 100);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeIndex]);

    return (
        <div className="flex flex-col items-center text-black w-full mt-20 px-4 md:px-10 mb-10">
            <div className="flex flex-row justify-center items-center gap-4 w-full">
                <button
                    onClick={prevSlide}
                    className="cursor-pointer text-gray-600 hover:text-black"
                >
                    <ChevronLeft size={32} />
                </button>

                <div className="w-full sm:w-[80%] md:w-[100%] max-w-[700px] aspect-video md:h-[450px] relative overflow-hidden rounded-xl shadow-md transition-all duration-700 ease-in-out">
                    <Image
                        key={activeIndex}
                        src={products[activeIndex].image}
                        alt="image"
                        fill
                        className="object-cover transition-opacity duration-700 ease-in-out"
                    />
                </div>

                <button
                    onClick={nextSlide}
                    className="cursor-pointer text-gray-600 hover:text-black"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            <div className="flex justify-center items-center gap-2 mt-4 w-full max-w-[200px]">
                {products.map((_, index) => (
                    <div
                        key={index}
                        className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden"
                    >
                        {index === activeIndex && (
                            <div
                                className="absolute h-full bg-[#043244] transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
