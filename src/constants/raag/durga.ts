import { Swar, Translation } from "@/schema/sur";
import { SWARS } from "../swar";

export const durga: Record<Translation, Swar[]> = {
  aroha: [
    SWARS.sudha_madha_sa.value,
    SWARS.sudha_madha_re.value,
    SWARS.sudha_madha_ma.value,
    SWARS.sudha_madha_pa.value,
    SWARS.sudha_madha_dha.value,
    SWARS.sudha_kori_sa.value,
  ],
  avoroha: [
    SWARS.sudha_kori_sa.value,
    SWARS.sudha_madha_dha.value,
    SWARS.sudha_madha_pa.value,
    SWARS.sudha_madha_ma.value,
    SWARS.sudha_madha_re.value,
    SWARS.sudha_madha_sa.value,
  ],
};
