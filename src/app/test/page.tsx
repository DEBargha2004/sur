"use client";

import { surPattern } from "@/lib/sur-pattern";
import { defaultSurSchema, surParamSchema, TSurSchema } from "@/schema/sur";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SurParamForm from "@/components/custom/forms/sur-param";
import { Raag, raag } from "@/constants/raag";

export default function Page() {
  const [surArray, setSurArray] = useState<string[][]>([]);

  const form = useForm<TSurSchema>({
    resolver: zodResolver(surParamSchema),
    defaultValues: defaultSurSchema,
  });

  const onSubmit = async (data: TSurSchema) => {
    const sequence = raag[data.raag as Raag].aroha;

    const surs = await surPattern({
      matra: Number(data.matra),
      raag: sequence,
    });
    setSurArray(surs);
  };
  return (
    <main className="p-5 space-y-10">
      <section className="sm:w-1/2 md:w-1/3 xl:w-1/4">
        <SurParamForm form={form} onSubmit={onSubmit} />
      </section>
      <section className="space-y-6">
        <h1 className="text-xl font-medium">{surArray.length} combinations</h1>
        <ol className="space-y-5">
          {surArray.map((s, i) => (
            <li key={i} className="flex justify-start items-start gap-4">
              <p>{i + 1}.</p>
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
      </section>
    </main>
  );
}
