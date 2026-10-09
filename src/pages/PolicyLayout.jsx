const PolicyLayout = ({ title, updated, sections }) => (
  <main className="policy-page">
    <style>{`
      .policy-page { background: #fffaf3; min-height: 100vh; padding: 48px 16px 64px; color: #2f2a26; font-family: "Segoe UI", Roboto, Arial, sans-serif; line-height: 1.7; }
      .policy-wrap { max-width: 820px; margin: 0 auto; }
      .policy-header { text-align: center; margin-bottom: 32px; }
      .policy-header h1 { font-size: 2rem; margin: 0 0 8px; color: #7a3e00; }
      .policy-updated { display: inline-block; font-size: 0.85rem; color: #8a6d4b; background: #fdeccd; padding: 4px 14px; border-radius: 999px; }
      .policy-card { background: #ffffff; border: 1px solid #f0e2cc; border-radius: 14px; padding: 28px 32px; box-shadow: 0 2px 10px rgba(122, 62, 0, 0.06); }
      .policy-section { padding: 18px 0; border-bottom: 1px solid #f3e9d8; }
      .policy-section:first-child { padding-top: 0; }
      .policy-section:last-child { border-bottom: none; padding-bottom: 0; }
      .policy-section h2 { font-size: 1.15rem; margin: 0 0 8px; color: #9a4f00; }
      .policy-section p { margin: 0 0 8px; font-size: 0.97rem; white-space: pre-line; }
      .policy-section ul { margin: 6px 0 8px; padding-left: 22px; }
      .policy-section li { margin-bottom: 6px; font-size: 0.97rem; }
      .policy-section li::marker { color: #e08a1e; }
      .policy-note { background: #fff6e5; border-left: 3px solid #e08a1e; padding: 8px 12px; border-radius: 4px; }
      @media (max-width: 600px) {
        .policy-card { padding: 20px 18px; }
        .policy-header h1 { font-size: 1.6rem; }
      }
    `}</style>

    <div className="policy-wrap">
      <header className="policy-header">
        <h1>{title}</h1>
        {updated && <span className="policy-updated">Effective Date: {updated}</span>}
      </header>

      <div className="policy-card">
        {sections.map((s) => (
          <section className="policy-section" key={s.heading}>
            <h2>{s.heading}</h2>
            {s.text && <p>{s.text}</p>}
            {s.points && (
              <ul>
                {s.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
            {s.note && <p className="policy-note">{s.note}</p>}
          </section>
        ))}
      </div>
    </div>
  </main>
);

export default PolicyLayout;