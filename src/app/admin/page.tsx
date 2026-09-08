import Link from "next/link";
import { notFound } from "next/navigation";

export default function AdminPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-8 sm:px-10 lg:px-12">
      <Link className="text-sm font-semibold text-[#aa0000]" href="/">
        Voltar ao início
      </Link>
      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="font-semibold text-[#aa0000]">Painel administrativo</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Área preparada para gestão de conteúdo.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Nesta primeira base, a tela marca o espaço onde entrarão autenticação, upload de materiais, revisão de questões em rascunho e publicação controlada.
        </p>
        <div className="mt-8">
          <Link
            className="inline-flex rounded-full bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-[#aa0000]"
            href="/admin/questoes/nova"
          >
            Cadastrar nova questão
          </Link>
          <Link
            className="ml-3 inline-flex rounded-full border border-slate-300 px-6 py-4 font-semibold text-slate-950 transition hover:border-[#aa0000] hover:text-[#aa0000]"
            href="/admin/questoes"
          >
            Ver questões draft
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Cadastrar disciplinas e materiais",
            "Enviar PDF/PPTX com validação",
            "Associar imagens ao slide de origem",
            "Revisar questões antes de publicar",
          ].map((item) => (
            <div className="rounded-2xl bg-slate-100 p-5 font-medium text-slate-800" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
