import { redirect } from "next/navigation";

export const metadata = {
  title: "Job Tools Redirect | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default function JobSearchPage() {
  redirect("/job-tools");
}
