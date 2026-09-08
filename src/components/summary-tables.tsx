"use client";

import { useState } from "react";
import type { SummaryTable } from "@/lib/neuro-units";

type SummaryTablesProps = {
  tables: SummaryTable[];
};

export function SummaryTables({ tables }: SummaryTablesProps) {
  const [testingTables, setTestingTables] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-5 space-y-5">
      {tables.map((table, tableIndex) => {
        const isTesting = Boolean(testingTables[tableIndex]);

        return (
          <div className="overflow-hidden border border-slate-300" key={table.title}>
            <div className="flex items-center justify-between border-b border-slate-300 bg-white px-4 py-2 text-xs font-semibold">
              <h3 className="text-sky-600">{table.title}</h3>
              <button
                className="text-slate-700 underline underline-offset-2 hover:text-[#aa0000]"
                onClick={() => setTestingTables((current) => ({ ...current, [tableIndex]: !isTesting }))}
                type="button"
              >
                {isTesting ? "Mostrar respostas" : "Teste da tabela"}
              </button>
            </div>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {table.rows.map((row) => (
                  <tr className="border-b border-slate-300 last:border-b-0" key={row.label}>
                    <th className="w-[28%] border-r border-slate-300 bg-slate-50 p-3 text-left align-top font-semibold text-slate-800">
                      {row.label}
                    </th>
                    <td className="p-3 align-top leading-6 text-slate-700">
                      <span className={isTesting ? "block select-none whitespace-pre-line blur-[3px]" : "block whitespace-pre-line"}>
                        {row.value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
