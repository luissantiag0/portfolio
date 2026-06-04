import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Copy, Check, ArrowRight, Play, Terminal as TerminalIcon, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import luisPortrait from '../assets/images/luis_portrait_1780502668740.png';
import { prefetchExternalUrl } from '../utils/prefetch';

export default function Hero() {
  const { personalInfo, t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [terminalTab, setTerminalTab] = useState<'profile' | 'academic' | 'compiling'>('profile');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilePercent, setCompilePercent] = useState(0);

  const typewriterPhrases = [
    t('hero.phrase.0'),
    t('hero.phrase.1'),
    t('hero.phrase.2')
  ];

  // Typewriter Engine State
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // If language switches, reset typewriter context safely to prevent any sizing overflows
  useEffect(() => {
    setSubIndex(0);
    setIsDeleting(false);
    setWordIndex(0);
  }, [language]);

  useEffect(() => {
    const currentWord = typewriterPhrases[wordIndex] || "";
    if (subIndex === currentWord.length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typewriterPhrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 30 : subIndex === currentWord.length ? 1800 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, language]);

  // Handle blinking cursor loop
  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(cursorTimeout);
  }, [blink]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startCompilationMock = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompilePercent(0);
    const interval = setInterval(() => {
      setCompilePercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsCompiling(false), 1500);
          return 100;
        }
        return prev + 5;
      });
    }, 70);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-55/40 via-white to-white dark:from-[#050505] dark:via-[#050505] dark:to-[#050505]"
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/10 w-72 lg:w-96 h-72 lg:h-96 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-72 lg:w-96 h-72 lg:h-96 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left Side: Copywriting */}
        <div id="hero-marketing-side" className="lg:col-span-5 space-y-6 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-xs font-semibold tracking-wide uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
            </span>
            <span>{t('hero.available')}</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-zinc-650 dark:text-slate-400 text-sm lg:text-base font-mono tracking-wider uppercase"
            >
              {t('hero.greeting')}
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              {personalInfo.fullName}
            </motion.h1>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight h-[40px] sm:h-[48px] flex items-center"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-450 to-blue-600 dark:from-sky-400 dark:to-blue-500">
                {(typewriterPhrases[wordIndex] || "").substring(0, subIndex)}
              </span>
              <span className={`inline-block w-[3px] h-6 sm:h-8 ml-1 bg-sky-500 dark:bg-sky-400 self-center ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
            </motion.h3>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-zinc-650 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {personalInfo.shortBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            {/* Main Contact action */}
            <button
              id="cta-contact-init"
              onClick={() => {
                if ((window as any).openContactModal) {
                  (window as any).openContactModal();
                }
              }}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-black font-extrabold text-sm rounded-xl shadow-md justify-center hover:shadow-lg transition-all flex items-center space-x-2 group cursor-pointer"
            >
              <span>{t('hero.contact_now')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CV Trigger Button */}
            <button
              id="cta-view-cv"
              onClick={() => {
                if ((window as any).openCVModal) {
                  (window as any).openCVModal();
                }
              }}
              className="px-5 py-3.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold text-sm rounded-xl border border-sky-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
            >
              <FileText size={16} className="text-sky-500" />
              <span>{t('hero.view_cv')}</span>
            </button>

            {/* Copy Email Button */}
            <button
              id="cta-copy-email"
              onClick={handleCopyEmail}
              className="px-5 py-3.5 bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-800 dark:text-slate-100 font-semibold text-sm rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-sky-400" />}
              <span>{copied ? t('hero.email_copied') : t('hero.copy_email')}</span>
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center space-x-4 pt-4 text-zinc-500 dark:text-slate-400"
          >
            <span className="text-xs font-mono uppercase tracking-wider">{t('hero.links')}</span>
            
            <a
              id="hero-github-link"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => prefetchExternalUrl(personalInfo.github)}
              className="p-2 border border-zinc-200 dark:border-white/10 rounded-xl hover:border-zinc-400 dark:hover:border-sky-500/50 text-zinc-700 dark:text-sky-400 hover:text-zinc-900 dark:hover:text-white transition-all bg-white/50 dark:bg-white/5"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>

            <a
              id="hero-linkedin-link"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => prefetchExternalUrl(personalInfo.linkedin)}
              className="p-2 border border-zinc-200 dark:border-white/10 rounded-xl hover:border-zinc-400 dark:hover:border-sky-500/50 text-zinc-700 dark:text-sky-400 hover:text-zinc-950 dark:hover:text-white transition-all bg-white/50 dark:bg-white/5"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Middle Side: Portrait Picture */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3 flex justify-center"
        >
          <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-white/10 shadow-xl group bg-zinc-100 dark:bg-zinc-950">
            <img
              src={luisPortrait}
              alt="Luis Santiago"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft gradient banner overlay on bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end text-left">
              <span className="text-white text-sm font-bold font-sans">Luis Santiago</span>
              <span className="text-[10px] text-sky-400 font-mono font-semibold text-sky-455 uppercase tracking-wide">{personalInfo.title}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: High-tech Interactive Terminal Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          id="hero-terminal-container"
          className="lg:col-span-4 h-[420px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-300 font-mono text-xs text-left"
        >
          {/* Terminal Header Bar */}
          <div className="bg-[#050505] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-sky-500/80 inline-block" />
              <span className="text-slate-500 pl-2 text-[10px] select-none font-bold">{t('hero.terminal.title')}</span>
            </div>
            <div className="p-1 px-2 border border-white/10 rounded-md bg-[#050505] text-slate-500 flex items-center space-x-1 text-[10px]">
              <TerminalIcon size={12} />
              <span>bash v5.2</span>
            </div>
          </div>

          {/* Interactive Navigation inside Terminal */}
          <div className="flex bg-[#050505]/40 border-b border-white/10">
            <button
              onClick={() => setTerminalTab('profile')}
              className={`px-3 py-2 border-r border-white/5 cursor-pointer flex items-center space-x-1.5 transition-colors ${
                terminalTab === 'profile' ? 'bg-[#050505] text-sky-450 border-b-2 border-b-sky-500' : 'text-slate-500'
              }`}
            >
              <span>profile.json</span>
            </button>
            <button
              onClick={() => setTerminalTab('academic')}
              className={`px-3 py-2 border-r border-white/5 cursor-pointer flex items-center space-x-1.5 transition-colors ${
                terminalTab === 'academic' ? 'bg-[#050505] text-emerald-450 border-b-2 border-b-emerald-400' : 'text-slate-500'
              }`}
            >
              <span>academic-status.sh</span>
            </button>
            <button
              onClick={() => setTerminalTab('compiling')}
              className={`px-3 py-2 border-r border-white/5 cursor-pointer flex items-center space-x-1.5 transition-colors ${
                terminalTab === 'compiling' ? 'bg-[#050505] text-amber-455 border-b-2 border-b-amber-400' : 'text-slate-500'
              }`}
            >
              <span>compile_demo.bin</span>
            </button>
          </div>

          {/* Terminal Console Output Workspace */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-[#050505]/80">
            {terminalTab === 'profile' && (
              <div id="terminal-profile-output" className="space-y-2">
                <p className="text-slate-500">{t('hero.terminal.query')}</p>
                <div className="pl-2 border-l-2 border-sky-500/40 text-slate-350 space-y-1">
                  <p><span className="text-sky-400">"{language === 'es' ? 'nombre' : 'name'}":</span> "{personalInfo.fullName}",</p>
                  <p><span className="text-sky-400">"{language === 'es' ? 'rol' : 'role'}":</span> "{personalInfo.title}",</p>
                  <p><span className="text-sky-400">"{language === 'es' ? 'estudios' : 'studies'}":</span> "{language === 'es' ? 'Desarrollo de Aplicaciones Web' : 'Web Application Development'}",</p>
                  <p><span className="text-sky-400">"{language === 'es' ? 'estado' : 'status'}":</span> "{language === 'es' ? 'Prácticas FCT / Vacante Junior' : 'FCT Internship / Junior Vacancy'}",</p>
                  <p><span className="text-sky-400">"{language === 'es' ? 'valores' : 'values'}":</span> [
                    "{language === 'es' ? 'Iniciativa' : 'Initiative'}", 
                    "{language === 'es' ? 'Disciplina' : 'Discipline'}", 
                    "{language === 'es' ? 'Autogestión' : 'Self-Management'}"
                  ],</p>
                  <p className="text-emerald-400"><span className="text-sky-400">"github_activity":</span> "{language === 'es' ? 'Alto (Commits diarios)' : 'High (Daily commits)'}"</p>
                </div>
                <p className="text-slate-500 pt-1"># Luis@Santiago: Ready to build and deploy.</p>
              </div>
            )}

            {terminalTab === 'academic' && (
              <div id="terminal-academic-output" className="space-y-2">
                <div className="flex items-center space-x-1">
                  <span className="text-emerald-400">➜</span>
                  <p className="text-slate-200">cat academic-status.sh</p>
                </div>
                <p className="text-slate-400 font-bold">=== {language === 'es' ? 'SITUACIÓN ACADÉMICA Y PROYECTO DAW' : 'ACADEMIC STATUS & DAW PROJECT'} ===</p>
                <div className="space-y-1 text-slate-350 text-[11px]">
                  <p><span className="text-slate-550">[Module]</span> {language === 'es' ? 'Bases de Datos SQL:' : 'SQL Databases:'} <span className="text-emerald-400">{language === 'es' ? '100% Completado' : '100% Completed'}</span></p>
                  <p><span className="text-slate-550">[Module]</span> {language === 'es' ? 'Desarrollo Servidor (PHP):' : 'Server Development (PHP):'} <span className="text-emerald-400">{language === 'es' ? '100% Completado' : '100% Completed'}</span></p>
                  <p><span className="text-slate-550">[Module]</span> {language === 'es' ? 'Desarrollo Cliente (JS):' : 'Client Development (JS):'} <span className="text-emerald-400">{language === 'es' ? '100% Completado' : '100% Completed'}</span></p>
                </div>
                <div className="p-2.5 bg-sky-950/20 border border-sky-500/20 rounded-xl flex items-start space-x-2 text-sky-400">
                  <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{language === 'es' ? 'En busca de acuerdos de prácticas curriculares (FCT) o contrato junior formal.' : 'Seeking curricular internship agreements (FCT) or formal junior contracts.'}</span>
                </div>
              </div>
            )}

            {terminalTab === 'compiling' && (
              <div id="terminal-compiling-output" className="space-y-3">
                <p className="text-slate-500">{t('hero.terminal.run_compilation')}</p>
                
                <button
                  onClick={startCompilationMock}
                  disabled={isCompiling}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-black rounded-md flex items-center space-x-1.5 cursor-pointer select-none font-extrabold disabled:opacity-55 disabled:cursor-not-allowed text-[11px] transition-all"
                >
                  <Play size={10} fill="black" />
                  <span>{isCompiling ? t('hero.terminal.compiling') : t('hero.terminal.execute_comp')}</span>
                </button>

                {isCompiling && (
                  <div className="space-y-2">
                    <div className="w-full bg-[#050505] rounded-full h-1.5 overflow-hidden border border-white/5">
                      <div className="bg-gradient-to-r from-sky-450 to-blue-600 h-full" style={{ width: `${compilePercent}%` }} />
                    </div>
                    <div className="grid grid-cols-2 text-[10px] text-slate-500">
                      <span>{t('hero.terminal.compile_status')}</span>
                      <span className="text-right">{compilePercent}%</span>
                    </div>
                  </div>
                )}

                {compilePercent === 100 && !isCompiling && (
                  <div className="text-emerald-405 font-bold space-y-1 text-[11px]">
                    <p>{t('hero.terminal.compile_ok')}</p>
                    <p>{t('hero.terminal.compile_no_errors')}</p>
                    <p>{t('hero.terminal.compile_opt')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Command execution foot bar */}
          <div className="bg-[#050505] px-5 py-2.5 border-t border-white/10 text-slate-500 flex justify-between items-center text-[10px]">
            <span>{t('hero.terminal.foot_ver')}</span>
            <div className="flex items-center space-x-2 text-sky-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              <span>{t('hero.terminal.tls')}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
