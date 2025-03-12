import { Swar, Translation } from "@/schema/sur";
import { SWARS } from "../swar";

export const bibhas: Record<Translation, Swar[]> = {
  aroha: [
    SWARS.sudha_madha_sa.value,
    SWARS.komal_madha_re.value,
    SWARS.sudha_madha_ga.value,
    SWARS.sudha_madha_pa.value,
    SWARS.komal_madha_dha.value,
    SWARS.sudha_kori_sa.value,
  ],
  avoroha: [
    SWARS.sudha_kori_sa.value,
    SWARS.komal_madha_dha.value,
    SWARS.sudha_madha_pa.value,
    SWARS.sudha_madha_ga.value,
    SWARS.komal_madha_re.value,
    SWARS.sudha_madha_sa.value,
  ],
};
