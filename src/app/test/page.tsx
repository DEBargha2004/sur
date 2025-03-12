"use client";

import SurParamForm from "@/components/custom/forms/swar-param";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { getSwarObj } from "@/constants/swar";
import { Swar } from "@/schema/sur";
import React from "react";

const MAX_PER_PAGE = 1000;

export default function Page() {
  const { swarArray, currentPage, setCurrentPage } = useStore();

  const currentPageSurs = swarArray.slice(
    currentPage * MAX_PER_PAGE,
    (currentPage + 1) * MAX_PER_PAGE
  );

  const goTo = (index: number) => {
    if (index >= 0 && index <= Math.floor(swarArray.length / MAX_PER_PAGE)) {
      setCurrentPage(index);
    }
  };

  const [currRangeStart, currRangeEnd] = [
    Math.min(MAX_PER_PAGE * currentPage + 1, swarArray.length),
    Math.min(MAX_PER_PAGE * (currentPage + 1), swarArray.length),
  ];
  return (
    <main className="p-5 space-y-10">
      <section className="sm:w-1/2 md:w-1/3 xl:w-1/4">
        <SurParamForm />
      </section>
      <section className="space-y-6">
        <h1 className="text-xl font-medium">
          {formatNumber(currRangeStart)} - {formatNumber(currRangeEnd)} of&nbsp;
          {formatNumber(swarArray.length)} combinations
        </h1>
        <ol className="space-y-5">
          {currentPageSurs.map((s, i) => (
            <li key={i} className="flex justify-start items-start gap-4">
              <p>{MAX_PER_PAGE * currentPage + i + 1}.</p>
              <div className="flex flex-wrap gap-4 gap-y-2">
                {s.map((swar, j) => (
                  <p
                    key={j}
                    className="inline-block border-b-2 px-2 py-1 rounded-xl whitespace-nowrap"
                  >
                    {/* {getSwarObj(swar as Swar)?.map((s, index) => (
                      <React.Fragment key={`${j}-${index}`}>
                        {s?.Render}
                      </React.Fragment>
                    ))} */}
                    {swar}
                  </p>
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
