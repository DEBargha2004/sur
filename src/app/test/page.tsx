"use client";

import { Sur, surPattern } from "@/lib/sur-pattern";
import { defaultSurSchema, surParamSchema, TSurSchema } from "@/schema/sur";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [surArray, setSurArray] = useState<Sur[][]>([]);

  const form = useForm<TSurSchema>({
    resolver: zodResolver(surParamSchema),
    defaultValues: defaultSurSchema,
  });

  const onSubmit = async (data: TSurSchema) => {
    const surs = await surPattern({ matra: Number(data.matra) });
    setSurArray(surs);
  };
  return (
    <main className="p-5 space-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-start gap-6"
        >
          <FormField
            control={form.control}
            name="matra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Matra{" "}
                  <i>
                    (More Matra will lead to more combinations, but will take
                    more time)
                  </i>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span>Generate</span>
            )}
          </Button>
        </form>
      </Form>
      <div className="space-y-6">
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
      </div>
    </main>
  );
}
