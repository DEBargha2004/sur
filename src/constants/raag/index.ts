import { Swar, Translation } from "@/schema/sur";
import { bhupali } from "./bhupali";
import { jayat } from "./jayat";
import { defaultRaag } from "./default";

export const raag = {
  bhupali,
  default: defaultRaag,
  jayat,
} as const satisfies Record<string, Record<Translation, Swar[]>>;

export type Raag = keyof typeof raag | "custom";

export const raagObj: { value: Raag; label: string }[] = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "custom",
    label: "Custom",
  },
  {
    value: "bhupali",
    label: "Bhupali",
  },
  {
    value: "jayat",
    label: "Jayat",
  },
];
