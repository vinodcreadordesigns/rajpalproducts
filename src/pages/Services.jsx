import { useState, useRef } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap";

const services = [
  { title: "Wholesale Supply",           desc: "Bulk supply with premium quality assurance for retailers and distributors.",       icon: "🪔" },
  { title: "Export Packaging",           desc: "International-grade packaging designed for global fragrance export markets.",     icon: "📦" },
  { title: "Private Label Consultation", desc: "Build your own brand with our expert private label fragrance solutions.",         icon: "✨" },
  { title: "Fragrance Profiling",        desc: "Custom scent development tailored to your brand identity and market.",            icon: "🌸" },
  { title: "Bulk & Distributor Support", desc: "Dedicated support system for large-scale business partners.",                    icon: "🤝" },
  { title: "Sacred Sourcing",            desc: "Ethically sourced ritual ingredients with authenticity certification.",           icon: "🕯️" },
];

/* incense items scattered in background */
const BG_ITEMS = [
  { t:"ag", x:70,   y:130, s:0.70, d:0.0, o:0.13 },
  { t:"dh", x:190,  y:320, s:0.55, d:1.2, o:0.10 },
  { t:"ag", x:370,  y:70,  s:0.85, d:0.5, o:0.14 },
  { t:"dh", x:540,  y:240, s:0.75, d:2.0, o:0.11 },
  { t:"ag", x:690,  y:370, s:0.60, d:0.8, o:0.13 },
  { t:"dh", x:850,  y:90,  s:0.70, d:1.5, o:0.10 },
  { t:"ag", x:970,  y:290, s:0.80, d:0.3, o:0.12 },
  { t:"dh", x:1090, y:55,  s:0.60, d:2.5, o:0.10 },
  { t:"ag", x:1230, y:330, s:0.68, d:1.0, o:0.13 },
  { t:"dh", x:55,   y:490, s:0.50, d:3.0, o:0.09 },
  { t:"ag", x:310,  y:510, s:0.58, d:1.8, o:0.11 },
  { t:"dh", x:610,  y:470, s:0.72, d:0.6, o:0.10 },
  { t:"ag", x:890,  y:500, s:0.53, d:2.2, o:0.12 },
  { t:"dh", x:1140, y:450, s:0.63, d:1.1, o:0.09 },
  { t:"ag", x:460,  y:190, s:0.78, d:0.9, o:0.13 },
  { t:"dh", x:750,  y:175, s:0.68, d:1.7, o:0.11 },
];

function BgIncense() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1300 580"
      preserveAspectRatio="xMidYMid slice"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
    >
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c8960c" />
          <stop offset="100%" stopColor="#5a2800" />
        </linearGradient>
        <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4a017" />
          <stop offset="100%" stopColor="#7a3400" />
        </linearGradient>
      </defs>

      {BG_ITEMS.map((it, i) =>
        it.t === "ag" ? (
          /* ── AGARBATTI ── */
          <g key={i} transform={`translate(${it.x},${it.y}) scale(${it.s})`}
            style={{ opacity:it.o, animation:`agFloat 8s ease-in-out ${it.d}s infinite` }}>
            <rect x="-1.5" y="0" width="3" height="58" rx="1.5" fill="url(#sg)" />
            <circle cx="0" cy="61" r="4" fill="#8b5e00" opacity="0.65" />
            <circle cx="0" cy="0"  r="3.5" fill="#ffdd00" style={{ animation:`tipGlow 2s ease-in-out ${it.d}s infinite` }} />
            <circle cx="0" cy="0"  r="7"   fill="#ffaa00" opacity="0.3"
              style={{ animation:`tipGlow 2s ease-in-out ${it.d+0.3}s infinite` }} />
            {/* smoke wisps */}
            <path d={`M0,-4 C-8,-18 6,-32 -4,-46`}  fill="none" stroke="#ffe066" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"
              style={{ animation:`smokeA 3s ease-in-out ${it.d}s infinite` }} />
            <path d={`M0,-4 C6,-20 -5,-34 3,-50`}   fill="none" stroke="#ffd700" strokeWidth="0.9" strokeLinecap="round" opacity="0.3"
              style={{ animation:`smokeB 3.6s ease-in-out ${it.d+0.4}s infinite` }} />
            <path d={`M0,-4 C-3,-15 4,-28 -2,-42`}  fill="none" stroke="#ffee88" strokeWidth="0.7" strokeLinecap="round" opacity="0.2"
              style={{ animation:`smokeC 4.2s ease-in-out ${it.d+0.8}s infinite` }} />
          </g>
        ) : (
          /* ── DHOOP CONE ── */
          <g key={i} transform={`translate(${it.x},${it.y}) scale(${it.s})`}
            style={{ opacity:it.o, animation:`agFloat 9s ease-in-out ${it.d}s infinite` }}>
            <polygon points="0,-30 -17,0 17,0" fill="url(#dg)" opacity="0.85" />
            <ellipse cx="0" cy="0" rx="19" ry="3.5" fill="#8b5500" opacity="0.65" />
            <circle cx="0" cy="-30" r="3" fill="#ffcc00" style={{ animation:`tipGlow 2.5s ease-in-out ${it.d}s infinite` }} />
            <path d={`M0,-33 C-10,-50 8,-66 -5,-82`} fill="none" stroke="#ffe566" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"
              style={{ animation:`smokeA 3.5s ease-in-out ${it.d}s infinite` }} />
            <path d={`M0,-33 C8,-52 -6,-68 4,-86`}   fill="none" stroke="#ffd700" strokeWidth="0.9" strokeLinecap="round" opacity="0.25"
              style={{ animation:`smokeB 4s ease-in-out ${it.d+0.5}s infinite` }} />
          </g>
        )
      )}
    </svg>
  );
}

