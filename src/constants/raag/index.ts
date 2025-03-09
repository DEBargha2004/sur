import { Sur, Translation } from "@/schema/sur";
import { bhupali } from "./bhupali";
import { jayat } from "./jayat";
import { defaultRaag } from "./default";

export const raag = {
  bhupali,
  default: defaultRaag,
  jayat,
} as const satisfies Record<string, Record<Translation, Sur[]>>;

export type Raag = keyof typeof raag;

export const raagObj: { value: Raag; label: string }[] = [
  {
    value: "default",
    label: "Default",
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
