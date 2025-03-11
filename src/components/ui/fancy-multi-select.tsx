"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type TMultiSelectItem = Record<"value" | "label", string>;

export function FancyMultiSelect({
  list = [],
  onSelect,
  selected = [],
}: {
  list: TMultiSelectItem[];
  selected: TMultiSelectItem[];
  onSelect: (selected: TMultiSelectItem[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [localSelected, setLocalSelected] =
    React.useState<TMultiSelectItem[]>(selected);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (li: TMultiSelectItem) => {
    const newSelected = localSelected.filter((s) => s.value !== li.value);
    onSelect(newSelected);
    setLocalSelected(newSelected);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          const newSelected = [...localSelected];
          newSelected.pop();
          onSelect(newSelected);
          setLocalSelected(newSelected);
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  };

  React.useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const selectables = list.filter(
    (li) => !localSelected.some((ls) => ls.value === li.value)
  );

  // console.log({ list, selected, selectables, localSelected });

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
        <div className="flex flex-wrap gap-1">
          {localSelected.map((li) => {
            return (
              <Badge key={li.value} variant="secondary">
                {li.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(li);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(li)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select swars..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="max-h-60 overflow-y-auto">
                {selectables.map((li) => {
                  return (
                    <CommandItem
                      key={li.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        const newSelected = [...localSelected, li];
                        setLocalSelected(newSelected);
                        onSelect(newSelected);
                      }}
                      className={"cursor-pointer"}
                    >
                      {li.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
