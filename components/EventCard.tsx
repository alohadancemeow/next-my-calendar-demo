"use client";

import { cn } from "@/lib/utils";
import { CopyEventButton } from "./CopyEventButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatEventDescription } from "@/lib/formatters";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  const router = useRouter();

  return (
    <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
      <div
        className={cn(
          "flex flex-col cursor-pointer",
          !isActive && "cursor-not-allowed"
        )}
        onClick={() => {
          if (isActive) router.push(`/book/${clerkUserId}/${id}`);
        }}
      >
        <CardHeader className={cn(!isActive && "opacity-50")}>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {formatEventDescription(durationInMinutes)}
          </CardDescription>
        </CardHeader>
        {description != null && (
          <CardContent className={cn(!isActive && "opacity-50")}>
            {description}
          </CardContent>
        )}
      </div>
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EventCard;
