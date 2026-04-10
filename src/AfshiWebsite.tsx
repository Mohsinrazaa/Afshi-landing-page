import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedHeroText() {
  const phrases = [
    { amber: "Elegance", rest: " Meets Art" },
    { amber: "Beauty", rest: " Meets Craft" },
    { amber: "Style", rest: " Meets Culture" },
  ];
  const [idx, setIdx]     = useState(0);
  const [next, setNext]   = useState<number|null>(null);
  const [anim, setAnim]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const ni = (idx + 1) % phrases.length;
      setNext(ni);
      setAnim(true);
      setTimeout(() => { setIdx(ni); setNext(null); setAnim(false); }, 400);
    }, 3200);
    return () => clearInterval(t);
  }, [idx]);

  const shown = anim && next !== null ? next : idx;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-1 sm:gap-2 overflow-hidden justify-center">
      <span>Where</span>
      <span className="overflow-hidden h-[1.2em]">
        <motion.span
          key={shown}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type:'spring', stiffness:300, damping:22 }}
          className="block text-amber-500"
        >
          {phrases[shown].amber}
        </motion.span>
      </span>
      <span className="overflow-hidden h-[1.2em]">
        <motion.span
          key={shown}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type:'spring', stiffness:300, damping:22, delay:.05 }}
          className="block"
        >
          {phrases[shown].rest}
        </motion.span>
      </span>
    </span>
  );
}

/* ─── DATA ───────────────────────────────────────────────────────────────────── */
const ABAYAS = [
  { id: 1, name: "Midnight Elegance", urdu: "نائٹ ایلیگینس", price: "PKR 8,500", fabric: "Premium Nida", image: "/abayas/1.jpeg", tag: "NEW" },
  { id: 2, name: "Royal Black", urdu: "روئیل بلیک", price: "PKR 9,200", fabric: "Saudi Nida", image: "/abayas/2.jpeg", tag: "BESTSELLER" },
  { id: 3, name: "Classic Grace", urdu: "کلاسیک گریس", price: "PKR 7,800", fabric: "Lawn", image: "/abayas/3.jpeg" },
  { id: 4, name: "Eid Special", urdu: "عید سپیشل", price: "PKR 10,500", fabric: "Crepe", image: "/abayas/4.jpeg", tag: "LIMITED" },
  { id: 5, name: "Sophisticated", urdu: "سوفسٹیکیٹڈ", price: "PKR 8,900", fabric: "Premium Nida", image: "/abayas/5.jpeg" },
  { id: 6, name: "Timeless Beauty", urdu: "ٹائملیس بیوٹی", price: "PKR 9,800", fabric: "Saudi Nida", image: "/abayas/6.jpeg" },
];

const MEHNDI_SERVICES = [
  { id: 1, title: "Royal Bridal Package", urdu: "شاہی دلہن پیکج", price: "PKR 15,000", category: "bride", handType: "hand", desc: "Complete bridal mehndi with jaali, arabic, and traditional designs", image: "/mehndi/1.jpeg" },
  { id: 2, title: "Elegant Bride Hands", urdu: "خوبصورت دلہن ہاتھ", price: "PKR 8,000", category: "bride", handType: "hand", desc: "Intricate bridal mehndi for hands only", image: "/mehndi/2.jpeg" },
  { id: 3, title: "Teenage Chic", urdu: "ٹین ایج چک", price: "PKR 3,500", category: "teenage", handType: "hand", desc: "Modern Arabic and trendy designs for teenagers", image: "/mehndi/3.jpeg" },
  { id: 4, title: "Kids Delight", urdu: "بچوں کی خوشی", price: "PKR 2,000", category: "kids", handType: "hand", desc: "Fun and simple designs perfect for children", image: "/mehndi/4.jpeg" },
  { id: 5, title: "Leg Art Bridal", urdu: "پاؤں آرٹ دلہن", price: "PKR 6,000", category: "bride", handType: "leg", desc: "Elegant leg mehndi for brides", image: "/mehndi/5.jpeg" },
  { id: 6, title: "Full Party Look", urdu: "مکمل پارٹی لک", price: "PKR 5,000", category: "teenage", handType: "hand", desc: "Complete hands and feet mehndi for parties", image: "/mehndi/6.jpeg" },
];

