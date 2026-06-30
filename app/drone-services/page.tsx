import { redirect } from "next/navigation";

export const metadata = {
  title: "Aerial Planning Redirect | WertWorks",
  robots: {
    index: false,
    follow: true
  }
};

export default function DroneServicesRedirectPage() {
  redirect("/aerial-planning");
}
