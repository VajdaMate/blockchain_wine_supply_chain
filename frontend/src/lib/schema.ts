import { z } from "zod";

export const checkSchema = z.object({
	bottleID: z.string().min(1).max(4),
});

export type CheckSchema = typeof checkSchema;

export const checkFields= ["BottleID","Type of Grape","Sunny Hours","Time of Harvest","Time of Bottling"]

export const registerSchema=z.object({
	typeOfGrape: z.string().min(3).max(16),
	sunnyHours: z.string().min(2).max(5),
	timeOfHarvest: z.string().min(6).max(100),
	timeOfBottling: z.string().min(6).max(100),
});

export type RegisterSchema = typeof registerSchema;

export const updateSchema=z.object({
	typeOfGrape: z.string().min(3).max(16),
	sunnyHours: z.string().min(2).max(5),
	timeOfHarvest: z.string().min(6).max(100),
	timeOfBottling: z.string().min(6).max(100),
});
export type UpdateSchema = typeof updateSchema;




