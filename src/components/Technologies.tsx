import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Database, BadgeHelp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Skill } from '../types';
import ScrollReveal from './ScrollReveal';

export default function Technologies() {
  const { skills, t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  // Sync active skill to first matching element when list translations or filters shift
  useEffect(() => {
    const list = skills.filter((s) => filter === 'all' || s.category === filter);
    if (list.length > 0) {
      // Find matching skill name to keep focus if possible, otherwise first
      const matched = list.find(s => s.name === activeSkill?.name);
      setActiveSkill(matched || list[0]);
    } else {
      setActiveSkill(null);
    }
  }, [filter, skills]);

  const categories = [
    { label: t('tech.cat.all'), value: 'all' },
    { label: t('tech.cat.frontend'), value: 'frontend' },
    { label: t('tech.cat.backend'), value: 'backend' },
    { label: t('tech.cat.database'), value: 'database' },
    { label: t('tech.cat.tools'), value: 'tools' }
  ];

  const filteredSkills = skills.filter(
    (skill) => filter === 'all' || skill.category === filter
  );

  return (
    <section
      id="tecnologias"
      className="py-20 bg-white dark:bg-[#050505] transition-colors w-full"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <ScrollReveal id="tech-section-header" className="space-y-3 mb-12 text-center lg:text-left" delay={0.05}>
          <p className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-[#050505] dark:text-sky-400 uppercase bg-zinc-100 dark:bg-sky-500/10 px-3 py-1.5 rounded-full border border-zinc-200/65 dark:border-sky-500/20">
            <Cpu size={12} />
            <span>{t('tech.subtitle')}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('tech.title')}
          </h2>
          <p className="text-zinc-550 dark:text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed text-center lg:text-left">
            {t('tech.desc')}
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-sky-450 to-blue-600 rounded-full mx-auto lg:mx-0" />
        </ScrollReveal>

        {/* Categories Tab Selector */}
        <ScrollReveal id="tech-filters" className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-zinc-100 dark:border-white/15" delay={0.12}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`tech-filter-${cat.value}`}
              onClick={() => {
                setFilter(cat.value as any);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === cat.value
                  ? 'bg-sky-500 text-black shadow-sm'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 border border-transparent dark:border-white/10 dark:hover:bg-white/10 text-zinc-650 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Active Technology Focus Dashboard */}
        <div id="tech-grid-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Interactive chips grid */}
          <ScrollReveal direction="up" delay={0.18} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isActive = activeSkill?.name === skill.name;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={skill.name}
                    id={`tech-chip-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setActiveSkill(skill)}
                    className={`p-4 rounded-3xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#0A0A0A] border-sky-500 shadow-md dark:from-white/10 dark:to-transparent dark:border-sky-505'
                        : 'bg-zinc-50 border-zinc-200/50 hover:border-zinc-350 dark:bg-[#0A0A0A] dark:border-white/10 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Miniature Progress bar */}
                    <div className="w-full bg-zinc-200 dark:bg-white/5 h-1 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-sky-450 to-blue-600 h-full rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-zinc-550 dark:text-slate-400 text-xs line-clamp-2">
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </ScrollReveal>

          {/* Right panel: Active focus detail card */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  id="tech-active-details"
                  className="bg-[#0A0A0A] text-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-xl text-left"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-sky-450 tracking-widest font-bold">
                        {activeSkill.category === 'frontend' && t('tech.dashboard.frontend')}
                        {activeSkill.category === 'backend' && t('tech.dashboard.backend')}
                        {activeSkill.category === 'database' && t('tech.dashboard.database')}
                        {activeSkill.category === 'tools' && t('tech.dashboard.tools')}
                      </span>
                      <h4 className="font-sans font-bold text-xl">{activeSkill.name}</h4>
                    </div>
                    
                    {/* Visual Icon Mock */}
                    <div className="p-3 bg-[#050505] rounded-xl border border-white/10 text-sky-400">
                      {activeSkill.category === 'database' ? (
                        <Database size={20} />
                      ) : activeSkill.category === 'backend' ? (
                        <Terminal size={20} />
                      ) : (
                        <Cpu size={20} />
                      )}
                    </div>
                  </div>

                  {/* Core description */}
                  <div className="space-y-2">
                    <p className="text-zinc-400 text-xs font-mono uppercase tracking-wider">{t('tech.dashboard.concept')}</p>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {activeSkill.description}
                    </p>
                  </div>

                  {/* Learning origin info */}
                  <div className="grid grid-cols-2 gap-4 bg-[#050505] p-4 border border-white/5 rounded-2xl">
                    <div className="space-y-0.5">
                      <p className="text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider">{t('tech.dashboard.methodology')}</p>
                      <span className="text-xs font-semibold text-zinc-200">
                        {activeSkill.category === 'tools' ? t('tech.dashboard.method_val_tools') : t('tech.dashboard.method_val')}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider">{t('tech.dashboard.origin')}</p>
                      <span className="text-xs font-medium text-sky-450 flex items-center space-x-1">
                        <CheckCircle2 size={10} />
                        <span>{t('tech.dashboard.origin_val')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Real-world usage case draft */}
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-400 font-mono text-left uppercase tracking-wider font-bold">{t('tech.dashboard.usage')}</p>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {activeSkill.name.includes('PHP') && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Estructuro clases controladoras según el patrón Modelo-Vista-Controlador (MVC).' : 'I structure clean PHP controllers utilizing the classic Model-View-Controller (MVC) pattern.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Manejo transacciones PDO evitando inyecciones SQL recurrentes en formularios.' : 'I execute PDO transactions to wipe out SQL injection threats and persist data safe.'}</span>
                          </li>
                        </>
                      )}
                      {activeSkill.name.includes('JavaScript') && !activeSkill.name.includes('Next.js') && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Consumo APIs asíncronas con promesas asíncronas optimizadas y fetch modular.' : 'I access third-party REST endpoints using modular fetch promises.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Estructuro lógica funcional de manipulación reactiva de elementos en vista.' : 'I design micro-interactions through reactive script bounds for client views.'}</span>
                          </li>
                        </>
                      )}
                      {(activeSkill.name.includes('Next.js') || activeSkill.name.includes('Astro') || activeSkill.name.includes('CSS') || activeSkill.name.includes('HTML')) && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Modulo interfaces complejas utilizando componentes declarativos, enrutados y altamente accesibles.' : 'I partition heavy layouts into semantic, accessible, and lightweight reactive cards.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Sincronizo de manera responsive y fluida los layouts del lado del cliente optimizando transferencias.' : 'I style pages in a responsive manner utilizing standard media queries or Tailwind.'}</span>
                          </li>
                        </>
                      )}
                      {(activeSkill.name.includes('SQL') || activeSkill.name.includes('PostgreSQL')) && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Escribo consultas relacionales unidas por INNER JOINS e indexo columnas clave.' : 'I write nested joins, speed up performance with indexing, and construct safe views.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Diseño esquemas normalizados para asegurar el cumplimiento de la integridad.' : 'I normalize databases up to 3NF standards, managing foreign indices accurately.'}</span>
                          </li>
                        </>
                      )}
                      {activeSkill.name.includes('Java') && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Manejo ficheros locales controlando flujos de excepciones (I/O custom handles).' : 'I read files, map properties, and control flow failures through careful try-catch handlers.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Despliegues de estructuras de datos optimizadas apoyándome en bucles Map o colecciones List.' : 'I structure complex class inheritance, multi-thread tasks, and optimize arrays in Java JVM.'}</span>
                          </li>
                        </>
                      )}
                      {activeSkill.name.includes('Git') && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Trabajo de forma ordenada con ramas para experimentar con ramas feature específicas.' : 'I coordinate clean team branch merging, resolve confliting changes, and test logic.'}</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-sky-400 py-0.5 font-bold">▪</span>
                            <span>{language === 'es' ? 'Documento confirmaciones (commits) detallando qué componente o bug ha sido resuelto.' : 'I construct descriptive commits detailing what bugs have been resolved or what lines were added.'}</span>
                          </li>
                        </>
                      )}
                      {!['PHP', 'JavaScript', 'Next.js', 'Astro', 'SQL', 'PostgreSQL', 'Java', 'Git'].some(sub => activeSkill.name.includes(sub)) && (
                        <li className="flex items-start space-x-2">
                          <span className="text-sky-400 py-0.5 font-bold">▪</span>
                          <span>{language === 'es' ? 'Aplicación directa en estructurar diseños, optimizar recursos del servidor y depurar errores de consola sistemáticamente.' : 'This directly aids in styling layouts, tracking request logs, and optimizing server runtimes.'}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                </motion.div>
              ) : (
                <div className="bg-[#0A0A0A] text-slate-500 rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center h-full min-h-[300px]">
                  <BadgeHelp size={40} className="mb-2 text-sky-450" />
                  <p className="text-sm font-mono text-center">{t('tech.dashboard.select_placeholder')}</p>
                </div>
              )}
            </AnimatePresence>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
