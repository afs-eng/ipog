import { readFileSync } from "node:fs";
import path from "node:path";

export default function NeuroSimulationPage() {
  const html = readFileSync(path.join(process.cwd(), "aux", "neuroanatomofisiologia.html"), "utf8");

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
