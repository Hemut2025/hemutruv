"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAdmin, type AdminAuthState } from "@/app/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AdminAuthState = {};

type AdminEntryProps = {
  defaultOpen?: boolean;
};

export function AdminEntry({ defaultOpen = false }: AdminEntryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="border border-white/20 bg-black/20 px-4 text-white backdrop-blur-sm hover:bg-white/10"
        onClick={() => setIsOpen(true)}
      >
        Admin
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-[#111111] p-6 shadow-2xl">
            <div className="mb-5 space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-pastel-orange">
                Protected Access
              </p>
              <h3 className="text-24 font-tobias font-700 text-white">
                Admin dashboard
              </h3>
              <p className="text-sm leading-6 text-white/70">
                Enter the password to view the investor signup table.
              </p>
            </div>

            <form action={formAction} className="space-y-4">
              <input type="hidden" name="redirectTo" value="/admin" />
              <Input
                name="password"
                type="password"
                placeholder="Admin password"
                autoFocus
                required
                error={state.error}
                className="bg-black/40"
              />

              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-white/75 hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Checking..." : "Open admin"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
