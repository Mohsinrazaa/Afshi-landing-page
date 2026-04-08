import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────── */
const T = {
  gold: "#c8aa64",
  goldL: "#e8d49a",
  goldD: "#9a7c3a",
  goldDim: "rgba(200,170,100,0.18)",
  dark: "#090805",
  dark2: "#110e08",
  dark3: "#1a1510",
  cream: "#f2ead6",
  muted: "#7a6a50",
  muted2: "#4a3820",
  mehndi: "#3d1f00",
  serif: "'Cormorant Garamond',serif",
  sans: "'Jost',sans-serif",
};

/* ─── TYPES ─────────────────────────────────────────────────────────────── */
interface Product { id: number; name: string; urdu: string; price: string; fabric: string; tag?: string; bg: string; image: string; }
interface MehndiService { id: string; title: string; urdu: string; price: string; desc: string; category: "bride" | "teenage" | "kids"; handType: "hand" | "leg"; image: string; }
interface Testimonial { name: string; city: string; text: string; service: string; }

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const ABAYAS: Product[] = [
  { id: 1, name: "Noor-e-Shab", urdu: "نورِ شب", price: "PKR 8,500", fabric: "Nida Silk", tag: "Bestseller", bg: "#1c130a", image: "/abayas/1.jpeg" },
  { id: 2, name: "Gulbahar", urdu: "گلبہار", price: "PKR 15,500", fabric: "Hand Embroidered", tag: "New", bg: "#1a0e22", image: "/abayas/2.jpeg" },
  { id: 3, name: "Safina", urdu: "سفینہ", price: "PKR 12,000", fabric: "Premium Crepe", bg: "#0f1520", image: "/abayas/3.jpeg" },
  { id: 4, name: "Roshni", urdu: "روشنی", price: "PKR 6,200", fabric: "Lawn Cotton", bg: "#121008", image: "/abayas/4.jpeg" },
  { id: 5, name: "Zeenat", urdu: "زینت", price: "PKR 9,800", fabric: "Chiffon Blend", tag: "Popular", bg: "#1c1a15", image: "/abayas/5.jpeg" },
  { id: 6, name: "Haya", urdu: "حیا", price: "PKR 11,500", fabric: "Premium Nida", bg: "#181410", image: "/abayas/6.jpeg" },
];

