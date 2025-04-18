import { raagObj } from "@/constants/raag";
import * as z from "zod";

export const surParamSchema = z.object({
  matra: z.string().min(1),
  notes: z.array(z.string()),
});

export type TSurSchema = z.infer<typeof surParamSchema>;
export const defaultSurSchema: TSurSchema = {
  matra: "1",
  notes: [],
};
export type Translation = "aroha" | "avoroha";

export type Swar =
  | "পা়"
  | "পা"
  | "পাঁ"
  | "ধা়"
  | "ধা"
  | "ধা্"
  | "ধা়্"
  | "নি়"
  | "নি"
  | "নি়্"
  | "নি্"
  | "সা"
  | "সাঁ"
  | "রে"
  | "রেঁ"
  | "রে্"
  | "রে্ঁ"
  | "গা"
  | "গাঁ"
  | "গা্"
  | "গা্ঁ"
  | "মা"
  | "মাঁ"
  | "র্মা"
  | "র্মাঁ";
