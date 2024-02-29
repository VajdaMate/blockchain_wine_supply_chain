import { z } from "zod";

export const checkSchema = z.object({
	bottleID: z.string().min(3).max(16),
});

export type CheckSchema = typeof checkSchema;


