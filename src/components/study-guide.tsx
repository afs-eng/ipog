type StudyGuideData = {
  title: string;
  description: string;
  sections: { title: string; content: string; keyPoints: string[]; studyPrompt?: string }[];
};

export function StudyGuide({ guide }: { guide: StudyGuideData }) {
  return (
    <div className="mt-5 space-y-4">
      <p className="leading-7 text-slate-600">{guide.description}</p>
      {guide.sections.map((section, index) => (
        <article className="border border-slate-200 bg-white p-5" key={section.title}>
          <p className="text-xs font-bold uppercase tracking-wide text-[#aa0000]">Tópico {index + 1}</p>
          <h3 className="mt-2 text-xl font-normal text-slate-800">{section.title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{section.content}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {section.keyPoints.map((point) => <li className="flex gap-2" key={point}><span className="text-[#aa0000]">•</span><span>{point}</span></li>)}
          </ul>
          {section.studyPrompt ? <p className="mt-4 border-l-2 border-[#aa0000] bg-red-50 px-4 py-3 text-sm italic leading-6 text-slate-700">Para refletir: {section.studyPrompt}</p> : null}
        </article>
      ))}
    </div>
  );
}
