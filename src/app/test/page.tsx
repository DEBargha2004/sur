import { surPattern } from "@/lib/sur-pattern";

export default function Page() {
  return (
    <div className="space-y-1.5 p-5">
      {surPattern().map((s, i) => (
        <div key={i} className="flex justify-start items-center gap-4">
          <span>{i + 1}.</span>
          {s.map((sur, j) => (
            <span
              key={j}
              className="inline-block border-b-2 px-2 py-1 rounded-xl"
            >
              {sur}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
