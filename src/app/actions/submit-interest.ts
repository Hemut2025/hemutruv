"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";

const formSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    referrer: z.string().optional(),
    amount: z.number(),
    capitalType: z.enum(["Personal", "Fund/Family Office"]),
    background: z.string().min(10, "Please provide a brief background"),
    howCanHelp: z.string().optional(),
    citizenship: z.string().min(1, "Citizenship country is required"),
    notRestrictedCountry: z.boolean().refine((val) => val === true, {
        message: "You must confirm you are not from a restricted country."
    }),
    isAccredited: z.boolean().optional(),
    consentToStore: z.boolean().refine((val) => val === true, {
        message: "You must consent to data storage to proceed."
    }),
});

export type InterestFormState = {
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
};

export async function submitInterestForm(
    prevState: InterestFormState,
    formData: FormData
): Promise<InterestFormState> {
    void prevState;

    const rawData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        city: formData.get("city"),
        country: formData.get("country"),
        referrer: formData.get("referrer"),
        amount: formData.get("amount") ? Number(formData.get("amount")) : undefined,
        capitalType: formData.get("capitalType"),
        background: formData.get("background"),
        howCanHelp: formData.get("howCanHelp"),
        citizenship: formData.get("citizenship"),
        notRestrictedCountry: formData.get("notRestrictedCountry") === "on",
        isAccredited: formData.get("isAccredited") === "on",
        consentToStore: formData.get("consentToStore") === "on",
    };

    const parsed = formSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
            message: "Please fix the errors in the form.",
        };
    }

    const normalizedData = {
        fullName: parsed.data.fullName.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        phone: parsed.data.phone?.trim() || null,
        city: parsed.data.city.trim(),
        country: parsed.data.country.trim(),
        referrer: parsed.data.referrer?.trim() || null,
        amountUsd: parsed.data.amount.toFixed(2),
        capitalType: parsed.data.capitalType,
        background: parsed.data.background.trim(),
        howCanHelp: parsed.data.howCanHelp?.trim() || null,
        citizenship: parsed.data.citizenship.trim(),
        notRestrictedCountry: parsed.data.notRestrictedCountry,
        isAccredited: parsed.data.isAccredited ?? null,
        consentToStore: parsed.data.consentToStore,
    };

    try {
        await db`
            INSERT INTO investor_interest (
                full_name,
                email,
                phone,
                city,
                country,
                referrer,
                amount_usd,
                capital_type,
                background,
                how_can_help,
                citizenship,
                not_restricted_country,
                is_accredited,
                consent_to_store
            )
            VALUES (
                ${normalizedData.fullName},
                ${normalizedData.email},
                ${normalizedData.phone},
                ${normalizedData.city},
                ${normalizedData.country},
                ${normalizedData.referrer},
                ${normalizedData.amountUsd},
                ${normalizedData.capitalType},
                ${normalizedData.background},
                ${normalizedData.howCanHelp},
                ${normalizedData.citizenship},
                ${normalizedData.notRestrictedCountry},
                ${normalizedData.isAccredited},
                ${normalizedData.consentToStore}
            )
        `;
    } catch (error) {
        console.error("Failed to store investor interest submission:", error);
        return {
            success: false,
            message: "We could not submit your interest right now. Please try again shortly.",
        };
    }

    return {
        success: true,
        message: "Thank you for your interest. We will be in touch shortly.",
    };
}
