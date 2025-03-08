import * as z from "zod";

export const surParamSchema = z.object({
  matra: z.string().min(1),
});

export type TSurSchema = z.infer<typeof surParamSchema>;
export const defaultSurSchema: TSurSchema = { matra: "1" };

// export type Sur = "সা" | "রে" | "গা" | "মা" | "পা" | "ধা" | "নি" | "সাঁ";
