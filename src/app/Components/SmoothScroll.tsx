"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,            // slightly smooth
            easing: (t) => t * (2 - t), // subtle ease-out
            wheelMultiplier: 1,       // normal wheel scroll
            touchMultiplier: 2,       // normal touch scroll
            infinite: false,
            smoothWheel: true,

        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return null;
};

export default SmoothScroll;
