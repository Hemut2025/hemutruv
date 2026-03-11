"use client";

import { useActionState, useEffect, useState } from "react";
import { submitInterestForm, type InterestFormState } from "@/app/actions/submit-interest";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { InlineWidget } from "react-calendly";

const initialState: InterestFormState = {
    success: false,
};

export function InterestForm() {
    const [state, formAction, isPending] = useActionState(submitInterestForm, initialState);
    const [showCalendly, setShowCalendly] = useState(false);

    useEffect(() => {
        if (state.success) {
            setShowCalendly(true);
        }
    }, [state.success]);

    if (showCalendly) {
        return (
            <Card className="max-w-3xl mx-auto w-full border-border shadow-lg">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-pastel-orange/20 text-pastel-orange rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-24 font-tobias font-700 text-white">Interest Submitted Successfully</h3>
                    <p className="text-white-smoke-1 leading-28 font-oldschool-grotesk font-300 max-w-xl mx-auto">
                        Thank you for your interest in Hemut. We have recorded your information. Please use the widget below to schedule your 10-15 minute introductory call.
                    </p>

                    <div className="mt-8 w-full min-h-[600px] bg-white rounded-xl overflow-hidden border border-border">
                        <InlineWidget
                            url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/placeholder-hemut/15min"}
                            styles={{ height: "600px", width: "100%" }}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <section className="relative w-full py-20 bg-background" id="invest">
            {/* Background elements to match brand style */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/home-bg-1.png')" }}></div>

            <Card className="relative z-10 max-w-4xl mx-auto w-full border-border shadow-md bg-surface">
                <CardContent className="p-6 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-41 md:text-48 font-tobias font-700 text-white mb-2">Express Investment Interest</h2>
                        <p className="text-white-smoke-1 leading-24 font-oldschool-grotesk font-300">Please provide your details below. Institutional-grade confidentiality rules apply.</p>
                    </div>

                    <form action={formAction} className="space-y-8">
                        {/* Identity Section */}
                        <div className="space-y-4">
                            <h3 className="text-19 font-tobias font-700 text-white border-b border-border pb-2">1. Identity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input name="fullName" placeholder="Full Name *" required error={state.errors?.fullName?.[0]} />
                                <Input name="email" type="email" placeholder="Email Address *" required error={state.errors?.email?.[0]} />
                                <Input name="phone" type="tel" placeholder="Phone Number" error={state.errors?.phone?.[0]} />
                                <Input name="referrer" placeholder="Who introduced you?" error={state.errors?.referrer?.[0]} />
                                <Input name="city" placeholder="City *" required error={state.errors?.city?.[0]} />

                                <div className="w-full relative flex flex-col">
                                    <select name="country" required defaultValue="" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-orange appearance-none text-foreground">
                                        <option value="" disabled>Country of Residence *</option>
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {state.errors?.country && <span className="text-xs text-red-500 mt-1">{state.errors.country[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Investment Intent */}
                        <div className="space-y-4">
                            <h3 className="text-19 font-tobias font-700 text-white border-b border-border pb-2">2. Investment Intent</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                                    <Input name="amount" type="number" placeholder="Proposed Amount (USD) *" className="pl-7" required min="1000" error={state.errors?.amount?.[0]} />
                                </div>

                                <div className="w-full relative flex flex-col">
                                    <select name="capitalType" required defaultValue="" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-orange appearance-none text-foreground">
                                        <option value="" disabled>Capital Type *</option>
                                        <option value="Personal">Personal / Angel</option>
                                        <option value="Fund/Family Office">Fund / Family Office</option>
                                    </select>
                                    {state.errors?.capitalType && <span className="text-xs text-red-500 mt-1">{state.errors.capitalType[0]}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Background */}
                        <div className="space-y-4">
                            <h3 className="text-19 font-tobias font-700 text-white border-b border-border pb-2">3. Background</h3>
                            <div className="space-y-4">
                                <div className="w-full relative flex flex-col">
                                    <textarea name="background" required placeholder="Short professional background (e.g. Current role, prior exits, thesis focus) *" className="flex min-h-[100px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-orange resize-none p-4 placeholder:text-slate-500 text-foreground"></textarea>
                                    {state.errors?.background && <span className="text-xs text-red-500 mt-1">{state.errors.background[0]}</span>}
                                </div>
                                <div className="w-full relative flex flex-col">
                                    <textarea name="howCanHelp" placeholder="How might you help Hemut? (Optional) - Networks, expertise, recruiting, etc." className="flex min-h-[100px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-orange resize-none p-4 placeholder:text-slate-500 text-foreground"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Compliance */}
                        <div className="space-y-4">
                            <h3 className="text-19 font-tobias font-700 text-white border-b border-border pb-2">4. Compliance & Consent</h3>

                            <div className="w-full md:w-1/2 relative flex flex-col mb-6">
                                <select name="citizenship" required defaultValue="" className="flex h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-orange appearance-none text-foreground">
                                    <option value="" disabled>Country of Citizenship *</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="Other">Other</option>
                                </select>
                                {state.errors?.citizenship && <span className="text-xs text-red-500 mt-1">{state.errors.citizenship[0]}</span>}
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" name="notRestrictedCountry" required className="mt-1 w-4 h-4 rounded border-gray-300 text-pastel-orange-1 focus:ring-brand-500" />
                                    <span className="text-15 text-white-smoke font-oldschool-grotesk font-300 group-hover:text-foreground transition-colors">
                                        I am not a citizen, resident, or entity of any US-designated country of concern (e.g., China, Iran, Syria, Russia, etc.). *
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" name="isAccredited" className="mt-1 w-4 h-4 rounded border-gray-300 text-pastel-orange-1 focus:ring-brand-500" />
                                    <span className="text-15 text-white-smoke font-oldschool-grotesk font-300 group-hover:text-foreground transition-colors">
                                        I am an accredited investor under US Securities Law. (Optional, speeds up RUV allocation)
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" name="consentToStore" required className="mt-1 w-4 h-4 rounded border-gray-300 text-pastel-orange-1 focus:ring-brand-500" />
                                    <span className="text-15 text-white-smoke font-oldschool-grotesk font-300 group-hover:text-foreground transition-colors">
                                        I consent to Hemut storing and using this information to contact me regarding this investment opportunity. *
                                    </span>
                                </label>
                            </div>

                            {state.errors?.notRestrictedCountry && <span className="text-xs text-red-500 block">{state.errors.notRestrictedCountry[0]}</span>}
                            {state.errors?.consentToStore && <span className="text-xs text-red-500 block">{state.errors.consentToStore[0]}</span>}
                        </div>

                        <div className="pt-6 border-t border-border flex items-center justify-between">
                            <span className="text-xs text-slate-500">Fields marked with * are required.</span>
                            <Button type="submit" size="lg" disabled={isPending} className="w-full md:w-auto px-8">
                                {isPending ? "Submitting securely..." : "Submit Interest"}
                            </Button>
                        </div>

                        {state.message && !state.success && (
                            <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center">
                                {state.message}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
