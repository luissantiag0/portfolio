import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import LoadingScreen from './components/LoadingScreen';
import Helmet from './components/Helmet';
import { ArrowUp, ShieldCheck, Terminal } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

// Lazy loaded heavy functional overlays
const ContactModal = lazy(() => import('./components/ContactModal'));
const CVModal = lazy(() => import('./components/CVModal'));

export default function App() {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  // Prevent scrolling when loading screen or CV modal is active
  useEffect(() => {
    if (isLoading || isCVModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isLoading, isCVModalOpen]);

  // Expose global contact modal opener
  useEffect(() => {
    (window as any).openContactModal = () => {
      setIsContactModalOpen(true);
    };
    (window as any).openCVModal = () => {
      setIsCVModalOpen(true);
    };
    return () => {
      delete (window as any).openContactModal;
      delete (window as any).openCVModal;
    };
  }, []);

  // Synchronize Dark Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Track scrolling active section for active tab highlights & Float Button visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle top button visibility
      setShowScrollTop(window.scrollY > 500);

      const sections = ['inicio', 'sobre-me', 'tecnologias', 'proyectos', 'contacto'];
      const scrollPosition = window.scrollY + 200; // Offset top buffer area

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerBio = language === 'es'
    ? 'Estudiante de Desarrollo de Aplicaciones Web (DAW). Enfocado en código de alta integridad y optimización para sentar una base profesional sólida.'
    : 'Web Applications Development (DAW) associate degree student. Focused on clean code patterns, relational databases, and structural efficiency.';

  return (
    <div id="app-root-container" className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-300">
      
      {/* Dynamic SEO & Document Title Manager */}
      <Helmet activeSection={activeSection} />

      {/* Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} />

      {/* Main Sections with intersection reveals */}
      <main id="app-main-content">
        <Hero />
        <AboutMe />
        <Technologies />
        <Projects />
        <ContactForm />
      </main>

      {/* Lazy Loaded Overlays wrapped in Suspense */}
      <Suspense fallback={null}>
        {/* Direct Contact Modal Overlay */}
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

        {/* CV Modal Overlay */}
        <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      </Suspense>

      {/* Footer Area */}
      <footer id="app-footer" className="bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200/50 dark:border-white/5 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Identity block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 px-2.5 bg-sky-500 text-black rounded-xl font-mono text-[11px] font-extrabold">LS</div>
              <span className="font-sans font-bold text-base text-zinc-900 dark:text-white">Luis Santiago</span>
              <span className="text-[10px] bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full font-mono py-0.5 px-2">DAW</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-slate-400 max-w-sm leading-relaxed font-semibold">
              {footerBio}
            </p>
          </div>

          {/* Quick links map */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-2.5 text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">{language === 'es' ? 'Navegación' : 'Navigation'}</span>
              <ul className="space-y-1.5 text-xs text-zinc-650 dark:text-slate-400 font-bold">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-sky-500 cursor-pointer transition-colors">
                    {language === 'es' ? 'Inicio' : 'Home'}
                  </button>
                </li>
                <li>
                  <a href="#sobre-me" className="hover:text-sky-500 transition-colors">{language === 'es' ? 'Sobre mí' : 'About Me'}</a>
                </li>
                <li>
                  <a href="#tecnologias" className="hover:text-sky-500 transition-colors">{language === 'es' ? 'Tecnologías' : 'Stack'}</a>
                </li>
                <li>
                  <a href="#proyectos" className="hover:text-sky-500 transition-colors">{language === 'es' ? 'Proyectos' : 'Projects'}</a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">{language === 'es' ? 'Áreas Clave' : 'Inquiries'}</span>
              <ul className="space-y-1.5 text-xs text-zinc-655 dark:text-slate-400 font-bold">
                <li>
                  <button onClick={() => { if ((window as any).openContactModal) (window as any).openContactModal(); }} className="hover:text-sky-400 cursor-pointer transition-colors text-left">
                    {language === 'es' ? 'Contacto Directo' : 'Direct Call'}
                  </button>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-sky-400 transition-colors">{language === 'es' ? 'Formulario Web' : 'Web Mailer'}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Verification labels */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">{language === 'es' ? 'Compromiso Técnico' : 'Technical Quality'}</span>
            <div className="p-4 bg-zinc-50 dark:bg-[#0A0A0A] border border-zinc-200/40 dark:border-white/5 rounded-2xl text-[10.5px] text-zinc-550 dark:text-slate-400 space-y-2 font-medium">
              <div className="flex items-center space-x-1.5 text-sky-600 dark:text-sky-400 font-bold">
                <ShieldCheck size={14} />
                <span>{language === 'es' ? 'Normas de Calidad' : 'Quality Standards'}</span>
              </div>
              <p className="leading-normal">
                {language === 'es'
                  ? 'Interfaces semánticas, cumplimiento estricto del responsive, control total de flujos relacionales en bases de datos.'
                  : 'Semantic layouts, total mobile-first compliance, and optimal relational constraints.'}
              </p>
            </div>
          </div>

        </div>

        {/* Copywrite absolute bar */}
        <div className="max-w-7xl mx-auto px-6 border-t border-zinc-200/50 dark:border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <span>© {new Date().getFullYear()} Luis Santiago Dev. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
          <div className="flex items-center space-x-2">
            <Terminal size={12} className="text-emerald-450" />
            <span>{language === 'es' ? 'Código Validado de Forma Segura' : 'Source Code Securely Verified'}</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="back-to-top-button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-sky-500 hover:bg-sky-400 text-black rounded-xl shadow-lg cursor-pointer z-40 transition-colors border border-sky-450"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
