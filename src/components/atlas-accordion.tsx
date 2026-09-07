"use client";

import { useState } from "react";
import { AtlasGallery } from "@/components/atlas-gallery";

type AtlasAccordionProps = {
  sections: {
    title: string;
    items: { imageUrl: string; label: string; subtitle?: string; description?: string; synonyms?: string }[];
  }[];
};

export function AtlasAccordion({ sections }: AtlasAccordionProps) {
  const [openSection, setOpenSection] = useState(sections[0]?.title ?? "");

  return (
    <div className="mt-6 border border-slate-300">
      {sections.map((section) => {
        const isOpen = openSection === section.title;

        return (
          <div className="border-b border-slate-300 last:border-b-0" key={section.title}>
            <button
              className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-sky-600 hover:bg-slate-100"
              onClick={() => setOpenSection(isOpen ? "" : section.title)}
              type="button"
            >
              {section.title}
              <svg
                aria-hidden="true"
                className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 16 5 9h14l-7 7Z" />
              </svg>
            </button>
            {isOpen ? (
              <div className="bg-white p-0">
                <AtlasGallery description="" items={section.items} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
