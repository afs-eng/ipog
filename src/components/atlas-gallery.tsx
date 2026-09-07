"use client";

import Image from "next/image";
import { useState } from "react";

type AtlasGalleryProps = {
  description: string;
  items: { imageUrl: string; label: string; subtitle?: string; description?: string; synonyms?: string }[];
};

export function AtlasGallery({ description, items }: AtlasGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  const currentItem = items[currentIndex];

  if (!currentItem) {
    return null;
  }

  function previousImage() {
    setCurrentIndex((index) => (index === 0 ? items.length - 1 : index - 1));
  }

  function nextImage() {
    setCurrentIndex((index) => (index === items.length - 1 ? 0 : index + 1));
  }

  return (
    <div className={description ? "mt-5" : ""}>
      {description ? <p className="max-w-2xl whitespace-pre-line leading-7 text-slate-600">{description}</p> : null}

      <div className={`relative border border-slate-300 bg-white ${description ? "mt-5" : "border-x-0 border-b-0"}`}>
        <button
          aria-label="Imagem anterior"
          className="absolute -left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-400 shadow-sm hover:text-sky-500"
          onClick={previousImage}
          type="button"
        >
          ‹
        </button>
        <button
          aria-label="Próxima imagem"
          className="absolute -right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-xl text-slate-400 shadow-sm hover:text-sky-500"
          onClick={nextImage}
          type="button"
        >
          ›
        </button>

        <button
          aria-label="Ampliar imagem"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm hover:text-sky-500"
          type="button"
        >
          +
        </button>

        <div className="relative aspect-[4/3] bg-white">
          <Image
            alt={currentItem.label}
            className="object-contain p-5"
            fill
            sizes="(max-width: 1024px) 100vw, 680px"
            src={currentItem.imageUrl}
          />
        </div>

        <div className="grid border-t border-slate-300 text-sm sm:grid-cols-[1fr_42px_42px_42px_42px]">
          <div className="px-4 py-3 leading-5 text-slate-600">
            <p>{currentItem.label}</p>
            {currentItem.subtitle ? <p className="text-slate-500">{currentItem.subtitle}</p> : null}
          </div>
          <button className="border-l border-slate-300 px-3 text-2xl text-slate-400 hover:text-sky-500" onClick={previousImage} type="button">
            ‹
          </button>
          <div className="flex items-center justify-center border-l border-slate-300 text-slate-500">
            {currentIndex + 1}/{items.length}
          </div>
          <button className="border-l border-slate-300 px-3 text-2xl text-slate-400 hover:text-sky-500" onClick={nextImage} type="button">
            ›
          </button>
          <button
            aria-label="Mostrar nomes das imagens"
            className="border-l border-slate-300 px-3 text-lg text-slate-400 hover:text-sky-500"
            onClick={() => setIsListOpen((current) => !current)}
            type="button"
          >
            ≡
          </button>
        </div>

        {isListOpen ? (
          <div className="border-t border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <ul className="grid list-disc gap-x-10 gap-y-1 pl-5 sm:grid-cols-2">
              {items.map((item, index) => (
                <li key={item.imageUrl}>
                  <button
                    className={index === currentIndex ? "font-semibold text-sky-600" : "hover:text-sky-600"}
                    onClick={() => setCurrentIndex(index)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {currentItem.description ? (
          <div className="border-t border-slate-300 px-4 py-3 text-sm leading-6 text-slate-600">
            {currentItem.description}
          </div>
        ) : (
          <div className="border-t border-slate-300 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold">Sinônimos:</span> <span className="text-slate-500">{currentItem.synonyms ?? "Nenhum"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
