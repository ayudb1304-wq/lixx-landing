'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with luxury, heavy feel parameters
        const lenis = new Lenis({
            lerp: 0.1,           // Smoothness interpolation - lower = smoother
            duration: 1.5,       // Slightly slower for cinematic effect
            smoothWheel: true,   // Smooth mousewheel scrolling
        });

        lenisRef.current = lenis;

        // Connect Lenis scroll events to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP ticker to drive the Lenis RAF loop
        // This ensures perfect sync between scroll and animations
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);

        // Disable lag smoothing to prevent jumps during heavy loads
        gsap.ticker.lagSmoothing(0);

        // Cleanup on unmount
        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
