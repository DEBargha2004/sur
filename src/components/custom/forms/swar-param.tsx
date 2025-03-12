import { Button } from "@/components/ui/button";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Raag, raag, raagObj } from "@/constants/raag";
import { SWAR_SYMBOLS } from "@/constants/swar";
import { useStore } from "@/lib/store";
import { swarPattern } from "@/lib/swar-pattern";
import {
  defaultSurSchema,
  surParamSchema,
  Swar,
  TSurSchema,
} from "@/schema/sur";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SurParamForm() {
  const [raagId, setRaagId] = useState<Raag>("default");
  const form = useForm<TSurSchema>({
    resolver: zodResolver(surParamSchema),
    defaultValues: defaultSurSchema,
  });

  const { setSwarArray, resetPage } = useStore();

  const onSubmit = async (data: TSurSchema) => {
    const sequence = data.notes as Swar[];

    const swars = (await swarPattern({
      matra: Number(data.matra),
      raag: sequence,
    })) as string[][];
    setSwarArray(swars);
    resetPage();
  };

  useEffect(() => {
    const notes = raagId === "custom" ? [] : raag[raagId].aroha;

    form.setValue("notes", notes);
  }, [raagId]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start gap-6"
      >
        <FormField
          control={form.control}
          name="matra"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Matra{" "}
                <i>
                  (More Matra will lead to more combinations, but will take more
                  time)
                </i>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="w-full">
          <FormLabel>Raag</FormLabel>
          <FormControl>
            <Select value={raagId} onValueChange={(e) => setRaagId(e as Raag)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {raagObj.map((rg) => (
                  <SelectItem key={rg.value} value={rg.value}>
                    {rg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
        <FancyMultiSelect
          list={SWAR_SYMBOLS.map((swar) => ({
            label: swar,
            value: swar,
          }))}
          selected={form.watch("notes").map((swar) => ({
            label: swar,
            value: swar,
          }))}
          onSelect={(selected) => {
            form.setValue(
              "notes",
              selected.map((s) => s.value)
            );
          }}
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
  );
}
