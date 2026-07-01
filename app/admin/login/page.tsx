import { Suspense } from "react";

import { AdminLoginForm } from "./admin-login-form";

export const metadata = {
  title: "Admin Login | WertWorks",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <section className="section-shell flex min-h-[70vh] items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card/75 p-6 shadow-radar">
            <p className="text-sm text-muted-foreground">
              Loading admin login...
            </p>
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </section>
  );
}