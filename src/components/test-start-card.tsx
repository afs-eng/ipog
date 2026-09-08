"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TestStartCardProps = {
  href: string;
  imageUrl: string;
  reviewItems?: string[];
  title: string;
};

const studyTimes = [5, 10, 20, 30];

export function TestStartCard({ href, imageUrl, reviewItems = [], title }: TestStartCardProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [removedItems, setRemovedItems] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(10);
  const visibleReviewItems = reviewItems.filter((item) => !removedItems.includes(item));
  const timedHref = addRemovedItems(addStudyTime(href, selectedTime), removedItems);

  return (
    <>
      <div className="mt-5 overflow-hidden border border-slate-200 bg-white">
        <div className="relative aspect-[16/7] bg-slate-100">
          <Image
            alt={`Teste de ${title}`}
            className="object-cover"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 680px"
            src={imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-[#aa0000]/25" />
          <button
            aria-label="Abrir configurações do teste"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:bg-white hover:text-[#aa0000]"
            onClick={() => setIsSettingsOpen(true)}
            type="button"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.2 3.5c0-.5-.1-1-.2-1.4l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2.4-1.4L14.8 2h-5.6l-.4 2.8c-.9.3-1.7.8-2.4 1.4l-2.4-1-2 3.4 2 1.5a8.8 8.8 0 0 0 0 2.8l-2 1.5 2 3.4 2.4-1c.7.6 1.5 1 2.4 1.4l.4 2.8h5.6l.4-2.8c.9-.3 1.7-.8 2.4-1.4l2.4 1 2-3.4-2-1.5c.1-.4.2-.9.2-1.4Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="rounded bg-[#aa0000] px-3 py-1 text-xs font-bold">TESTE</span>
            <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
          </div>
        </div>
        <div className="bg-[#aa0000] p-4 text-white sm:flex sm:items-center sm:justify-between">
          <Link className="font-semibold underline-offset-4 hover:underline" href={timedHref}>
            Começar o teste
          </Link>
          <span className="mt-2 block text-sm sm:mt-0">{selectedTime} min</span>
        </div>
      </div>

      {reviewItems.length > 0 ? (
        <section className="overflow-hidden border-x border-b border-slate-300 bg-slate-50 text-slate-700">
          <button
            className="flex w-full items-center justify-between border-b border-slate-300 bg-white px-5 py-3 text-left text-sm font-semibold"
            onClick={() => setIsContentOpen((current) => !current)}
            type="button"
          >
            <span className="flex items-center gap-2">
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path d="M7 3h10v4h4v14H3V3h4Zm0 0v4h10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              O que você vai aprender
            </span>
            <span className="text-xl leading-none">{isContentOpen ? "^" : "v"}</span>
          </button>
          {isContentOpen ? (
            <div className="px-5 py-4">
              <p className="text-sm">Clique para remover conteúdo da sessão de estudo:</p>
              <div className="mt-4 grid gap-x-12 gap-y-2 sm:grid-cols-2">
                {visibleReviewItems.map((item) => (
                  <button
                    className="w-fit rounded-full bg-white px-3 py-1 text-left text-sm text-slate-600 shadow-sm hover:bg-red-50 hover:text-[#aa0000]"
                    key={item}
                    onClick={() => setRemovedItems((current) => [...current, item])}
                    type="button"
                  >
                    <span className="mr-1">⊙</span>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {isSettingsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-[610px] rounded bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <h2 className="text-xl font-normal text-[#aa0000]">Configurações</h2>
              <button
                aria-label="Fechar configurações"
                className="text-4xl font-light leading-none text-slate-300 hover:text-slate-500"
                onClick={() => setIsSettingsOpen(false)}
                type="button"
              >
                x
              </button>
            </div>
            <div className="pt-7">
              <p className="text-sm font-semibold text-slate-600">Por quanto tempo você quer estudar?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {studyTimes.map((time) => (
                  <button
                    className={`rounded-full border px-7 py-2 text-sm transition ${
                      selectedTime === time
                        ? "border-[#aa0000] bg-red-50 text-[#aa0000]"
                        : "border-slate-300 bg-white text-slate-600 hover:border-red-300"
                    }`}
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    type="button"
                  >
                    {time} min
                  </button>
                ))}
              </div>
              <button className="mt-8 text-sm font-semibold text-slate-400" type="button">
                Mais opções v
              </button>
              <Link
                className="mt-8 flex w-full items-center justify-center rounded-sm bg-[#aa0000] px-5 py-4 text-sm font-bold uppercase text-white hover:bg-[#8b0000]"
                href={timedHref}
              >
                Começar a revisão &gt; {selectedTime} min
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function addStudyTime(href: string, selectedTime: number) {
  const [pathname, currentQuery = ""] = href.split("?");
  const params = new URLSearchParams(currentQuery);
  params.set("tempo", String(selectedTime));

  return `${pathname}?${params.toString()}`;
}

function addRemovedItems(href: string, removedItems: string[]) {
  const [pathname, currentQuery = ""] = href.split("?");
  const params = new URLSearchParams(currentQuery);

  if (removedItems.length > 0) {
    params.set("remover", removedItems.join("|"));
  } else {
    params.delete("remover");
  }

  return `${pathname}?${params.toString()}`;
}
