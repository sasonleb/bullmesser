/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  MessageCircle, 
  Phone, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Zap, 
  Target, 
  MousePointer2, 
  TrendingUp, 
  Award, 
  Clock, 
  Users,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const WHATSAPP_NUMBER = "972500000000"; // Placeholder
const PHONE_NUMBER = "050-000-0000"; // Placeholder
const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8b6b0e3f9e.mp3";

const GALLERY_IMAGES = [
  '/01.jpg',
  '/02.jpg',
  '/03.jpg',
  '/04.jpg',
  '/05.jpg'
];

const PACKAGES = [
  {
    name: "START",
    stars: 1,
    price: "300 ₪",
    desc: "פלייר אחד מעוצב",
    icon: <Star className="text-brand-orange" />
  },
  {
    name: "BOOST",
    stars: 2,
    price: "400 ₪",
    desc: "2 פלאיירים",
    icon: <Zap className="text-brand-orange" />
  },
  {
    name: "IMPACT",
    stars: 3,
    price: "500 ₪",
    desc: "3 פלאיירים + לוגו מתנה",
    icon: <Award className="text-brand-orange" />,
    highlight: true
  }
];

const CHART_DATA = [
  { name: 'לפני', value: 20, fill: '#64748b' },
  { name: 'אחרי', value: 85, fill: '#f27d26' },
];

// --- Components ---

const SplashLoader = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] text-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
          3 פלייארים לעסק <br />
          <span className="text-brand-orange">+ לוגו מתנה</span> <br />
          ב־500 ש"ח בלבד!
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 bg-brand-orange text-white rounded-full text-xl font-bold shadow-[0_0_30px_rgba(242,125,38,0.4)] hover:shadow-[0_0_50px_rgba(242,125,38,0.6)] transition-all flex items-center gap-3 mx-auto"
        >
          לחץ כאן לפרטים נוספים!
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-orange/10 blur-[120px] rounded-full" />
    </motion.div>
  );
};

const FloatingButtons = () => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        whileHover={{ scale: 1.1, x: 5 }}
        className="w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-orange/30 border border-white/20"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, x: 5 }}
        className="w-14 h-14 bg-brand-whatsapp rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-whatsapp/30 border border-white/20 animate-pulse-whatsapp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-[#020617]/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
    )} dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="בול מסר" className="h-12 w-12 rounded-lg object-cover border border-white/20" />
          <span className="text-2xl font-black tracking-tighter text-white">בול מסר</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#gallery" className="hover:text-brand-orange transition-colors">גלריה</a>
          <a href="#process" className="hover:text-brand-orange transition-colors">תהליך</a>
          <a href="#packages" className="hover:text-brand-orange transition-colors">חבילות</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">אודות</a>
          <a href="#contact" className="px-5 py-2 glass rounded-full hover:bg-white/20 transition-all">צור קשר</a>
        </nav>
        
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  const text = "מודעות שיווקיות חכמות שמושכות תשומת לב ומביאות פניות אמיתיות לעסק שלך.";
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden" dir="rtl">
      <div className="max-w-4xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-brand-orange mb-4">⭐ מבצע השקה מיוחד!</h2>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight">
            3 פלאיירים לעסק <br />
            ב־500 ₪ בלבד <br />
            <span className="text-brand-orange">+ לוגו מתנה!</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg md:text-2xl text-white/80 mb-12 h-16 md:h-auto"
        >
          {displayText}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="w-full md:w-auto px-8 py-4 bg-brand-whatsapp text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-brand-whatsapp/20 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            שלח הודעת וואטסאפ עכשיו
          </a>
          <a 
            href="#gallery"
            className="w-full md:w-auto px-8 py-4 glass text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
          >
            צפה בגלריית העבודות
          </a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 right-[10%] w-32 h-32 glass rounded-2xl -z-0 hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-1/4 left-[10%] w-48 h-48 glass rounded-full -z-0 hidden lg:block"
      />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/20 blur-[150px] rounded-full -z-10" />
    </section>
  );
};

