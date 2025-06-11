import { z } from "zod";

export const eventFormSchema = z
  .object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().optional(),
    isActive: z.boolean(),
    durationInMinutes: z.coerce
      .number()
      .int("Duration must be a whole number")
      .positive("Duration must be greater than 0")
      .max(60 * 12, `Duration must be less than 12 hours (${60 * 12} minutes)`)
      .refine(
        (val) => val % 5 === 0,
        "Duration must be in 5-minute increments"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.durationInMinutes < 15) {
      ctx.addIssue({
        code: "custom",
        message: "Duration must be at least 15 minutes",
        path: ["durationInMinutes"],
      });
    }
  });
