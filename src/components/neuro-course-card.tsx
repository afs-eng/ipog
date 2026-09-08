import Image from "next/image";
import Link from "next/link";
import type { NeuroCourseSection } from "@/lib/neuro-course";

type NeuroCourseCardProps = {
  section: NeuroCourseSection;
  answeredCount?: number;
};

export function NeuroCourseCard({ section, answeredCount = 0 }: NeuroCourseCardProps) {
  const firstAvailableLesson = section.lessons.find((lesson) => lesson.materialSlug);
  const courseHref = firstAvailableLesson
    ? buildLessonHref(firstAvailableLesson.materialSlug!, firstAvailableLesson.topicSlug)
    : "#";

  return (
    <section className="border border-slate-300 bg-white" id={section.id}>
      <div className="grid min-h-[150px] grid-cols-[118px_1fr] border-b border-slate-300 sm:grid-cols-[150px_1fr]">
        <div className="relative border-r border-slate-300 bg-white">
          <Image
            alt={section.title}
            className="object-contain p-3"
            fill
            sizes="150px"
            src={section.imageUrl}
          />
        </div>
        <div className="p-5 sm:p-6">
          <h2 className="text-2xl font-normal tracking-tight text-[#aa0000] sm:text-3xl">
            {section.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{section.description}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="h-2 flex-1 rounded bg-slate-100">
              <div
                className="h-2 rounded bg-[#aa0000]"
                style={{ width: `${Math.min(100, (answeredCount / section.lessons.length) * 100)}%` }}
              />
            </div>
            <span className="text-sm text-slate-700">
              {answeredCount}/{section.lessons.length}
            </span>
            <Link
              className={`w-fit rounded-sm px-4 py-2 text-xs font-bold uppercase text-white ${
                firstAvailableLesson ? "bg-[#aa0000] hover:bg-[#8b0000]" : "pointer-events-none bg-slate-300"
              }`}
              href={courseHref}
            >
              Iniciar curso
            </Link>
          </div>
        </div>
      </div>

      <div>
        {section.lessons.map((lesson) => (
          <div
            className="grid grid-cols-[58px_1fr_auto] items-center gap-3 border-b border-slate-300 bg-slate-50 px-4 py-4 last:border-b-0"
            key={lesson.title}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs text-slate-300 shadow-sm">
              ◒
            </div>
            <div>
              <Link
                className={`text-sm font-semibold ${lesson.materialSlug ? "text-[#aa0000] hover:text-[#8b0000]" : "text-slate-500"}`}
                href={lesson.materialSlug ? buildLessonHref(lesson.materialSlug, lesson.topicSlug) : "#"}
              >
                {lesson.title} ▱
              </Link>
              <p className="mt-1 text-sm leading-6 text-slate-600">{lesson.description}</p>
            </div>
            <Link
              className={`rounded-sm px-4 py-2 text-xs font-bold uppercase text-white ${
                lesson.materialSlug ? "bg-[#aa0000] hover:bg-[#8b0000]" : "pointer-events-none bg-slate-300"
              }`}
              href={lesson.materialSlug ? buildLessonHref(lesson.materialSlug, lesson.topicSlug) : "#"}
            >
              Estudar
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function buildLessonHref(materialSlug: string, topicSlug?: string) {
  const params = new URLSearchParams({ material: materialSlug });

  if (topicSlug) {
    params.set("topic", topicSlug);
  }

  return `/quiz/neuroanatomofisiologia-treino-textual?${params.toString()}`;
}
