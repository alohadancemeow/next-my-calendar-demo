import { NavLink } from "@/components/NavLink";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarRange } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <>
      <header className="flex py-2 border-b bg-card">
        <nav className="font-medium flex items-center text-sm gap-6 container m-auto">
          <div className="flex items-center gap-2 font-semibold mr-auto">
            <CalendarRange className="size-6" />
            <Link href="/">
              <span className="sr-only md:not-sr-only">My Calendar</span>
            </Link>
          </div>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/availability">Availability</NavLink>
          <NavLink href={`/book/${userId}`}>Schedule</NavLink>
          <div className="ml-auto size-10">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-full" } }}
            />
          </div>
        </nav>
      </header>
      <main className="container my-6 m-auto">{children}</main>
    </>
  );
}
