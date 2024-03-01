import { z } from "zod";

export const checkSchema = z.object({
	bottleID: z.string().min(3).max(16),
});

export type CheckSchema = typeof checkSchema;

export const registerSchema=z.object({
	typeOfGrape: z.string().min(3).max(16),
	sunnyHours: z.string().min(2).max(5),
	timeOfHarvest: z.string().min(6).max(100),
	timeOfBottling: z.string().email(),
});

export type RegisterSchema = typeof registerSchema;