function ServiceCard({ s, index }) {
  const [hov, setHov] = useState(false);
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const ref = useRef(null);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        setMx(((e.clientX - r.left) / r.width) * 100);
        setMy(((e.clientY - r.top) / r.height) * 100);
      }}
      style={{
        position:"relative", overflow:"hidden", borderRadius:"18px",
        padding:"30px 26px 34px",
        background: hov
          ? "linear-gradient(145deg,#fffde4 0%,#fff8b8 55%,#fffbd8 100%)"
          : "linear-gradient(145deg,#fffff2 0%,#fffde6 60%,#fef9e0 100%)",
        border: hov ? "1.5px solid #c8960c" : "1.5px solid rgba(200,150,12,0.3)",
        boxShadow: hov
          ? "0 0 0 5px rgba(255,215,0,0.10), 0 18px 52px rgba(160,100,0,0.20), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 4px 18px rgba(160,100,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
        transform: hov ? "translateY(-8px) scale(1.025)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        animation: `cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.09}s both`,
        cursor: "default",
      }}
    >
      {/* cursor spotlight */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, borderRadius:"18px", pointerEvents:"none",
        background: hov
          ? `radial-gradient(circle at ${mx}% ${my}%, rgba(255,200,0,0.20) 0%, transparent 58%)`
          : "none",
      }} />

      {/* shimmer sweep */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, borderRadius:"18px", pointerEvents:"none",
        background:"linear-gradient(110deg,transparent 36%,rgba(255,220,0,0.20) 50%,transparent 64%)",
        transform: hov ? "translateX(130%)" : "translateX(-130%)",
        transition:"transform 0.68s ease",
      }} />

      {/* corner mandala ring */}
      <svg aria-hidden="true" viewBox="0 0 60 60" style={{
        position:"absolute", top:-6, right:-6, width:58, height:58,
        opacity: hov ? 0.45 : 0.14,
        transform: hov ? "rotate(60deg)" : "rotate(0deg)",
        transition:"opacity 0.4s, transform 0.8s",
      }}>
        <circle cx="30" cy="30" r="24" fill="none" stroke="#c8960c" strokeWidth="0.8" strokeDasharray="3 3"/>
        <circle cx="30" cy="30" r="16" fill="none" stroke="#c8960c" strokeWidth="0.5" strokeDasharray="2 5"/>
        <circle cx="30" cy="30" r="9"  fill="none" stroke="#d4a017" strokeWidth="0.5"/>
      </svg>

      {/* bottom shimmer line */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:0, left:0, height:"2.5px",
        width: hov ? "100%" : "0%",
        background:"linear-gradient(90deg,transparent,#c8960c,#ffd700,#c8960c,transparent)",
        transition:"width 0.55s cubic-bezier(0.22,1,0.36,1)",
      }} />

      {/* left accent bar */}
      <div aria-hidden="true" style={{
        position:"absolute", top:0, left:0, width:"3px",
        height: hov ? "100%" : "0%",
        background:"linear-gradient(180deg,transparent,#d4a017,transparent)",
        transition:"height 0.55s cubic-bezier(0.22,1,0.36,1)",
        borderRadius:"18px 0 0 18px",
      }} />

      {/* icon */}
      <div style={{
        fontSize:"34px", marginBottom:"13px", display:"inline-block",
        transform: hov ? "scale(1.2) rotate(-6deg)" : "scale(1) rotate(0deg)",
        filter: hov ? "drop-shadow(0 0 10px rgba(200,150,12,0.75))" : "none",
        transition:"transform 0.4s, filter 0.3s",
      }}>{s.icon}</div>

      <p style={{
        fontFamily:"'Cinzel',serif", fontSize:"9px",
        letterSpacing:"3.5px", textTransform:"uppercase",
        color:"#9a6a00", marginBottom:"8px",
      }}>Premium Service</p>

      <h3 style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"21px", fontWeight:700, lineHeight:1.25,
        color: hov ? "#5a2e00" : "#7a4400",
        marginBottom:"10px",
        transition:"color 0.3s",
      }}>{s.title}</h3>

      <p style={{
        fontFamily:"'EB Garamond',serif",
        fontSize:"14.5px", lineHeight:1.7,
        color: hov ? "#5a3200" : "#7a5200",
        transition:"color 0.3s",
      }}>{s.desc}</p>

      {/* corner dots */}
      {[{top:11,left:11},{top:11,right:11},{bottom:11,left:11},{bottom:11,right:11}].map((pos,i) => (
        <div key={i} aria-hidden="true" style={{
          position:"absolute", width:"4px", height:"4px", borderRadius:"50%",
          background:"#c8960c", opacity: hov ? 0.75 : 0.22,
          transition:"opacity 0.4s", ...pos,
        }} />
      ))}
    </article>
  );
}

