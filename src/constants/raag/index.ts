import { Swar, Translation } from "@/schema/sur";
import { bhupali } from "./bhupali";
import { jayat } from "./jayat";
import { defaultRaag } from "./default";
import { bhupalTori } from "./bhupal-tori";
import { shivRanjani } from "./shib-ranjani";
import { bibhas } from "./bibhas";
import { durga } from "./durga";

export const raag = {
  bhupali,
  default: defaultRaag,
  jayat,
  bhupalTori,
  shivRanjani,
  bibhas,
  durga,
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
  {
    value: "bhupalTori",
    label: "Bhupal Tori",
  },
  {
    value: "shivRanjani",
    label: "Shiv Ranjani",
  },
  {
    value: "bibhas",
    label: "Bibhas",
  },
  {
    value: "durga",
    label: "Durga",
  },
];
