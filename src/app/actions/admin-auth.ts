"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export type AdminAuthState = {
  error?: string;
};

export async function loginAdmin(
  prevState: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  void prevState;

  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  if (!password) {
    return { error: "Enter the admin password." };
  }

  try {
    if (!isValidAdminPassword(password)) {
      return { error: "Incorrect password." };
    }
  } catch (error) {
    console.error("Admin auth is not configured:", error);
    return { error: "Admin access is not configured yet." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  redirect(redirectTo.startsWith("/") ? redirectTo : "/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/");
}