const Services = () => (
  <>
    <link rel="stylesheet" href={FONT_LINK} />
    <style>{`
      @keyframes agFloat {
        0%,100% { transform:translateY(0px) rotate(0deg); }
        33%      { transform:translateY(-14px) rotate(2deg); }
        66%      { transform:translateY(-6px) rotate(-2deg); }
      }
      @keyframes tipGlow {
        0%,100% { opacity:.9; }
        50%      { opacity:.4; }
      }
      @keyframes smokeA {
        0%,100% { opacity:.45; transform:translateX(0); }
        50%      { opacity:.15; transform:translateX(-4px); }
      }
      @keyframes smokeB {
        0%,100% { opacity:.30; transform:translateX(0); }
        50%      { opacity:.08; transform:translateX(4px); }
      }
      @keyframes smokeC {
        0%,100% { opacity:.20; }
        50%      { opacity:.05; }
      }
      @keyframes cardReveal {
        from { opacity:0; transform:translateY(28px) scale(0.96); }
        to   { opacity:1; transform:translateY(0) scale(1); }
      }
      @keyframes titleShine {
        0%,100% { background-position:0% 50%; }
        50%      { background-position:100% 50%; }
      }
      @keyframes floatTitle {
        0%,100% { transform:translateY(0); }
        50%      { transform:translateY(-5px); }
      }
      @keyframes rotateMandala {
        from { transform:translate(-50%,-50%) rotate(0deg); }
        to   { transform:translate(-50%,-50%) rotate(360deg); }
      }
      @keyframes divaReveal {
        from { opacity:0; letter-spacing:10px; }
        to   { opacity:1; letter-spacing:5px; }
      }
    `}</style>

    <section style={{
      position:"relative", overflow:"hidden",
      background:"linear-gradient(160deg,#fffff0 0%,#fffde0 25%,#fff8b0 55%,#fffbe5 80%,#fffde0 100%)",
      padding:"96px 24px 112px",
    }}>

      {/* noise stripe texture */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(200,150,12,0.025) 3px,rgba(200,150,12,0.025) 6px)",
      }} />

      {/* top halo */}
      <div aria-hidden="true" style={{
        position:"absolute", top:"-8%", left:"50%", transform:"translateX(-50%)",
        width:"900px", height:"460px", borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(255,220,0,0.22) 0%,transparent 70%)",
        pointerEvents:"none",
      }} />
      {/* bottom-right halo */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:"-6%", right:"-4%",
        width:"480px", height:"380px", borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(255,180,0,0.16) 0%,transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* animated incense background */}
      <BgIncense />

      {/* big rotating mandala watermark */}
      <svg aria-hidden="true" viewBox="0 0 500 500" style={{
        position:"absolute", top:"50%", left:"50%",
        animation:"rotateMandala 100s linear infinite",
        width:"720px", height:"720px",
        opacity:0.045, pointerEvents:"none",
      }}>
        {[60,100,140,180,210,240].map((r,i) => (
          <circle key={i} cx="250" cy="250" r={r} fill="none"
            stroke="#c8960c" strokeWidth={i%2===0?"1":"0.5"}
            strokeDasharray={i%2===0?"6 4":"2 6"} />
        ))}
        {Array.from({length:18}).map((_,i) => {
          const a = (i * 20 * Math.PI) / 180;
          return <line key={i}
            x1={250+95*Math.cos(a)}  y1={250+95*Math.sin(a)}
            x2={250+240*Math.cos(a)} y2={250+240*Math.sin(a)}
            stroke="#c8960c" strokeWidth="0.5" />;
        })}
      </svg>

      {/* ══ HEADER ══ */}
      <div style={{ position:"relative", zIndex:2, textAlign:"center", marginBottom:"70px" }}>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"14px", marginBottom:"18px" }}>
          <div style={{ height:"1px", width:"55px", background:"linear-gradient(90deg,transparent,#c8960c)" }} />
          <p style={{
            fontFamily:"'Cinzel',serif", fontSize:"10px",
            letterSpacing:"5px", textTransform:"uppercase", color:"#9a6800",
            animation:"divaReveal 1s ease both",
          }}>Our Services</p>
          <div style={{ height:"1px", width:"55px", background:"linear-gradient(90deg,#c8960c,transparent)" }} />
        </div>

        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(34px,5vw,58px)", fontWeight:700, lineHeight:1.15,
          background:"linear-gradient(135deg,#6b3600 0%,#c8960c 22%,#ffd700 45%,#ffec50 55%,#c8960c 78%,#6b3600 100%)",
          backgroundSize:"220% 220%",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          animation:"titleShine 5s ease infinite, floatTitle 4s ease-in-out infinite",
          marginBottom:"18px",
        }}>
          Premium Business<br />Support Services
        </h2>

        <p style={{
          fontFamily:"'EB Garamond',serif", fontStyle:"italic",
          fontSize:"17px", color:"#7a5000",
          maxWidth:"460px", margin:"0 auto", lineHeight:1.75,
          animation:"cardReveal 0.8s ease 0.3s both",
        }}>
          Elevating sacred fragrance traditions with world-class trade solutions
        </p>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginTop:"24px" }}>
          <div style={{ height:"1px", width:"70px", background:"linear-gradient(90deg,transparent,rgba(200,150,12,0.5))" }} />
          <svg viewBox="0 0 48 18" width="48" height="18">
            <polygon points="24,2 28,9 24,16 20,9" fill="#c8960c" opacity="0.9" />
            <circle cx="7"  cy="9" r="2.5" fill="#c8960c" opacity="0.5" />
            <circle cx="41" cy="9" r="2.5" fill="#c8960c" opacity="0.5" />
            <line x1="10.5" y1="9" x2="19" y2="9" stroke="#c8960c" strokeWidth="1" opacity="0.5" />
            <line x1="29"   y1="9" x2="37.5" y2="9" stroke="#c8960c" strokeWidth="1" opacity="0.5" />
          </svg>
          <div style={{ height:"1px", width:"70px", background:"linear-gradient(90deg,rgba(200,150,12,0.5),transparent)" }} />
        </div>
      </div>

      {/* ══ CARDS ══ */}
      <div style={{
        position:"relative", zIndex:2,
        maxWidth:"1180px", margin:"0 auto",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
        gap:"22px",
      }}>
        {services.map((s, i) => <ServiceCard key={i} s={s} index={i} />)}
      </div>

      {/* ══ CTA ══ */}
      <div style={{
        position:"relative", zIndex:2,
        marginTop:"68px", textAlign:"center",
        animation:"cardReveal 0.8s ease 0.9s both",
      }}>
        <button
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(200,150,12,0.48)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,150,12,0.28)";
          }}
          style={{
            fontFamily:"'Cinzel',serif",
            fontSize:"11px", letterSpacing:"3.5px", textTransform:"uppercase",
            color:"#3a1a00",
            background:"linear-gradient(135deg,#ffd700 0%,#c8960c 50%,#e6b800 100%)",
            border:"none", borderRadius:"4px",
            padding:"16px 52px",
            cursor:"pointer",
            boxShadow:"0 8px 28px rgba(200,150,12,0.28)",
            transition:"transform 0.25s, box-shadow 0.25s",
          }}
        >
          Explore All Services
        </button>
      </div>

      {/* bottom accent line */}
      <div aria-hidden="true" style={{
        position:"absolute", bottom:0, left:0, right:0, height:"3px",
        background:"linear-gradient(90deg,transparent,#ffd700,#c8960c,#ffd700,transparent)",
        opacity:0.55,
      }} />
    </section>
  </>
);

export default Services;