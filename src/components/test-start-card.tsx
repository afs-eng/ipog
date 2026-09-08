"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TestStartCardProps = {
  href: string;
  imageUrl: string;
  title: string;
};

const studyTimes = [5, 10, 20, 30];

export function TestStartCard({ href, imageUrl, title }: TestStartCardProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10);
  const timedHref = addStudyTime(href, selectedTime);

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
