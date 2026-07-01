import { redirect } from "next/navigation";

export const metadata = {
  title: "Internal Tools Redirect | WertWorks",
  robots: {
    index: false,
    follow: false
  }
};

export default function JobSearchPage() {
  redirect("/job-tools");
}
