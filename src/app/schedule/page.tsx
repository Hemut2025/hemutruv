"use client";

import { InlineWidget } from "react-calendly";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SchedulePage() {
    // Use a fallback URL if the env variable isn't set yet for local dev
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/cheema-hemut/coffee-chat";

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col">
            <header className="w-full py-6 px-4 md:px-8 border-b border-brand-slate">
                <Link
                    href="/"
                    className="inline-flex items-center text-slate-400 hover:text-brand-yellow transition-colors text-sm font-bold"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Hemut
                </Link>
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-4 flex flex-col pt-8">
                <div className="text-center mb-8 space-y-4">
                    <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-pastel-orange">
                        Schedule a Call
                    </h1>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto">
                        Book 15 minutes with our team to discuss the Friends & Family round, the Hemut direct network, and enterprise deployment.
                    </p>
                </div>

                <div className="w-full h-[800px] md:h-[1000px] relative">
                    <InlineWidget
                        url={calendlyUrl}
                        styles={{ height: "100%", width: "100%" }}
                    />
                </div>
            </main>
        </div>
    );
}