const MEHNDI_SERVICES: MehndiService[] = [
  { id: "bh", title: "Bridal Full Hands", urdu: "دلہن — ہاتھ", price: "PKR 4,500", desc: "Intricate Arabic & Pakistani motifs from fingertips to elbow with floral jaal, peacocks, and paisley.", category: "bride", handType: "hand", image: "/mehndi/1.jpeg" },
  { id: "bl", title: "Bridal Full Legs", urdu: "دلہن — پاؤں", price: "PKR 3,500", desc: "Dense floral patterns with bel, mandala anklets, and fine latticework covering foot and calf.", category: "bride", handType: "leg", image: "/mehndi/2.jpeg" },
  { id: "th", title: "Teenage Hands", urdu: "ٹین ایج — ہاتھ", price: "PKR 1,800", desc: "Trendy minimal-meets-traditional designs — geometric tips, flowers, and fine vine trails.", category: "teenage", handType: "hand", image: "/mehndi/3.jpeg" },
  { id: "tl", title: "Teenage Legs", urdu: "ٹین ایج — پاؤں", price: "PKR 1,500", desc: "Chic ankle cuffs, foot jaal, and modern geometric accents for a contemporary look.", category: "teenage", handType: "leg", image: "/mehndi/4.jpeg" },
  { id: "kh", title: "Kids Hands", urdu: "بچے — ہاتھ", price: "PKR 800", desc: "Sweet simple flowers, butterflies, stars, and hearts — gentle on delicate skin.", category: "kids", handType: "hand", image: "/mehndi/5.jpeg" },
  { id: "kl", title: "Kids Legs", urdu: "بچے — پاؤں", price: "PKR 700", desc: "Tiny ankle bracelets and playful toe motifs crafted with care for little ones.", category: "kids", handType: "leg", image: "/mehndi/6.jpeg" },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Ayesha Raza", city: "Faisalabad", text: "My bridal mehndi was beyond anything I imagined. Every guest asked who the artist was — pure artistry.", service: "Bridal Mehndi" },
  { name: "Sana Malik", city: "Karachi", text: "The abaya fabric quality is extraordinary. The Gulbahar embroidery looks like wearable poetry.", service: "Abaya Collection" },
  { name: "Hira Butt", city: "Islamabad", text: "Afshi did my daughter's mehndi for Eid — she was the happiest child at the party. So gentle and beautiful.", service: "Kids Mehndi" },
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── GOOGLE FONTS INJECT ────────────────────────────────────────────────── */
function FontLoader() {
  useEffect(() => {
    if (document.getElementById("afshi-fonts")) return;
    const l = document.createElement("link");
    l.id = "afshi-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

/* ─── KEYFRAMES ──────────────────────────────────────────────────────────── */
const STYLES = `
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse   { 0%,100%{opacity:.7} 50%{opacity:1} }
@keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.fade-up { animation: fadeUp .75s ease forwards; }
.fade-up-2 { animation: fadeUp .75s .15s ease both; }
.fade-up-3 { animation: fadeUp .75s .30s ease both; }
`;

/* ─── SECTION FADE WRAPPER ───────────────────────────────────────────────── */
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity .8s ${delay}s, transform .8s ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── GOLD BUTTON ────────────────────────────────────────────────────────── */
function GoldBtn({ children, onClick, sm }: { children: React.ReactNode; onClick?: () => void; sm?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? T.goldL : T.gold, color: T.dark, border: "none", cursor: "pointer", fontFamily: T.sans, fontWeight: 500, padding: sm ? "10px 26px" : "14px 36px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", transition: "background .3s", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? "rgba(200,170,100,.06)" : "transparent", color: T.gold, border: `0.5px solid ${h ? T.gold : "rgba(200,170,100,.4)"}`, cursor: "pointer", fontFamily: T.sans, fontWeight: 300, padding: "14px 30px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", transition: "all .3s" }}>
      {children}
    </button>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────── */
function SecHead({ pre, title, italic, sub, center = true }: { pre: string; title: string; italic: string; sub?: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", padding: "4rem 0 2.5rem", fontFamily: T.sans }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: "12px", marginBottom: "1rem" }}>
        <div style={{ width: "40px", height: "0.5px", background: T.goldDim }} />
        <span style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: T.gold }}>{pre}</span>
        <div style={{ width: "40px", height: "0.5px", background: T.goldDim }} />
      </div>
      <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px,5vw,52px)", fontWeight: 300, color: T.cream, margin: 0 }}>
        {title} <em style={{ color: T.gold, fontStyle: "italic" }}>{italic}</em>
      </h2>
      {sub && <p style={{ fontSize: "14px", color: T.muted, maxWidth: "500px", margin: center ? "1rem auto 0" : "1rem 0 0", lineHeight: 1.85 }}>{sub}</p>}
    </div>
  );
}

/* ─── MARQUEE ────────────────────────────────────────────────────────────── */
const MWORDS = ["Abayas", "Mehndi", "Bridal", "Bespoke", "Faisalabad", "Handcrafted", "Eid 2026", "Kids Mehndi", "Teenage", "Premium"];
function Marquee() {
  const items = [...MWORDS, ...MWORDS];
  return (
    <div style={{ overflow: "hidden", borderTop: `0.5px solid ${T.goldDim}`, borderBottom: `0.5px solid ${T.goldDim}`, padding: "16px 0", background: T.dark2 }}>
      <div style={{ display: "flex", gap: "3rem", animation: "marquee 24s linear infinite", whiteSpace: "nowrap" }}>
        {items.map((w, i) => (
          <span key={i} style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: T.muted, fontFamily: T.sans, display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {w}<span style={{ color: T.gold, fontSize: "8px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "92vh", position: "relative", overflow: "hidden" }}>
      {/* Geometric bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
          <defs>
            <pattern id="geo" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0L80 40L40 80L0 40Z" stroke="rgba(200,170,100,0.05)" strokeWidth="0.5" fill="none" />
            </pattern>
            <radialGradient id="rg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(200,170,100,0.04)" />
              <stop offset="100%" stopColor="rgba(200,170,100,0)" />
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#geo)" />
          <ellipse cx="300" cy="400" rx="340" ry="380" fill="url(#rg)" />
          <ellipse cx="900" cy="400" rx="340" ry="380" fill="url(#rg)" />
        </svg>
      </div>

      {/* LEFT */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem 5rem 5rem", borderRight: `0.5px solid ${T.goldDim}` }}>
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
          <div style={{ width: "40px", height: "0.5px", background: T.gold }} />
          <span style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: T.gold, fontFamily: T.sans }}>Faisalabad · Est. 2026</span>
        </div>
        <h1 className="fade-up-2" style={{ fontFamily: T.serif, fontSize: "clamp(44px,5vw,72px)", fontWeight: 300, lineHeight: 1.02, color: T.cream, margin: "0 0 1rem" }}>
          Abayas &<br /><em style={{ color: T.gold, fontStyle: "italic" }}>Mehndi</em><br />by Afshi
          <span style={{ display: "block", fontFamily: "serif", fontSize: "clamp(28px,3vw,46px)", color: "rgba(200,170,100,0.45)", marginTop: "6px" }}>آفشی</span>
        </h1>
        <p className="fade-up-3" style={{ fontSize: "15px", lineHeight: 1.9, color: T.muted, maxWidth: "380px", marginBottom: "2.5rem", fontFamily: T.sans, fontWeight: 300 }}>
          Handcrafted abayas & traditionally drawn mehndi — bridal, teenage & kids — from the heart of Faisalabad.
        </p>
        <div className="fade-up-3" style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <GoldBtn onClick={() => onScrollTo("abayas")}>Shop Abayas</GoldBtn>
          <GhostBtn onClick={() => onScrollTo("mehndi")}>Mehndi Services</GhostBtn>
        </div>
        <div className="fade-up-3" style={{ display: "flex", gap: "0" }}>
          {[["2K+", "Clients"], ["48", "Designs"], ["100%", "Handcrafted"], ["6", "Mehndi Styles"]].map(([n, l], i) => (
            <div key={l} style={{ textAlign: "center", paddingLeft: i > 0 ? "2rem" : 0, borderLeft: i > 0 ? `0.5px solid ${T.goldDim}` : "none", marginLeft: i > 0 ? "2rem" : 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: "clamp(20px,2.5vw,32px)", color: T.gold, fontWeight: 300, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: T.muted2, marginTop: "4px", fontFamily: T.sans }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — split abaya + mehndi preview */}
      <div style={{ position: "relative", zIndex: 1, background: T.dark2, display: "grid", gridTemplateRows: "1fr 1fr" }}>
        {/* Top: abaya preview */}
        <div style={{ borderBottom: `0.5px solid ${T.goldDim}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 2, border: `0.5px solid ${T.gold}`, padding: "8px 14px", textAlign: "center", background: "rgba(9,8,5,0.6)", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, fontFamily: T.sans }}>Eid 2026</div>
            <div style={{ fontFamily: T.serif, fontSize: "16px", color: T.cream, fontStyle: "italic" }}>Abayas</div>
          </div>
          <img src={ABAYAS[2].image} alt="Abaya" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        </div>
        {/* Bottom: mehndi hand preview */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 2, border: `0.5px solid ${T.gold}`, padding: "8px 14px", textAlign: "center", background: "rgba(9,8,5,0.6)", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, fontFamily: T.sans }}>Traditional Art</div>
            <div style={{ fontFamily: T.serif, fontSize: "16px", color: T.cream, fontStyle: "italic" }}>Mehndi</div>
          </div>
          <img src="/mehndi/2.jpeg" alt="Mehndi" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        </div>
      </div>
    </section>
  );
}

/* ─── ABAYA SECTION ──────────────────────────────────────────────────────── */
function AbayaSection() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedAbaya, setSelectedAbaya] = useState<Product | null>(null);
  const displayedAbayas = showAll ? ABAYAS : ABAYAS.slice(0, 3);
  return (
    <section id="abayas" style={{ padding: "0 3rem 5rem" }}>
      <FadeSection>
        <SecHead pre="New Collection" title="Handcrafted" italic="Abayas" sub="Each abaya is a quiet declaration of faith, femininity, and refined taste — crafted for the women of Pakistan." />
      </FadeSection>
      <FadeSection delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: T.goldDim }}>
          {displayedAbayas.map((p) => (
            <div key={p.id} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)} onClick={() => setSelectedAbaya(p)}
              style={{ background: T.dark2, cursor: "pointer", transform: active === p.id ? "scale(1.01)" : "scale(1)", transition: "transform .4s", position: "relative" }}>
              {p.tag && (
                <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2, background: T.gold, color: T.dark, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "4px 10px", fontWeight: 500, fontFamily: T.sans }}>{p.tag}</div>
              )}
              <div style={{ height: "300px", background: p.bg, position: "relative", overflow: "hidden" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(9,8,5,.9) 0%,transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, marginBottom: "4px", fontFamily: T.sans }}>{p.fabric}</div>
                  <div style={{ fontFamily: T.serif, fontSize: "20px", color: T.cream, fontWeight: 300 }}>{p.name} <span style={{ opacity: 0.5, fontSize: "14px" }}>{p.urdu}</span></div>
                  <div style={{ fontSize: "13px", color: T.gold, marginTop: "4px", fontFamily: T.sans }}>{p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <GhostBtn onClick={() => setShowAll(!showAll)}>{showAll ? "Show Less" : "View Full Collection"}</GhostBtn>
        </div>
      </FadeSection>

      {/* Abaya Modal */}
      {selectedAbaya && (
        <AbayaModal abaya={selectedAbaya} onClose={() => setSelectedAbaya(null)} />
      )}
    </section>
  );
}

/* ─── ABAYA MODAL ────────────────────────────────────────────────────────── */
function AbayaModal({ abaya, onClose }: { abaya: Product; onClose: () => void }) {
  const [hov, setHov] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden'; // Prevent body scroll when modal open
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  const orderMsg = encodeURIComponent(`Hi Afshi, I'm interested in ordering the ${abaya.name} (${abaya.urdu}) abaya for ${abaya.price}. Please provide more details.`);
  
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "center", background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)", padding: isMobile ? "0" : "2rem", overflow: "auto" }} onClick={onClose}>
      <div style={{ background: T.dark2, border: `0.5px solid ${T.goldDim}`, maxWidth: "520px", width: isMobile ? "100%" : "90%", maxHeight: isMobile ? "100vh" : "85vh", overflow: "auto", position: "relative", margin: isMobile ? "0" : "auto" }} onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} style={{ position: "absolute", top: isMobile ? "0.75rem" : "1rem", right: isMobile ? "0.75rem" : "1rem", zIndex: 10, background: "rgba(9,8,5,0.7)", border: "none", color: T.gold, fontSize: isMobile ? "28px" : "24px", cursor: "pointer", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>×</button>
        
        {/* Image */}
        <div style={{ height: isMobile ? "300px" : "400px", position: "relative", overflow: "hidden" }}>
          <img src={abaya.image} alt={abaya.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {abaya.tag && (
            <div style={{ position: "absolute", top: isMobile ? "0.75rem" : "1rem", left: isMobile ? "0.75rem" : "1rem", background: T.gold, color: T.dark, fontSize: isMobile ? "9px" : "10px", letterSpacing: "2px", textTransform: "uppercase", padding: isMobile ? "4px 10px" : "6px 12px", fontWeight: 500, fontFamily: T.sans }}>{abaya.tag}</div>
          )}
        </div>
        
        {/* Details */}
        <div style={{ padding: isMobile ? "1.25rem" : "2rem" }}>
          <div style={{ fontSize: isMobile ? "10px" : "11px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, marginBottom: "8px", fontFamily: T.sans }}>{abaya.fabric}</div>
          <h2 style={{ fontFamily: T.serif, fontSize: isMobile ? "24px" : "28px", color: T.cream, fontWeight: 300, margin: "0 0 0.5rem", lineHeight: 1.2 }}>
            {abaya.name} <span style={{ opacity: 0.5, fontSize: isMobile ? "16px" : "18px" }}>{abaya.urdu}</span>
          </h2>
          <div style={{ fontFamily: T.serif, fontSize: isMobile ? "20px" : "22px", color: T.gold, marginBottom: isMobile ? "1rem" : "1.5rem" }}>{abaya.price}</div>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color: T.muted, lineHeight: 1.7, marginBottom: isMobile ? "1.5rem" : "2rem", fontFamily: T.sans }}>
            This exquisite abaya is crafted from premium {abaya.fabric}. Each piece is meticulously designed and handmade by our skilled artisans in Faisalabad. Perfect for everyday elegance or special occasions.
          </p>
          
          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: isMobile ? "0.75rem" : "1rem", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
            <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              onClick={() => window.open(`https://wa.me/923000000000?text=${orderMsg}`, "_blank")}
              style={{ flex: 1, minHeight: "48px", background: hov ? "#20c55e" : "#25D366", color: "#fff", border: "none", padding: isMobile ? "12px 20px" : "14px 24px", cursor: "pointer", fontFamily: T.sans, fontSize: isMobile ? "13px" : "12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background .3s", borderRadius: "2px" }}>
              <svg width={isMobile ? "20" : "18"} height={isMobile ? "20" : "18"} viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Order on WhatsApp
            </button>
            <GhostBtn onClick={onClose}>Continue Browsing</GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MEHNDI SECTION ─────────────────────────────────────────────────────── */
function MehndiSection() {
  const [filter, setFilter] = useState<"all" | "bride" | "teenage" | "kids">("all");
  const cats: { key: "all" | "bride" | "teenage" | "kids"; label: string; urdu: string }[] = [
    { key: "all", label: "All Services", urdu: "سب" },
    { key: "bride", label: "Bridal", urdu: "دلہن" },
    { key: "teenage", label: "Teenage", urdu: "ٹین ایج" },
    { key: "kids", label: "Kids", urdu: "بچے" },
  ];
  const filtered = filter === "all" ? MEHNDI_SERVICES : MEHNDI_SERVICES.filter(s => s.category === filter);

  const catColors: Record<string, string> = { bride: "#8B1A1A", teenage: "#1a3a5c", kids: "#2a4a1a" };

  return (
    <section id="mehndi" style={{ padding: "0 3rem 5rem", background: T.dark3 }}>
      <FadeSection>
        <SecHead pre="Traditional Art" title="Mehndi" italic="Services" sub="Professionally hand-drawn mehndi for every occasion — bridal, teenage, and kids — crafted with the finest natural henna." />
      </FadeSection>

      {/* Category filter tabs */}
      <FadeSection delay={0.1}>
        <div style={{ display: "flex", gap: "1px", background: T.goldDim, marginBottom: "3rem", width: "fit-content" }}>
          {cats.map((c) => (
            <button key={c.key} onClick={() => setFilter(c.key)}
              style={{ background: filter === c.key ? T.gold : T.dark2, color: filter === c.key ? T.dark : T.muted, border: "none", padding: "12px 28px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", fontFamily: T.sans, fontWeight: filter === c.key ? 500 : 300, transition: "all .3s" }}>
              {c.label} <span style={{ opacity: 0.6, fontSize: "10px" }}>{c.urdu}</span>
            </button>
          ))}
        </div>
      </FadeSection>

      {/* Mehndi cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1px", background: T.goldDim }}>
        {filtered.map((svc, i) => (
          <FadeSection key={svc.id} delay={i * 0.08}>
            <MehndiCard svc={svc} catColor={catColors[svc.category]} />
          </FadeSection>
        ))}
      </div>

      {/* Book CTA banner */}
      <FadeSection delay={0.2}>
        <div style={{ marginTop: "3rem", background: T.dark2, border: `0.5px solid ${T.goldDim}`, padding: "2.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: "28px", fontWeight: 300, color: T.cream }}>
              Book Your <em style={{ color: T.gold, fontStyle: "italic" }}>Mehndi</em> Appointment
            </div>
            <p style={{ fontSize: "13px", color: T.muted, marginTop: "6px", fontFamily: T.sans }}>Home visits available across Faisalabad · Advance booking recommended for bridal</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <GoldBtn onClick={() => window.open("https://wa.me/923000000000", "_blank")}>WhatsApp Us</GoldBtn>
            <GhostBtn>Call Now</GhostBtn>
          </div>
        </div>
      </FadeSection>
    </section>
  );
}

function MehndiCard({ svc, catColor }: { svc: MehndiService; catColor: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.dark2, cursor: "pointer", transform: hov ? "scale(1.01)" : "scale(1)", transition: "transform .4s" }}>
      {/* Mehndi art display */}
      <div style={{ height: "320px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={svc.image} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
        {/* Category label */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem", background: catColor, color: "#f5e8d0", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "4px 10px", fontFamily: T.sans, fontWeight: 500 }}>
          {svc.category === "bride" ? "Bridal" : svc.category === "teenage" ? "Teenage" : "Kids"}
        </div>
        {/* Hand/Leg badge */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem", border: "0.5px solid rgba(61,31,0,0.3)", color: T.mehndi, fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "4px 10px", fontFamily: T.sans, background: "rgba(255,255,255,0.8)" }}>
          {svc.handType === "hand" ? "✋ Hand" : "🦶 Leg"}
        </div>
      </div>
      {/* Card info */}
      <div style={{ padding: "1.5rem", borderTop: `0.5px solid ${T.goldDim}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: "20px", color: T.cream, fontWeight: 300 }}>{svc.title}</div>
            <div style={{ fontSize: "12px", color: T.gold, letterSpacing: "1px", fontFamily: T.sans, opacity: 0.8 }}>{svc.urdu}</div>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: "18px", color: T.gold, fontWeight: 300, whiteSpace: "nowrap" }}>{svc.price}</div>
        </div>
        <p style={{ fontSize: "13px", color: T.muted, lineHeight: 1.75, fontFamily: T.sans }}>{svc.desc}</p>
        <div style={{ marginTop: "1.2rem" }}>
          <GoldBtn sm onClick={() => window.open("https://wa.me/923000000000", "_blank")}>Book Now</GoldBtn>
        </div>
      </div>
    </div>
  );
}

/* ─── CRAFT SECTION ──────────────────────────────────────────────────────── */
function CraftSection() {
  const points = [
    "100% natural henna — no chemicals, safe for all skin types",
    "Master karigar artisans with 15+ years experience",
    "Premium Nida, Crepe & Lawn abaya fabrics",
    "Bridal mehndi home visits across Faisalabad",
    "Custom sizing for abayas — 7-10 day turnaround",
    "Gift packaging & luxury delivery boxes available",
  ];
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
      {/* Visual */}
      <FadeSection>
        <div style={{ background: T.dark2, minHeight: "520px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <svg viewBox="0 0 500 520" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs><pattern id="craft" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 0L60 30L30 60L0 30Z" stroke="rgba(200,170,100,0.05)" strokeWidth="0.5" fill="none" /></pattern></defs>
            <rect width="500" height="520" fill="url(#craft)" />
            <circle cx="250" cy="260" r="190" stroke="rgba(200,170,100,0.08)" strokeWidth="0.5" fill="none" />
            <circle cx="250" cy="260" r="150" stroke="rgba(200,170,100,0.06)" strokeWidth="0.5" fill="none" />
            <circle cx="250" cy="260" r="110" stroke="rgba(200,170,100,0.06)" strokeWidth="0.5" fill="none" />
            <polygon points="250,90 315,185 420,185 345,245 375,340 250,280 125,340 155,245 80,185 185,185" stroke="rgba(200,170,100,0.12)" fill="rgba(200,170,100,0.02)" strokeWidth="0.5" />
            <text x="250" y="290" textAnchor="middle" fontFamily="serif" fontSize="96" fill="rgba(200,170,100,0.04)" fontStyle="italic">آفشی</text>
            <text x="250" y="210" textAnchor="middle" fontSize="11" letterSpacing="6" fill="rgba(200,170,100,0.22)" fontFamily="sans-serif">HANDCRAFTED</text>
            <text x="250" y="330" textAnchor="middle" fontSize="11" letterSpacing="6" fill="rgba(200,170,100,0.22)" fontFamily="sans-serif">FAISALABAD · 2026</text>
          </svg>
          {/* Mini mehndi preview inside */}
          {/* <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "2rem", alignItems: "flex-end" }}>
            <div style={{ width: "80px", height: "120px", overflow: "hidden", borderRadius: "2px", border: `0.5px solid ${T.goldDim}` }}>
              <img src="/mehndi/1.jpeg" alt="Bridal Mehndi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ width: "80px", height: "120px", overflow: "hidden", borderRadius: "2px", border: `0.5px solid ${T.goldDim}` }}>
              <img src="/mehndi/5.jpeg" alt="Kids Mehndi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div> */}
        </div>
      </FadeSection>

      {/* Content */}
      <FadeSection delay={0.15}>
        <div style={{ padding: "5rem 4rem", background: "#0d0a06", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: T.gold, marginBottom: "1.5rem", fontFamily: T.sans }}>Our Promise</div>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(30px,3.5vw,44px)", fontWeight: 300, lineHeight: 1.2, color: T.cream, marginBottom: "1.5rem" }}>
            Art Created with <em style={{ color: T.gold, fontStyle: "italic" }}>Soul &</em><br />Sold with <em style={{ color: T.gold, fontStyle: "italic" }}>Heart</em>
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.9, color: T.muted, marginBottom: "2.5rem", fontFamily: T.sans, fontWeight: 300 }}>
            Afshi brings together two timeless Pakistani arts — the grace of the abaya and the poetry of mehndi — under one roof. Every design is crafted by hand, never by template.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {points.map((pt, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px", color: T.muted, fontFamily: T.sans, lineHeight: 1.6 }}>
                <span style={{ color: T.gold, marginTop: "2px", flexShrink: 0 }}>✦</span>{pt}
              </li>
            ))}
          </ul>
        </div>
      </FadeSection>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────────────────────────────────── */
function Features() {
  const feats = [
    { t: "Premium Fabrics", d: "Nida, crepe & lawn from top Pakistani & imported mills." },
    { t: "Natural Henna", d: "100% organic henna — safe for skin, rich dark colour." },
    { t: "Home Visits", d: "Mehndi at your doorstep across Faisalabad — bridal bookings." },
    { t: "Nationwide Delivery", d: "Abayas shipped to all cities. Free above PKR 5,000." },
  ];
  return (
    <FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `0.5px solid ${T.goldDim}`, borderBottom: `0.5px solid ${T.goldDim}` }}>
        {feats.map((f, i) => (
          <div key={i} style={{ padding: "2.5rem 2rem", borderRight: i < 3 ? `0.5px solid ${T.goldDim}` : "none", textAlign: "center", fontFamily: T.sans }}>
            <div style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, marginBottom: "8px" }}>{f.t}</div>
            <div style={{ fontSize: "13px", color: T.muted, lineHeight: 1.7 }}>{f.d}</div>
          </div>
        ))}
      </div>
    </FadeSection>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section style={{ padding: "0 3rem 5rem" }}>
      <FadeSection>
        <SecHead pre="Reviews" title="Loved Across" italic="Pakistan" />
      </FadeSection>
      <FadeSection delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1px", background: T.goldDim }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ background: T.dark2, padding: "2.5rem" }}>
              <div style={{ color: T.gold, fontSize: "14px", letterSpacing: "3px", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ fontFamily: T.serif, fontSize: "17px", fontWeight: 300, fontStyle: "italic", color: T.cream, lineHeight: 1.75, marginBottom: "1.5rem" }}>"{t.text}"</p>
              <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: T.muted, fontFamily: T.sans }}>{t.name}</div>
              <div style={{ fontSize: "10px", color: T.muted2, marginTop: "3px", letterSpacing: "1px", fontFamily: T.sans }}>{t.city} · {t.service}</div>
            </div>
          ))}
        </div>
      </FadeSection>
    </section>
  );
}

/* ─── NEWSLETTER ─────────────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div style={{ background: T.dark2, borderTop: `0.5px solid ${T.goldDim}`, padding: "4rem 3rem", textAlign: "center", fontFamily: T.sans }}>
      <div style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: T.gold, marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <div style={{ width: "50px", height: "0.5px", background: T.goldDim }} /> Stay in Touch <div style={{ width: "50px", height: "0.5px", background: T.goldDim }} />
      </div>
      <h2 style={{ fontFamily: T.serif, fontSize: "clamp(28px,4vw,40px)", fontWeight: 300, color: T.cream, marginBottom: "8px" }}>
        Join the <em style={{ color: T.gold, fontStyle: "italic" }}>Afshi Circle</em>
      </h2>
      <p style={{ fontSize: "14px", color: T.muted, marginBottom: "2rem" }}>New collections, mehndi inspiration & exclusive Eid offers — straight to your inbox.</p>
      {done ? (
        <div style={{ fontFamily: T.serif, fontSize: "22px", color: T.gold, fontStyle: "italic" }}>Thank you for joining — جزاک اللہ ✦</div>
      ) : (
        <div style={{ display: "flex", maxWidth: "480px", margin: "0 auto" }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
            style={{ flex: 1, background: "transparent", border: `0.5px solid rgba(200,170,100,.3)`, borderRight: "none", padding: "15px 20px", color: T.cream, fontFamily: T.sans, fontSize: "13px", outline: "none" }} />
          <button onClick={() => email && setDone(true)}
            style={{ background: T.gold, color: T.dark, padding: "15px 28px", border: "none", cursor: "pointer", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: T.sans, fontWeight: 500 }}>
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { h: "Shop", ls: ["New Abayas", "Eid Collection", "Bespoke Order", "Gift Cards", "Sale"] },
    { h: "Mehndi", ls: ["Bridal Package", "Teenage Mehndi", "Kids Mehndi", "Home Visits", "Book Appointment"] },
    { h: "Help", ls: ["Size Guide", "Delivery Info", "Returns", "WhatsApp Support", "Track Order"] },
  ];
  return (
    <footer style={{ background: "#080705", borderTop: `0.5px solid ${T.goldDim}`, padding: "4rem 3rem 2rem", fontFamily: T.sans }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", maxWidth: "1200px", margin: "0 auto 3rem" }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: "26px", letterSpacing: "6px", color: T.gold, marginBottom: "1rem" }}>Afshi <span style={{ fontFamily: "serif", fontSize: "20px", opacity: .7 }}>آفشی</span></div>
          <p style={{ fontSize: "13px", color: T.muted, lineHeight: 1.8, maxWidth: "260px", marginBottom: "1.5rem" }}>Handcrafted abayas & traditional mehndi from the heart of Faisalabad. Serving Pakistan since 2024.</p>
          <div style={{ fontSize: "12px", color: T.gold, letterSpacing: "1px" }}>📍 Faisalabad · Karachi · Lahore</div>
          <div style={{ fontSize: "12px", color: T.muted, marginTop: "6px" }}>📱 +92-300-0000000</div>
          <div style={{ fontSize: "12px", color: T.muted, marginTop: "4px" }}>✉ afshi.pk@gmail.com</div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: T.gold, marginBottom: "1.5rem" }}>{c.h}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {c.ls.map(l => (
                <li key={l} style={{ fontSize: "13px", color: T.muted, cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.cream)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `0.5px solid ${T.goldDim}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: "11px", color: T.muted2 }}>© 2025 Afshi آفشی — All Rights Reserved</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {["JazzCash", "EasyPaisa", "COD"].map(p => (
            <div key={p} style={{ border: `0.5px solid ${T.muted2}`, padding: "4px 10px", fontSize: "10px", color: T.muted2 }}>{p}</div>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: T.muted2 }}>Made with love in Pakistan 🇵🇰</p>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP FLOAT ─────────────────────────────────────────────────────── */
function WABtn() {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={() => window.open("https://wa.me/923000000000", "_blank")}
      style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200, display: "flex", alignItems: "center", gap: "10px", background: h ? "#20c55e" : "#25D366", color: "#fff", padding: "13px 20px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,.3)", fontFamily: T.sans, transition: "background .3s" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: 500 }}>Order on WhatsApp</span>
    </button>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function AfshiLanding() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <FontLoader />
      <style>{STYLES}</style>
      <div style={{ background: T.dark, color: T.cream, minHeight: "100vh", fontFamily: T.sans }}>

        {/* Announcement */}
        <div style={{ background: T.gold, color: T.dark, textAlign: "center", padding: "10px", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500, fontFamily: T.sans }}>
          ✦ Free delivery across Pakistan above PKR 5,000 ✦ Eid Collection & Bridal Mehndi Now Booking ✦
        </div>

        {/* Sticky Nav */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(9,8,5,0.97)", backdropFilter: "blur(12px)", borderBottom: `0.5px solid ${T.goldDim}`, padding: "0 3rem", fontFamily: T.sans }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "68px", maxWidth: "1300px", margin: "0 auto" }}>
            <div style={{ fontFamily: T.serif, fontSize: "26px", letterSpacing: "7px", color: T.gold, textTransform: "uppercase", fontWeight: 300, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Afshi <span style={{ fontFamily: "serif", fontSize: "19px", opacity: 0.7 }}>آفشی</span>
            </div>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {[["Abayas", "abayas"], ["Mehndi", "mehndi"], ["Bridal", "mehndi"], ["About", ""], ["Contact", ""]].map(([l, id]) => (
                <span key={l} onClick={() => id && scrollTo(id)}
                  style={{ color: T.muted, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", transition: "color .3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>{l}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "11px", letterSpacing: "2px", color: T.muted, cursor: "pointer", border: `0.5px solid ${T.goldDim}`, padding: "5px 12px" }}>EN | اردو</span>
              <span style={{ color: T.gold, fontSize: "11px", letterSpacing: "2px", cursor: "pointer" }}>Bag (0)</span>
            </div>
          </div>
        </nav>

        <Hero onScrollTo={scrollTo} />
        <Marquee />
        <AbayaSection />
        <CraftSection />
        <Features />
        <MehndiSection />
        <Testimonials />
        <Newsletter />
        <Footer />
        <WABtn />
      </div>
    </>
  );
}