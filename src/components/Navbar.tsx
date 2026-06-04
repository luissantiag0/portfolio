import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Sun, Moon, Terminal, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
}

export default function Navbar({ darkMode, setDarkMode, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.inicio'), id: 'inicio' },
    { label: t('nav.aboutme'), id: 'sobre-me' },
    { label: t('nav.technologies'), id: 'tecnologias' },
    { label: t('nav.projects'), id: 'proyectos' },
    { label: t('nav.contacto'), id: 'contacto' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === 'contacto') {
      if ((window as any).openContactModal) {
        (window as any).openContactModal();
        return;
      }
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleToggleTheme = () => {
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setDarkMode(!darkMode);
      });
    } else {
      setDarkMode(!darkMode);
    }
  };

  const handleToggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand/Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick('inicio')}
          className="flex items-center space-x-2 text-zinc-900 dark:text-white cursor-pointer group"
        >
          <div className="p-2 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-xl shadow-md text-white group-hover:scale-105 transition-transform duration-300">
            <Terminal size={18} />
          </div>
          <span className="font-sans font-bold text-lg tracking-tight">
            Luis<span className="text-sky-500 dark:text-sky-400">Santiago</span>
          </span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-805/80 dark:bg-sky-500/10 text-zinc-600 dark:text-sky-400 font-mono py-0.5 px-2 rounded-full border border-zinc-200/50 dark:border-sky-500/20">
            DAW
          </span>
        </button>

        {/* Desktop Navigation */}
        <div id="desktop-nav-items" className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-zinc-100/80 dark:bg-white/5 p-1.5 rounded-full border border-zinc-200/40 dark:border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-full cursor-pointer ${
                  isActive
                    ? 'text-white dark:text-black font-semibold'
                    : 'text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-zinc-900 dark:bg-sky-500 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div id="nav-actions" className="hidden md:flex items-center space-x-3.5">
          {/* Universal Language Switcher Button */}
          <button
            id="nav-language-toggle"
            onClick={handleToggleLanguage}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-mono font-bold border border-zinc-200 dark:border-white/10 text-zinc-650 dark:text-slate-350 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            title="Switch Language / Cambiar Idioma"
          >
            <Globe size={14} className="text-zinc-400 dark:text-slate-455 group-hover:animate-spin" />
            <span className="uppercase text-[10.5px]">{language === 'es' ? 'English' : 'Español'}</span>
          </button>

          <button
            id="theme-toggle"
            onClick={handleToggleTheme}
            className="p-2 rounded-xl text-zinc-600 dark:text-slate-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-white/5 dark:hover:text-white transition-all cursor-pointer border border-transparent hover:border-zinc-200/50 dark:hover:border-white/10"
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            id="nav-cv-trigger"
            onClick={() => {
              if ((window as any).openCVModal) {
                (window as any).openCVModal();
              }
            }}
            className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer border border-sky-500/20 shadow-sm hover:shadow-md duration-300"
          >
            <FileText size={13} />
            <span>{t('nav.download_cv')}</span>
          </button>

          <button
            id="nav-cta"
            onClick={() => handleNavClick('contacto')}
            className="px-4 py-2 border border-sky-500/50 text-sky-600 dark:text-sky-400 bg-transparent hover:bg-sky-500/10 text-xs font-semibold rounded-full shadow-sm transition-all hover:shadow-md cursor-pointer duration-300"
          >
            {t('nav.hire_me')}
          </button>
        </div>

        {/* Mobile Menu Toggle & Theme Toggle combo */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Language Switcher button badge */}
          <button
            id="mobile-language-switcher"
            onClick={handleToggleLanguage}
            className="px-2.5 py-1.5 text-[10.5px] font-mono font-black uppercase text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer border border-zinc-200/60 dark:border-white/10 rounded-lg bg-zinc-50 dark:bg-white/5"
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            id="mobile-theme-toggle"
            onClick={handleToggleTheme}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
            aria-label="Menú principal"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 px-6 py-4 flex flex-col space-y-3 overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                      : 'text-zinc-600 dark:text-slate-400 hover:bg-zinc-50 dark:hover:bg-white/5 md:hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 bg-sky-550 dark:bg-sky-450 rounded-full" />}
                </button>
              );
            })}
            
            <button
              id="mobile-nav-cv-trigger"
              onClick={() => {
                setIsOpen(false);
                if ((window as any).openCVModal) {
                  (window as any).openCVModal();
                }
              }}
              className="w-full text-center py-3 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-805 dark:text-zinc-200 font-semibold rounded-xl flex items-center justify-center space-x-2 cursor-pointer text-sm"
            >
              <FileText size={15} className="text-sky-500 dark:text-sky-400" />
              <span>{t('nav.download_cv')}</span>
            </button>

            <button
              id="mobile-nav-cta"
              onClick={() => handleNavClick('contacto')}
              className="w-full text-center py-3 bg-sky-500 hover:bg-sky-600 text-black dark:text-black font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'es' ? 'Contactar con Luis' : 'Contact Luis'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrated reading progress bar on navbar bottom border */}
      <motion.div
        id="integrated-nav-progress-bar"
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 origin-left pointer-events-none"
        style={{ scaleX, opacity: scrolled ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </nav>
  );
}