const TESTIMONIALS = [
  { name: "Ayesha Khan", city: "Lahore", service: "Bridal Mehndi", text: "Absolutely stunning bridal mehndi! Afshi's attention to detail is unmatched. My wedding mehndi was exactly what I dreamed of." },
  { name: "Fatima Sheikh", city: "Karachi", service: "Abaya", text: "The quality of abayas is exceptional. Perfect stitching, premium fabric, and modest designs. Highly recommend!" },
  { name: "Sara Ahmed", city: "Islamabad", service: "Teenage Mehndi", text: "Beautiful mehndi design for my sister's birthday. The artist was professional and the design lasted for weeks." },
  { name: "Zainab Malik", city: "Faisalabad", service: "Bridal Mehndi", text: "Professional service and stunning designs. The mehndi stayed dark for weeks. Highly recommended for all occasions!" },
  { name: "Noor Fatima", city: "Rawalpindi", service: "Abaya", text: "Elegant abayas with perfect fitting. The fabric quality is amazing and the designs are unique. Will definitely order again!" },
  { name: "Maryam Ali", city: "Multan", service: "Kids Mehndi", text: "My daughter loved her mehndi design! Fun patterns and very gentle artist. She was so happy with the result." },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────────────────── */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return null;
}

/* ─── BUTTON COMPONENTS ───────────────────────────────────────────────────── */
type ButtonSize = "sm" | "md" | "lg";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function PrimaryButton({ children, onClick, size = "md", className = "", type = "button", disabled = false }: ButtonProps) {
  const sizes: Record<ButtonSize, string> = { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3 text-base", lg: "px-10 py-4 text-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold tracking-wide rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, size = "md", className = "", type = "button", disabled = false }: ButtonProps) {
  const sizes: Record<ButtonSize, string> = { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3 text-base", lg: "px-10 py-4 text-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} inline-flex items-center justify-center border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold tracking-wide rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-amber-500 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── NAVIGATION ─────────────────────────────────────────────────────────── */
function Navigation({ onContactOpen }: { onContactOpen: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Abayas", href: "#abayas" },
    { name: "Mehndi", href: "#mehndi" },
    { name: "About", href: "#about" },
    { name: "Contact", action: "contact" },
  ];

  const handleNavClick = (item: any) => {
    if (item.action === "contact") {
      onContactOpen();
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/95 backdrop-blur-2xl border-b border-amber-500/30 py-4 shadow-2xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div onClick={() => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
              <span className="text-white font-serif text-3xl font-light">A</span>
            </div>
            <div>
              <h1 className="font-serif text-3xl tracking-tight text-white">Afshi</h1>
              <p className="text-amber-500 text-xs tracking-[3px] -mt-1">آفشی</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-widest text-gray-300">
            {navItems.map((item) => (
              <button key={item.name} onClick={() => handleNavClick(item)} className="hover:text-amber-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-amber-500 after:w-0 hover:after:w-full after:transition-all">
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <PrimaryButton size="sm" onClick={() => window.open("https://wa.me/923000000000", "_blank")} className="hidden lg:flex">
              WhatsApp
            </PrimaryButton>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-2xl text-white">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-40 lg:hidden pt-24">
            <div className="flex flex-col items-center gap-8 text-xl py-10">
              {navItems.map((item) => (
                <button key={item.name} onClick={() => handleNavClick(item)} className="text-gray-200 hover:text-amber-500">
                  {item.name}
                </button>
              ))}
              <PrimaryButton onClick={() => window.open("https://wa.me/923000000000", "_blank")}>Contact on WhatsApp</PrimaryButton>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex((prev) => (prev + 1) % ABAYAS.length), 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      <div className="absolute inset-0">
        <img src={ABAYAS[currentImageIndex].image} alt="Afshi" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-widest">EID COLLECTION 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.8rem] leading-none text-white mb-6 tracking-tighter min-h-[1.2em]">
            <AnimatedHeroText />
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            Discover handcrafted abayas and exquisite mehndi art that celebrate the beauty of Pakistani culture
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <PrimaryButton size="lg" onClick={() => document.getElementById('abayas')?.scrollIntoView({ behavior: 'smooth' })}>
              Shop Abayas
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => document.getElementById('mehndi')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Mehndi
            </SecondaryButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2K+", label: "Happy Clients" },
              { number: "48", label: "Designs" },
              { number: "100%", label: "Handcrafted" },
              { number: "5★", label: "Rating" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-serif text-amber-500">{stat.number}</div>
                <div className="text-sm text-gray-400 mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
/* Abaya Showcase */

function AbayaShowcase() {
  const [selectedAbaya, setSelectedAbaya] = useState<any>(null);

  return (
    <section id="abayas" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2.5 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-widest">NEW COLLECTION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">Premium <span className="text-amber-500">Abayas</span></h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Meticulously crafted with premium fabrics and timeless modest elegance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ABAYAS.map((abaya, index) => (
            <motion.div
              key={abaya.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              onClick={() => setSelectedAbaya(abaya)}
              className="group relative bg-gray-900 rounded-3xl overflow-hidden cursor-pointer border border-gray-800 hover:border-amber-500/40 transition-all duration-500"
            >
              {abaya.tag && (
                <div className="absolute top-5 left-5 z-10 bg-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {abaya.tag}
                </div>
              )}

              <div className="aspect-[4/5] overflow-hidden">
                <img src={abaya.image} alt={abaya.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="p-7">
                <h3 className="font-serif text-2xl text-white group-hover:text-amber-500 transition-colors">{abaya.name}</h3>
                <p className="text-amber-500 text-sm mt-1">{abaya.fabric}</p>
                <p className="text-3xl font-light text-amber-500 mt-6">{abaya.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProductModal product={selectedAbaya} onClose={() => setSelectedAbaya(null)} />
    </section>
  );
}

function MehndiServices() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMehndi, setSelectedMehndi] = useState<any>(null);

  const categories = [
    { id: "all", name: "All Services" },
    { id: "bride", name: "Bridal" },
    { id: "teenage", name: "Teenage" },
    { id: "kids", name: "Kids" },
  ];

  const filteredServices = activeCategory === "all" 
    ? MEHNDI_SERVICES 
    : MEHNDI_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="mehndi" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2.5 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-widest">TRADITIONAL ART</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">Professional <span className="text-amber-500">Mehndi</span> Art</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Traditional and contemporary designs by expert artists.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full font-medium tracking-wide transition-all ${activeCategory === cat.id 
                ? "bg-amber-500 text-black shadow-lg" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-amber-500/30 border border-gray-700"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedMehndi(service)}
              className="bg-gray-900 border border-gray-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                  {service.handType === "hand" ? "Hands" : "Legs"}
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-serif text-2xl text-white mb-2">{service.title}</h3>
                <p className="text-amber-500 text-sm mb-4">{service.urdu}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>

                <div className="flex justify-between items-center">
                  <span className="text-3xl font-light text-amber-500">{service.price}</span>
                  <PrimaryButton size="sm" onClick={() => window.open("https://wa.me/923000000000", "_blank")}>
                    Book Now
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProductModal product={selectedMehndi} onClose={() => setSelectedMehndi(null)} />
    </section>
  );
}



/* ─── TESTIMONIALS ─────────────────────────────────────────────── */
function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = TESTIMONIALS.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visibleTestimonials.length]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + visibleTestimonials.length) % visibleTestimonials.length);
    
    // Mobile detection based on viewport width
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const offset = isMobile ? 280 : 380;
    const farOffset = isMobile ? 520 : 720;
    
    if (normalizedDiff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30 };
    } else if (normalizedDiff === 1 || normalizedDiff === -5) {
      return { x: offset, scale: 0.82, opacity: 0.4, zIndex: 20 };
    } else if (normalizedDiff === 2 || normalizedDiff === -4) {
      return { x: farOffset, scale: 0.65, opacity: 0.15, zIndex: 10 };
    } else if (normalizedDiff === visibleTestimonials.length - 1 || normalizedDiff === -1) {
      return { x: -offset, scale: 0.82, opacity: 0.4, zIndex: 20 };
    } else if (normalizedDiff === visibleTestimonials.length - 2 || normalizedDiff === -2) {
      return { x: -farOffset, scale: 0.65, opacity: 0.15, zIndex: 10 };
    }
    return { x: 0, scale: 0.5, opacity: 0, zIndex: 0 };
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2.5 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-widest">CLIENT LOVE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            What Our <span className="text-amber-500">Clients</span> Say
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real stories from satisfied customers across Pakistan who trust Afshi for their special moments
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[380px] sm:h-[420px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex items-center justify-center px-4 sm:px-0">
            {visibleTestimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              return (
                <motion.div
                  key={index}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    rotateY: style.x * 0.04,
                  }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute top-1/2 left-0 right-0 mx-auto w-full max-w-md -translate-y-1/2"
                  style={{ zIndex: style.zIndex }}
                >
                  <div className={`bg-gray-900/95 backdrop-blur-md border-2 ${index === activeIndex ? 'border-amber-500/60 shadow-amber-500/20' : 'border-gray-700/50'} rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col h-[340px] sm:h-[360px] md:h-[380px] transition-all duration-500 shadow-2xl`}>
                    {/* Quote Icon */}
                    <div className="text-amber-500/30 text-5xl font-serif text-center mb-4 leading-none">"</div>

                    <div className="flex mb-6 gap-1.5 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.span 
                          key={i} 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="text-amber-500 text-lg"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    <p className="text-gray-300 text-base leading-[1.8] italic flex-grow text-center px-2">
                      {testimonial.text}
                    </p>

                    <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                      <div className="font-semibold text-white text-lg tracking-wide">{testimonial.name}</div>
                      <div className="text-sm text-gray-400 flex items-center justify-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                        {testimonial.city}
                        <span className="text-gray-600">•</span>
                        <span className="text-amber-500/80">{testimonial.service}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {visibleTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-amber-500 w-8' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION - REFINED (More Elegant) ──────────────────────────────── */
function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }} 
      />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-6 py-2.5 mb-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium tracking-widest">GET STARTED TODAY</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tighter mb-8">
          Ready to Experience <span className="font-medium">Excellence?</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 px-4 sm:px-0">
          Get in touch with us today for custom abayas or to book your mehndi appointment. 
          Let us bring your vision to life with expert craftsmanship.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <PrimaryButton
            size="lg"
            onClick={() => window.open("https://wa.me/923000000000", "_blank")}
            className="bg-white text-amber-700 hover:bg-amber-100 min-w-[220px] shadow-xl"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </span>
          </PrimaryButton>

          <SecondaryButton
            size="lg"
            className="border-white text-white hover:bg-white hover:text-amber-700 min-w-[220px]"
          >
            Call Now
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER - REFINED ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-serif text-4xl font-light">A</span>
              </div>
              <div>
                <h3 className="font-serif text-4xl text-white tracking-tight">Afshi</h3>
                <p className="text-amber-500 text-xs tracking-[3px]">آفشی</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed mx-auto lg:mx-0">
              Your destination for premium abayas and exquisite mehndi art. 
              Serving Pakistan with love and timeless craftsmanship.
            </p>

            <div className="flex gap-6 mt-10 justify-center lg:justify-start">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {['About Us', 'Our Services', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-amber-500 transition-colors block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <h4 className="text-white font-medium mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3 justify-center lg:justify-start">
                <span className="flex-shrink-0 mt-0.5">📍</span>
                <span>Faisalabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="flex-shrink-0">📱</span>
                <span>+92-300-0000000</span>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="flex-shrink-0">✉️</span>
                <span>info@afshi.com</span>
              </li>
            </ul>

            <PrimaryButton 
              className="mt-10 w-full sm:w-auto" 
              onClick={() => window.open("https://wa.me/923000000000", "_blank")}
            >
              Message on WhatsApp
            </PrimaryButton>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-20 pt-8 text-center text-gray-500 text-sm">
          © 2026 Afshi. All rights reserved. Made with ❤️ in Pakistan
        </div>
      </div>
    </footer>
  );
}

/* ─── REFINED ANIMATED MODAL ──────────────────────────────────────────────── */
function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
      <div className="fixed inset-0 z-[50] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xl" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.23, 1.0, 0.32, 1] }}
          className="bg-gray-900 rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 h-full md:h-[600px]">
            {/* Image */}
            <div className="h-48 sm:h-64 md:h-full overflow-hidden relative">
              <img src={product.image} alt={product.name || product.title} className="w-full h-full object-cover" />
              {(product.tag || product.handType) && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-amber-500 text-black px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-bold">
                  {product.tag || (product.handType === "hand" ? "Hands" : "Legs")}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col relative overflow-y-auto">
              <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 lg:top-8 lg:right-8 text-2xl sm:text-3xl text-gray-400 hover:text-white transition z-10">✕</button>

              <div className="flex-1 pr-8">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3">{product.name || product.title}</h2>
                <p className="text-lg sm:text-xl md:text-2xl text-amber-500 mb-2">{product.urdu}</p>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{product.fabric || product.desc}</p>

                <div className="mt-6 sm:mt-8 md:mt-12">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-light text-amber-500">{product.price}</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-auto pt-6 sm:pt-8 md:pt-12 space-y-3 sm:space-y-4">
                <PrimaryButton size="lg" className="w-full py-3 sm:py-4 text-base sm:text-lg" onClick={() => window.open("https://wa.me/923000000000", "_blank")}>
                  {product.fabric ? "Order on WhatsApp" : "Book on WhatsApp"}
                </PrimaryButton>
                <SecondaryButton size="lg" className="w-full py-3 sm:py-4 text-base sm:text-lg" onClick={onClose}>
                  Continue Shopping
                </SecondaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}

/* ─── ABOUT SECTION ───────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2.5 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-widest">OUR STORY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
            About <span className="text-amber-500">Afshi</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Where tradition meets elegance in every stitch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-6">Our Journey</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Afshi was born from a passion for preserving the beauty of Pakistani culture while embracing modern elegance. We believe that modest fashion should never compromise on style, and every abaya we create tells a story of craftsmanship and dedication.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our mehndi artists bring years of expertise, blending traditional techniques with contemporary designs to create stunning patterns for every occasion - from intimate gatherings to grand celebrations.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif text-amber-500 mb-2">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif text-amber-500 mb-2">2K+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-serif text-amber-500 mb-2">100%</div>
                <div className="text-sm text-gray-400">Handcrafted</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Premium Quality</h4>
              <p className="text-sm text-gray-400">Only the finest fabrics for our abayas</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Custom Designs</h4>
              <p className="text-sm text-gray-400">Tailored to your unique preferences</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Bridal Expert</h4>
              <p className="text-sm text-gray-400">Specialized in bridal mehndi art</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Satisfaction</h4>
              <p className="text-sm text-gray-400">100% client satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT MODAL ───────────────────────────────────────────────────────── */
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you soon.');
      onClose();
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.23, 1.0, 0.32, 1] }}
            className="bg-gray-900 rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-white">Contact Us</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition text-2xl">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                    placeholder="+92 3XX XXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </PrimaryButton>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-400 text-sm mb-3">Or reach us directly</p>
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* WhatsApp Float Button */
function WhatsAppFloat() {
  return (
    <button
      onClick={() => window.open("https://wa.me/923000000000", "_blank")}
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </button>
  );
}

/* Main Component */
export default function AfshiWebsite() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <FontLoader />
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>

      <Navigation onContactOpen={() => setContactModalOpen(true)} />
      <Hero />
      <AbayaShowcase />
      <MehndiServices />
      <Testimonials />
      <AboutSection />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}

