"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SpecialOfferBanner() {
    const [hidden, setHidden] = useState(false);
    const timerRef = useRef(null);

    const handleClose = () => {
        setHidden(true);
        // Reappear automatically after 20 seconds
        timerRef.current = setTimeout(() => {
            setHidden(false);
        }, 20000);
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    if (hidden) return null;

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-stretch rounded-xl overflow-hidden shadow-2xl max-w-[420px] w-full bg-gradient-to-r from-[#0a1628] via-[#0d2045] to-[#0a1628]">

            {/* Dot pattern overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />

            {/* Close button */}
            <button
                onClick={handleClose}
                aria-label="Close banner"
                className="absolute top-2 right-2 z-20 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 active:scale-90 transition-all duration-150 text-white/70 hover:text-white text-[11px] font-bold leading-none"
            >
                ✕
            </button>

            {/* Badge col */}
            <div
                className="relative z-10 flex flex-col items-center justify-center gap-0.5 bg-[#e8620a] px-4 pr-7 shrink-0"
                style={{ clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)" }}
            >
                <span className="text-[9px] font-extrabold text-white tracking-widest uppercase text-center leading-tight">
                    Special<br />Offer!
                </span>
                <span
                    className="text-white tracking-widest text-center leading-none font-black uppercase"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "18px" }}
                >
                    LIMITED<br />SEATS
                </span>
                <span className="text-[8px] font-bold text-white/80 tracking-widest uppercase">
                    Act Now
                </span>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col justify-center flex-1 px-4 py-3 min-w-0">
                <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-0.5">
                    Complete CPL Training at just
                </p>
                <span
                    className="text-[#f07020] leading-none tracking-wide"
                    style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "38px" }}
                >
                    $35,000
                </span>
                <p className="text-[10px] text-white/50 mt-1">
                    Approx. ₹29–32 Lakhs
                </p>
            </div>

            {/* CTA */}
            <div className="relative z-10 flex items-center justify-center px-3 shrink-0 pr-8">
                <Link
                    href="/contact"
                    className="bg-[#e8620a] hover:bg-[#c85508] active:scale-95 text-white text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                    Enroll →
                </Link>
            </div>
        </div>
    );
}