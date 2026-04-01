"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AdminEntry } from "./AdminEntry";

type HeroProps = {
    defaultAdminOpen?: boolean;
};

export function Hero({ defaultAdminOpen = false }: HeroProps) {
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
    const copyTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Only autoplay the background video (desktop only via CSS hidden md:block)
        const video = bgVideoRef.current;
        if (!video) return;

        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('playsinline', '');
        video.muted = true;

        const tryPlay = () => video.play().catch(() => {});

        if (video.readyState >= 3) {
            tryPlay();
        } else {
            video.addEventListener('canplay', tryPlay, { once: true });
        }

        return () => video.removeEventListener('canplay', tryPlay);
    }, []);

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    async function handleCopyAngelListLink() {
        try {
            await navigator.clipboard.writeText("https://angellist.com/i/Biwgd");
            setCopyStatus("copied");
        } catch {
            setCopyStatus("failed");
        }

        if (copyTimeoutRef.current) {
            window.clearTimeout(copyTimeoutRef.current);
        }

        copyTimeoutRef.current = window.setTimeout(() => {
            setCopyStatus("idle");
        }, 2000);
    }

    return (
        <section className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-4 bg-background overflow-hidden min-h-screen">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
                {/* Video: desktop only */}
                <video ref={bgVideoRef} src="/Hero_Home_Page.mp4" autoPlay loop muted playsInline preload="auto" className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-60"></video>
                {/* Static fallback: mobile only */}
                <img src="/home-bg-2.png" alt="" aria-hidden="true" className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-background/40"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent to-background/90"></div>
            </div>

            {/* Header Logos */}
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-20 w-full max-w-7xl mx-auto">
                <img src="/hemut-logo-v2.png" alt="Hemut" className="h-8 md:h-12 object-contain" />
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-white-smoke-1 text-xs md:text-sm font-oldschool-grotesk font-500 uppercase tracking-widest">Backed by</span>
                        <img src="/yc-logo.png" alt="Y Combinator" className="h-8 md:h-12 object-contain" />
                    </div>
                    <AdminEntry defaultOpen={defaultAdminOpen} />
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out mt-12 md:mt-0">
                <h1 className="text-48 md:text-72 font-tobias font-700 tracking-tight text-white leading-60 md:leading-79">
                    Invest in the Driver Network{" "}
                    <span className="block text-pastel-orange mt-2">for Direct Freight</span>
                </h1>

                <p className="text-19 md:text-21 text-white-smoke-1 max-w-2xl mx-auto leading-28 font-oldschool-grotesk font-300">
                    Eliminate freight middlemen. Return margin back to drivers and shippers. <br /><span className="text-16 opacity-80">Stop brokers from capturing 15-30% just for passing information.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="w-full sm:w-auto font-600 bg-pastel-orange text-black hover:bg-pastel-orange-1 font-oldschool-grotesk" onClick={() => document.getElementById('invest')?.scrollIntoView({ behavior: 'smooth' })}>
                        Express Interest
                    </Button>
                    <Link href="/schedule" className="w-full sm:w-auto">
                        <Button size="lg" variant="secondary" className="w-full font-600 font-oldschool-grotesk text-white border-border hover:bg-white/5 bg-transparent">
                            Schedule a Call
                        </Button>
                    </Link>
                    <Button
                        type="button"
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto font-600 font-oldschool-grotesk text-white border-border hover:bg-white/5 bg-transparent"
                        onClick={handleCopyAngelListLink}
                    >
                        {copyStatus === "copied"
                            ? "Copied AngelList link"
                            : copyStatus === "failed"
                              ? "Copy failed"
                              : "Copy angellist link"}
                    </Button>
                </div>
            </div>

            {/* Founder Video */}
            <div className="mt-16 relative z-10 w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
                <video
                    className="w-full h-full object-cover"
                    poster="/founder-poster.jpg"
                    controls
                    playsInline
                    preload="metadata"
                >
                    <source src="/founder-video.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    );
}
