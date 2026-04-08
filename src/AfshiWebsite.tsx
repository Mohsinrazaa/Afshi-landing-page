import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
};

function PrimaryButton({ children, onClick, size = "md", className = "" }: ButtonProps) {
  const sizes: Record<ButtonSize, string> = { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3 text-base", lg: "px-10 py-4 text-lg" };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold tracking-wide rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, size = "md", className = "" }: ButtonProps) {
  const sizes: Record<ButtonSize, string> = { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3 text-base", lg: "px-10 py-4 text-lg" };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} inline-flex items-center justify-center border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold tracking-wide rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── NAVIGATION ─────────────────────────────────────────────────────────── */
function Navigation() {
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
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/95 backdrop-blur-2xl border-b border-amber-500/30 py-4 shadow-2xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div onClick={() => handleScrollTo("#home")} className="flex items-center gap-3 cursor-pointer group">
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
              <button key={item.name} onClick={() => handleScrollTo(item.href)} className="hover:text-amber-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-amber-500 after:w-0 hover:after:w-full after:transition-all">
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
                <button key={item.name} onClick={() => handleScrollTo(item.href)} className="text-gray-200 hover:text-amber-500">
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

          <h1 className="font-serif text-6xl md:text-7xl lg:text-[5.8rem] leading-none text-white mb-6 tracking-tighter">
            Where <span className="text-amber-500">Elegance</span> Meets Tradition
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
    <section id="abayas" className="py-28 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-6">
            <span className="text-amber-500 text-sm font-medium tracking-widest">NEW COLLECTION</span>
          </div>
          <h2 className="font-serif text-6xl text-white">Premium Abayas</h2>
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
/* Mehndi Services */
// function MehndiServices() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const categories = [
//     { id: "all", name: "All Services" },
//     { id: "bride", name: "Bridal" },
//     { id: "teenage", name: "Teenage" },
//     { id: "kids", name: "Kids" }
//   ];

//   const filteredServices = activeCategory === "all"
//     ? MEHNDI_SERVICES
//     : MEHNDI_SERVICES.filter(s => s.category === activeCategory);

//   return (
//     <section id="mehndi" className="py-24 bg-gradient-to-b from-black via-gray-900 to-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-20 px-4">
//           <div className="inline-flex items-center justify-center gap-2 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-2 mb-6">
//             <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
//             <span className="text-amber-500 text-sm font-medium tracking-wide">TRADITIONAL ART</span>
//           </div>
//           <h2 className="text-5xl sm:text-6xl font-serif text-white mb-6 leading-tight text-center">
//             Professional <span className="text-amber-500 font-medium">Mehndi</span> Art
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
//             Traditional and contemporary mehndi designs by expert artists,
//             bringing centuries-old artistry to your special occasions
//           </p>
//         </div>

//         {/* Category Tabs */}
//         <div className="flex flex-wrap justify-center gap-3 mb-16">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className={`px-7 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center ${activeCategory === category.id
//                 ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25 border-0'
//                 : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-gray-700 hover:border-amber-500/30'
//                 }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//           {filteredServices.map((service) => (
//             <div key={service.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-700 group border border-gray-700 hover:border-amber-500/30 transform hover:-translate-y-2">
//               {/* Image */}
//               <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-black relative">
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
//                   {service.handType === "hand" ? "✋ Hands" : "🦶 Legs"}
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               </div>

//               {/* Content */}
//               <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col h-full">
//                 <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-500 transition-colors duration-300 leading-tight">{service.title}</h3>
//                 <p className="text-gray-400 text-sm mb-3 italic">{service.urdu}</p>
//                 <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-grow">{service.desc}</p>
//                 <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-auto">
//                   <span className="text-2xl font-serif text-amber-500 font-light leading-none">{service.price}</span>
//                   <PrimaryButton size="sm" onClick={() => window.open("https://wa.me/923000000000", "_blank")}>
//                     Book Now
//                   </PrimaryButton>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


function MehndiServices() {
  const [activeCategory, setActiveCategory] = useState("all");

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
    <section id="mehndi" className="py-28 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-6">
            <span className="text-amber-500 text-sm font-medium tracking-widest">TRADITIONAL ART</span>
          </div>
          <h2 className="font-serif text-6xl text-white">Professional Mehndi Art</h2>
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
              className="bg-gray-900 border border-gray-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-500"
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
    </section>
  );
}



/* ─── TESTIMONIALS ─────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="py-28 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2.5 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-500 text-sm font-medium tracking-widest">CLIENT LOVE</span>
          </div>
          <h2 className="font-serif text-6xl text-white tracking-tight">
            What Our <span className="text-amber-500">Clients</span> Say
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real stories from satisfied customers across Pakistan who trust Afshi for their special moments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/40 rounded-3xl p-10 flex flex-col h-full transition-all duration-500 group"
            >
              <div className="flex mb-8 gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-500 text-2xl">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-[17px] leading-relaxed italic flex-grow group-hover:text-gray-100 transition-colors">
                "{testimonial.text}"
              </p>

              <div className="mt-10 pt-8 border-t border-gray-800 text-center">
                <div className="font-medium text-white text-lg">{testimonial.name}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  {testimonial.city} • {testimonial.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION - REFINED (More Elegant) ──────────────────────────────── */
function CTASection() {
  return (
    <section className="py-28 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 relative overflow-hidden">
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

        <h2 className="font-serif text-6xl md:text-7xl text-white leading-tight tracking-tighter mb-8">
          Ready to Experience <span className="font-medium">Excellence?</span>
        </h2>

        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
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
    <footer className="bg-black border-t border-gray-900 py-20">
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
  if (!product) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [product]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.4, ease: [0.23, 1.0, 0.32, 1] }}
          className="bg-gray-900 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-[4/5] overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.tag && (
                <div className="absolute top-6 left-6 bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-12 flex flex-col">
              <button onClick={onClose} className="absolute top-8 right-8 text-3xl text-gray-400 hover:text-white transition">✕</button>

              <div className="flex-1">
                <h2 className="font-serif text-4xl text-white mb-3">{product.name}</h2>
                <p className="text-2xl text-amber-500 mb-2">{product.urdu}</p>
                <p className="text-gray-400">{product.fabric}</p>

                <div className="mt-12">
                  <p className="text-5xl font-light text-amber-500">{product.price}</p>
                </div>
              </div>

              <div className="mt-auto pt-12 space-y-4">
                <PrimaryButton size="lg" className="w-full py-4 text-lg" onClick={() => window.open("https://wa.me/923000000000", "_blank")}>
                  Order on WhatsApp
                </PrimaryButton>
                <SecondaryButton size="lg" className="w-full py-4 text-lg" onClick={onClose}>
                  Continue Shopping
                </SecondaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
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

      <Navigation />
      <Hero />
      <AbayaShowcase />
      <MehndiServices />
      <Testimonials />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

