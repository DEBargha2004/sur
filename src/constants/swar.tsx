import { segmentWords } from "@/lib/utils";
import { Swar } from "@/schema/sur";
import React from "react";

export const SWAR_SYMBOLS: Swar[] = [
  "সা",
  "সাঁ",
  "রে",
  "রে্",
  "রেঁ",
  "রে্ঁ",
  "গা",
  "গাঁ",
  "গা্",
  "গা্ঁ",
  "মা",
  "মাঁ",
  "র্মা",
  "র্মাঁ",
  "পা়",
  "পা",
  "পাঁ",
  "ধা়",
  "ধা",
  "ধা়্",
  "ধা্",
  "নি়",
  "নি",
  "নি়্",
  "নি্",
];

type SwarObj = {
  value: Swar;
  Render: React.ReactNode;
};

export const SWARS = {
  sudha_madha_sa: {
    value: "সা",
    Render: <span>সা</span>,
  },
  sudha_kori_sa: {
    value: "সাঁ",
    Render: <span>সাঁ</span>,
  },
  sudha_madha_re: {
    value: "রে",
    Render: <span>রে</span>,
  },
  sudha_kori_re: {
    value: "রেঁ",
    Render: <span>রেঁ</span>,
  },
  komal_madha_re: {
    value: "রে্",
    Render: <span>রে্</span>,
  },
  komal_kori_re: {
    value: "রে্ঁ",
    Render: <span>রে্ঁ</span>,
  },
  sudha_madha_ga: {
    value: "গা",
    Render: <span>গা</span>,
  },
  sudha_kori_ga: {
    value: "গাঁ",
    Render: <span>গাঁ</span>,
  },
  komal_madha_ga: {
    value: "গা্",
    Render: <span>গা্</span>,
  },
  komal_kori_ga: {
    value: "গা্ঁ",
    Render: <span>গা্ঁ</span>,
  },
  sudha_madha_ma: {
    value: "মা",
    Render: <span>মা</span>,
  },
  sudha_kori_ma: {
    value: "মাঁ",
    Render: <span>মাঁ</span>,
  },
  komal_madha_ma: {
    value: "র্মা",
    Render: <span>র্মা</span>,
  },
  komal_kori_ma: {
    value: "র্মাঁ",
    Render: <span>র্মাঁ</span>,
  },
  sudha_mandra_pa: {
    value: "পা়",
    Render: <span>পা়</span>,
  },
  sudha_madha_pa: {
    value: "পা",
    Render: <span>পা</span>,
  },
  sudha_kori_pa: {
    value: "পাঁ",
    Render: <span>পাঁ</span>,
  },
  sudha_mandra_dha: {
    value: "ধা়",
    Render: <span>ধা়</span>,
  },
  sudha_madha_dha: {
    value: "ধা",
    Render: <span>ধা</span>,
  },
  komal_mandra_dha: {
    value: "ধা়্",
    Render: <span>ধা়্</span>,
  },
  komal_madha_dha: {
    value: "ধা্",
    Render: <span>ধা্</span>,
  },
  sudha_mandra_ni: {
    value: "নি়",
    Render: <span>নি়</span>,
  },
  sudha_madha_ni: {
    value: "নি",
    Render: <span>নি</span>,
  },
  komal_mandra_ni: {
    value: "নি়্",
    Render: <span>নি়্</span>,
  },
  komal_madha_ni: {
    value: "নি্",
    Render: <span>নি্</span>,
  },
  "-": {
    //@ts-ignore
    value: "-",
    Render: <span>-</span>,
  },
} as const satisfies Record<string, SwarObj>;

export const getSwarObj = (swar: Swar) => {
  const swarSegments = segmentWords(swar).map(
    (s) =>
      Object.entries(SWARS).find(([_, { value }]) => value === s.segment)?.[1]
  );
  console.log(swarSegments);
  return swarSegments;
};
