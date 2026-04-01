## Getting Started

Set these environment variables before running or deploying:

```bash
DATABASE_URL=postgres://...
# Optional if you use a separate direct connection for migrations/admin reads
DIRECT_URL=postgres://...

# Required for the protected /admin dashboard
ADMIN_PASSWORD=choose-a-strong-password
# Optional, but recommended so sessions stay valid if you rotate ADMIN_PASSWORD
ADMIN_SESSION_SECRET=another-long-random-string
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000`.

## Deploy on Vercel

Add the same environment variables in the Vercel project settings before deploying. The public homepage form and the `/admin` dashboard both use the same Supabase-backed Postgres database connection.

The admin flow is:

1. Click the `Admin` button on the homepage.
2. Enter `ADMIN_PASSWORD`.
3. View the protected table at `/admin`.
