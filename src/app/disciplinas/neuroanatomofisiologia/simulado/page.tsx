import { readFileSync } from "node:fs";
import path from "node:path";

export default function NeuroSimulationPage() {
  const html = readFileSync(path.join(process.cwd(), "aux", "neuroanatomofisiologia.html"), "utf8").replace(
    "</head>",
    "<style>.answer.selected{border-color:var(--blue);background:var(--soft);box-shadow:inset 4px 0 0 var(--blue);font-weight:750}.answer.selected .letter{background:var(--blue);color:white}</style></head>",
  );

  return (
    <main className="min-h-screen bg-white">
      <iframe
        className="h-screen w-full border-0 bg-white"
        sandbox="allow-scripts allow-top-navigation-by-user-activation"
        srcDoc={html}
        title="Simulado de Neuroanatomofisiologia"
      />
    </main>
  );
}
