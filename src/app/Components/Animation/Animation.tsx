"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Props {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function TextReveal({ children, className = "", style }: Props) {
    const textRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        const split = new SplitText(textRef.current, {
            type: "lines",
            linesClass: "line-child",
        });

        gsap.from(split.lines, {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
            },
            duration: 1.5,
            ease: "power3.out",
            yPercent: 100,
            opacity: 0,
            stagger: 0.15,
        });

        return () => split.revert();
    }, []);

    return (
        <div ref={textRef} className={`overflow-hidden ${className}`} style={style}>
            {children}
        </div>
    );
}
