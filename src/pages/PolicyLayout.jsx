import { Link } from "react-router-dom";

const PolicyLayout = ({ title, updated, sections }) => (
  <main className="min-h-screen bg-[#070201] px-6 pb-20 pt-32 text-white">
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C49B63]">Rajpal Products</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-[0.12em] text-[#EAD3A1] sm:text-4xl" style={{ fontFamily: "'Cinzel', serif" }}>
        {title}
      </h1>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#C49B63]/70 to-transparent" />
      <p className="mt-4 text-xs text-white/40">Last updated: {updated}</p>

      <div className="mt-10 space-y-5">
        {sections.map((s) => (
          <section key={s.heading} className="rounded-2xl border border-[#C49B63]/20 bg-white/[0.04] p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#EAD3A1]">{s.heading}</h2>
            {s.text && <p className="mt-3 text-sm leading-7 text-white/65">{s.text}</p>}
            {s.points && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/65 marker:text-[#C49B63]">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em]">
        <Link to="/" className="text-[#EAD3A1] underline-offset-4 hover:underline">← Back to Home</Link>
        <a href="mailto:info@rajpalproducts.com" className="text-white/50 hover:text-[#EAD3A1]">info@rajpalproducts.com</a>
      </div>
    </div>
  </main>
);

export default PolicyLayout;