import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Calendar } from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId != null) redirect("/events");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Calendar className="size-4" />
          </div>
          My Calendar.
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