const ValueSection = () => {
  const items = [
    { title: "הבנת העסק", icon: <Target className="w-8 h-8" /> },
    { title: "בניית מסר שיווקי", icon: <MessageCircle className="w-8 h-8" /> },
    { title: "עיצוב מודעה ממיר", icon: <Zap className="w-8 h-8" /> },
    { title: "קבצים מוכנים לפרסום", icon: <CheckCircle2 className="w-8 h-8" /> },
  ];

  return (
    <section className="py-24 px-6 bg-[#020617]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">הופכים כל רעיון שלכם <br /> למודעה שעובדת!</h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              אנחנו יוצרים מסרים שיווקיים חכמים שמדברים ללקוח הנכון.
              לא מתמקדים רק בעיצוב יפה — אלא ביצירת מודעות שמביאות פניות אמיתיות.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="text-brand-orange">{item.icon}</div>
                  <span className="font-bold">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-brand-blue to-brand-orange/20 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-8xl font-black text-white/10 absolute inset-0 flex items-center justify-center pointer-events-none">BUL MASAR</div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10"
                >
                  <img src="/logo.jpg" alt="Value" className="w-64 h-64 rounded-full shadow-2xl border-4 border-white/20" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });

  return (
    <section id="gallery" className="py-24 bg-brand-blue relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center">גלריית מודעות ממירות לעסקים</h2>
      </div>
      
      <div className="relative group">
        {/* Side Blurs */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-brand-blue to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-brand-blue to-transparent z-20 pointer-events-none" />

        <motion.div 
          ref={scrollRef}
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          className="flex gap-8 px-[10%] md:px-[25%] cursor-grab active:cursor-grabbing no-scrollbar overflow-x-auto"
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-shrink-0 w-[280px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 relative"
            >
              <img src={img} alt={`Work ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-12 flex justify-center gap-3">
        {GALLERY_IMAGES.map((_, i) => (
          <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === 0 ? "bg-brand-orange w-8" : "bg-white/20")} />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.05)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
};

const PrinciplesSection = () => {
  const principles = [
    { title: "תשומת לב", desc: "משיכת עין ראשונית" },
    { title: "מסר ברור", desc: "יצירת עניין והבנה" },
    { title: "הנעה לפעולה", desc: "יצירת רצון ופעולה" },
  ];

  return (
    <section className="py-24 px-6 bg-[#020617]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16">איך מודעה טובה מביאה לקוחות?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 glass rounded-3xl text-center relative overflow-hidden group"
            >
              <div className="text-6xl font-black text-white/5 absolute -top-4 -right-4 group-hover:text-brand-orange/10 transition-colors">0{idx+1}</div>
              <h3 className="text-2xl font-bold mb-4 text-brand-orange">{p.title}</h3>
              <p className="text-white/70">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">1</div>
            <span>משיכת עין</span>
          </div>
          <ChevronRight className="hidden md:block text-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">2</div>
            <span>יצירת עניין</span>
          </div>
          <ChevronRight className="hidden md:block text-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">3</div>
            <span>יצירת רצון</span>
          </div>
          <ChevronRight className="hidden md:block text-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">4</div>
            <span>פעולה</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 px-6 bg-brand-blue/30" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">מחקרים מוכיחים — <br /> שיווק חכם מביא יותר לקוחות!</h2>
            <p className="text-xl text-white/70 mb-8">
              הנתונים לא משקרים. מודעה שמעוצבת נכון עם מסר שיווקי מדויק מעלה את אחוזי ההמרה בעשרות אחוזים.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between mb-1">
                <span>המרות ולידים</span>
                <span className="text-brand-orange">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  className="bg-brand-orange h-2 rounded-full"
                />
              </div>
            </div>
          </div>
          
          <div className="h-[400px] glass rounded-3xl p-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#003060', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-4 text-sm text-white/50">גידול משמעותי בפניות לאחר מיתוג מחדש</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="packages" className="py-24 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">חבילות שירות</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={cn(
                "p-8 rounded-3xl flex flex-col items-center text-center transition-all relative overflow-hidden",
                pkg.highlight ? "bg-brand-orange text-white shadow-2xl shadow-brand-orange/30 scale-105 z-10" : "glass text-white"
              )}
            >
              {pkg.highlight && (
                <div className="absolute top-4 left-4 bg-white text-brand-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  הכי משתלם
                </div>
              )}
              <div className="mb-6 p-4 rounded-2xl bg-white/10">
                {pkg.icon}
              </div>
              <h3 className="text-3xl font-black mb-2">{pkg.name}</h3>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: pkg.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-5xl font-black mb-6">{pkg.price}</div>
              <p className="text-lg mb-8 opacity-80">{pkg.desc}</p>
              
              <ul className="text-right w-full space-y-3 mb-10 opacity-90">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> ליווי אישי</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> כתיבה שיווקית</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> עיצוב מקצועי</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> קבצים מוכנים לפרסום</li>
              </ul>

              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=היי, אני מעוניין בחבילת ${pkg.name}`}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-lg transition-all",
                  pkg.highlight ? "bg-white text-brand-orange hover:bg-white/90" : "bg-brand-orange text-white hover:shadow-[0_0_20px_rgba(242,125,38,0.4)]"
                )}
              >
                הזמן עכשיו
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-brand-blue/20" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-orange/20 blur-2xl rounded-full" />
              <img src="/logo.jpg" alt="About" className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border border-white/10" />
            </div>
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black mb-8">אודות בול מסר</h2>
            <div className="space-y-6 text-xl text-white/70 leading-relaxed">
              <p>ניסיון של שנים בעיצוב ושיווק דיגיטלי, עם התמחות ביצירת מסרים שחודרים את הרעש הדיגיטלי.</p>
              <p>שיטת העבודה שלנו מבוססת על מודל ה-AIDA: <br /> 
                <span className="text-brand-orange font-bold">תשומת לב ← עניין ← תשוקה ← הנעה לפעולה</span>
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4"><CheckCircle2 className="text-brand-orange" /> התאמה מדויקת לקהל הישראלי</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="text-brand-orange" /> מסרים ממוקדי מכירה ותוצאות</li>
                <li className="flex items-center gap-4"><CheckCircle2 className="text-brand-orange" /> ליווי צמוד עד להשקה המוצלחת</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-transparent to-brand-blue/30" dir="rtl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">רוצים לקבל יותר פניות לעסק?</h2>
        <p className="text-xl text-white/70 mb-12">הצטרפו למאות עסקים שכבר נהנים ממיתוג שיווקי שעובד בשבילם.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 glass rounded-3xl">
            <Phone className="w-10 h-10 text-brand-orange mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">טלפון</h3>
            <p className="text-2xl font-black">{PHONE_NUMBER}</p>
          </div>
          <div className="p-8 glass rounded-3xl">
            <MessageCircle className="w-10 h-10 text-brand-whatsapp mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">וואטסאפ</h3>
            <p className="text-2xl font-black">זמינות מהירה</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 text-white/50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>שעות פעילות: א'-ה' 09:00-18:00, ו' 09:00-13:00</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-[#020617]" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-black">בול מסר</span>
        </div>
        
        <div className="text-white/50 text-sm">
          © {new Date().getFullYear()} בול מסר - כל הזכויות שמורות. עיצוב ושיווק פרימיום.
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-white/50 hover:text-white transition-colors"><MessageCircle className="w-6 h-6" /></a>
          <a href="#" className="text-white/50 hover:text-white transition-colors"><Phone className="w-6 h-6" /></a>
        </div>
      </div>
    </footer>
  );
};

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 glass rounded-2xl p-4 flex items-center justify-around shadow-2xl border border-white/20">
      <a href="#gallery" className="flex flex-col items-center gap-1 text-xs font-bold text-white/70">
        <Target className="w-5 h-5" />
        גלריה
      </a>
      <a href="#packages" className="flex flex-col items-center gap-1 text-xs font-bold text-white/70">
        <Zap className="w-5 h-5" />
        חבילות
      </a>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex flex-col items-center gap-1 text-xs font-bold text-brand-whatsapp">
        <MessageCircle className="w-6 h-6" />
        וואטסאפ
      </a>
      <a href="#contact" className="flex flex-col items-center gap-1 text-xs font-bold text-white/70">
        <Phone className="w-5 h-5" />
        צור קשר
      </a>
    </div>
  );
};

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <div className="relative selection:bg-brand-orange selection:text-white">
      <audio ref={audioRef} src={AUDIO_URL} loop />
      
      <AnimatePresence>
        {!isStarted && <SplashLoader onStart={handleStart} />}
      </AnimatePresence>

      {isStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <FloatingButtons />
          
          <main>
            <Hero />
            <ValueSection />
            <GallerySection />
            <PrinciplesSection />
            <StatsSection />
            <PricingSection />
            <AboutSection />
            <ContactSection />
          </main>
          
          <Footer />
          <MobileNav />
        </motion.div>
      )}

      {/* Background Cinematic Effects */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-cinematic opacity-50" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue/20 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 blur-[150px] rounded-full"
        />
      </div>
    </div>
  );
}
