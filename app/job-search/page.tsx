import { redirect } from "next/navigation";

export const metadata = {
  title: "Jobs Admin Redirect | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default function JobSearchPage() {
  redirect("/admin/jobs");
}
