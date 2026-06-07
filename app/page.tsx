import { redirect } from "next/navigation";

// Default locale is Hebrew.
export default function RootPage() {
  redirect("/he");
}
