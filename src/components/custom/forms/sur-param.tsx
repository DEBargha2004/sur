import { Button } from "@/components/ui/button";
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
import { raagObj } from "@/constants/raag";
import { TSurSchema } from "@/schema/sur";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function SurParamForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<TSurSchema>>;
  onSubmit: (data: TSurSchema) => void;
}) {
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
        <FormField
          control={form.control}
          name="raag"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Raag</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
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
  );
}
