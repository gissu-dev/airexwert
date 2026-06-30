import { redirect } from "next/navigation";

export default function RedirectedBackgroundPage() {
  redirect("/about");
}
