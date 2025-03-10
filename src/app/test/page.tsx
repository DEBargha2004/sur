"use client";

import { surPattern } from "@/lib/sur-pattern";
import { defaultSurSchema, surParamSchema, TSurSchema } from "@/schema/sur";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SurParamForm from "@/components/custom/forms/sur-param";
import { Raag, raag } from "@/constants/raag";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MAX_PER_PAGE = 1000;

export default function Page() {
  const [surArray, setSurArray] = useState<string[][]>([]);

  const form = useForm<TSurSchema>({
    resolver: zodResolver(surParamSchema),
    defaultValues: defaultSurSchema,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageSurs = surArray.slice(
    currentPage * MAX_PER_PAGE,
    (currentPage + 1) * MAX_PER_PAGE
  );

  const onSubmit = async (data: TSurSchema) => {
    const sequence = raag[data.raag as Raag].aroha;

    const surs = await surPattern({
      matra: Number(data.matra),
      raag: sequence,
    });
    setSurArray(surs);
    setCurrentPage(0);
  };

  const goTo = (index: number) => {
    if (index >= 0 && index <= Math.floor(surArray.length / MAX_PER_PAGE)) {
      setCurrentPage(index);
    }
  };

  const [currRangeStart, currRangeEnd] = [
    Math.min(MAX_PER_PAGE * currentPage + 1, surArray.length),
    Math.min(MAX_PER_PAGE * (currentPage + 1), surArray.length),
  ];
  return (
    <main className="p-5 space-y-10">
      <section className="sm:w-1/2 md:w-1/3 xl:w-1/4">
        <SurParamForm form={form} onSubmit={onSubmit} />
      </section>
      <section className="space-y-6">
        <h1 className="text-xl font-medium">
          {formatNumber(currRangeStart)} - {formatNumber(currRangeEnd)}/
          {formatNumber(surArray.length)} combinations
        </h1>
        <ol className="space-y-5">
          {currentPageSurs.map((s, i) => (
            <li key={i} className="flex justify-start items-start gap-4">
              <p>{MAX_PER_PAGE * currentPage + i + 1}.</p>
              <div className="flex flex-wrap gap-4 gap-y-2">
                {s.map((sur, j) => (
                  <span
                    key={j}
                    className="inline-block border-b-2 px-2 py-1 rounded-xl whitespace-nowrap"
                  >
                    {sur}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex gap-4">
          <Button onClick={() => goTo(currentPage - 1)}>Prev</Button>
          <Button onClick={() => goTo(currentPage + 1)}>Next</Button>
        </div>
      </section>
    </main>
  );
}
