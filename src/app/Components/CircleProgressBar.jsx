// src/components/CircleProgressBar.jsx
'use client'
import React from 'react';
import { basepath } from "@/app/common/constants";

const CircleProgressBar = ({ percentage }) => {
    const basePath = basepath;
    const radius = 24; // Radius of the circle
    const stroke = 2; // Stroke width
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                height={radius * 2}
                width={radius * 2}
            >
                <circle
                    className="text-white"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: strokeDashoffset,
                        transition: 'stroke-dashoffset 0.35s ease-out',
                    }}
                />
            </svg>
            <div className="absolute flex items-center justify-center w-full h-full">
                <img

                    onClick={(e) => {

                    }}
                    className="cursor-pointer"
                    src={`${basePath}/tropy.svg`}
                    alt="Trophy"
                />

            </div>
        </div>
    );
};

export default CircleProgressBar;
