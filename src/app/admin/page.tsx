import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin-auth";
import { CopyAngelListButton } from "@/components/CopyAngelListButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isValidAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

type InvestorInterestRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string;
  country: string;
  referrer: string | null;
  amount_usd: string;
  capital_type: string;
  citizenship: string;
  not_restricted_country: boolean;
  is_accredited: boolean | null;
  consent_to_store: boolean;
};

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function badgeClassName(value: boolean) {
  return value
    ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    : "border border-white/10 bg-white/5 text-white/65";
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isValidAdminSessionToken(adminSession)) {
    redirect("/?admin=1");
  }

  const { db } = await import("@/lib/db/client");
  const submissions = await db<InvestorInterestRow[]>`
    SELECT
      id,
      created_at,
      full_name,
      email,
      phone,
      city,
      country,
      referrer,
      amount_usd,
      capital_type,
      citizenship,
      not_restricted_country,
      is_accredited,
      consent_to_store
    FROM investor_interest
    ORDER BY created_at DESC
  `;

  const totalCommitment = submissions.reduce(
    (sum, row) => sum + Number(row.amount_usd),
    0
  );
  const accreditedCount = submissions.filter((row) => row.is_accredited).length;
  const latestSubmission = submissions[0]?.created_at ?? null;

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#161616_0%,#090909_65%,#251b07_100%)] p-6 shadow-2xl md:flex-row md:items-end md:justify-between md:p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-pastel-orange">
              Admin dashboard
            </p>
            <h1 className="text-41 font-tobias font-700 leading-none text-white md:text-48">
              Investor interest responses
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-white/70">
              Live submissions from the `investor_interest` table for fnf.hemut.com.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CopyAngelListButton />
            <form action={logoutAdmin}>
              <Button type="submit" variant="secondary">
                Log out
              </Button>
            </form>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border border-white/10 bg-white/[0.03]">
            <CardContent className="space-y-2 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Total responses
              </p>
              <p className="text-41 font-tobias font-700 text-white">
                {submissions.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/[0.03]">
            <CardContent className="space-y-2 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Total indicated capital
              </p>
              <p className="text-41 font-tobias font-700 text-white">
                {formatCurrency(String(totalCommitment))}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/[0.03]">
            <CardContent className="space-y-2 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Accredited investors
              </p>
              <p className="text-41 font-tobias font-700 text-white">
                {accreditedCount}
              </p>
              <p className="text-sm text-white/55">
                {latestSubmission
                  ? `Latest submission ${formatDate(latestSubmission)}`
                  : "No submissions yet"}
              </p>
            </CardContent>
          </Card>
        </section>

        <Card className="overflow-hidden border border-white/10 bg-[#0d0d0d]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.22em] text-white/50">
                  <tr>
                    <th className="px-4 py-4">Submitted</th>
                    <th className="px-4 py-4">Name</th>
                    <th className="px-4 py-4">Contact</th>
                    <th className="px-4 py-4">Location</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Capital type</th>
                    <th className="px-4 py-4">Citizenship</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Referrer</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length ? (
                    submissions.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-white/6 align-top transition-colors hover:bg-white/[0.025]"
                      >
                        <td className="px-4 py-4 text-white/65">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-white">{row.full_name}</div>
                          <div className="mt-1 text-xs text-white/45">{row.id}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-white">{row.email}</div>
                          <div className="mt-1 text-white/55">
                            {row.phone || "No phone provided"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-white/75">
                          {row.city}, {row.country}
                        </td>
                        <td className="px-4 py-4 font-semibold text-pastel-orange">
                          {formatCurrency(row.amount_usd)}
                        </td>
                        <td className="px-4 py-4 text-white/75">{row.capital_type}</td>
                        <td className="px-4 py-4 text-white/75">{row.citizenship}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs ${badgeClassName(
                                row.is_accredited === true
                              )}`}
                            >
                              {row.is_accredited ? "Accredited" : "Not marked"}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs ${badgeClassName(
                                row.consent_to_store
                              )}`}
                            >
                              {row.consent_to_store ? "Consented" : "No consent"}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs ${badgeClassName(
                                row.not_restricted_country
                              )}`}
                            >
                              {row.not_restricted_country ? "Allowed country" : "Flag"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-white/55">
                          {row.referrer || "Direct"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-12 text-center text-sm text-white/55"
                      >
                        No responses have been recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
