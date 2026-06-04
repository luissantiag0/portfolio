import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, Github, Code2, ShieldAlert, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import BlurUpImage from './BlurUpImage';
import { prefetchExternalUrl } from '../utils/prefetch';

export default function Projects() {
  const { projects, t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="proyectos"
      className="py-20 bg-white dark:bg-[#050505] transition-colors w-full"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <ScrollReveal id="projects-section-header" className="space-y-3 mb-12 text-center lg:text-left animate-slide-in" delay={0.05}>
          <p className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-[#050505] dark:text-sky-400 uppercase bg-zinc-100 dark:bg-sky-500/10 px-3 py-1.5 rounded-full border border-zinc-200/65 dark:border-sky-500/20">
            <Folder size={12} />
            <span>{t('projects.subtitle')}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <p className="text-zinc-550 dark:text-slate-400 max-w-xl text-sm sm:text-base leading-relaxed text-center lg:text-left">
            {t('projects.desc')}
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-sky-450 to-blue-600 rounded-full mx-auto lg:mx-0" />
        </ScrollReveal>

        {/* Projects Grid Container */}
        <ScrollReveal id="projects-list-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" delay={0.12}>
          {projects.map((p, index) => {
            const isExpanded = expandedId === p.id;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 55, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15px" }}
                transition={{
                  type: 'spring',
                  stiffness: 85,
                  damping: 15,
                  mass: 1.1,
                  delay: (index % 2) * 0.08,
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015,
                  boxShadow: "0 20px 42px -15px rgba(14,165,233,0.14)",
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                whileTap={{ 
                  scale: 0.985,
                  transition: { duration: 0.1 } 
                }}
                key={p.id}
                id={`project-card-${p.id}`}
                onClick={() => {
                  if (p.demoUrl) {
                    window.open(p.demoUrl, '_blank', 'noreferrer');
                  }
                }}
                className={`bg-white dark:bg-[#0A0A0A] border border-zinc-200/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:border-sky-500/35 dark:hover:border-sky-500/25 transition-[colors,border-color] duration-300 flex flex-col justify-between ${p.id === 'scalable-ai-backend' ? 'opacity-55 saturate-0' : 'cursor-pointer'}`}
              >
                {/* Custom Image Container */}
                <div className="h-48 w-full p-5 relative overflow-hidden flex flex-col justify-between select-none text-white bg-zinc-950">
                  
                  {/* Backdrop Image */}
                  {p.imageUrl && (
                    <BlurUpImage
                      src={p.imageUrl}
                      placeholderSrc=""
                      alt={p.title}
                      className="absolute inset-0 w-full h-full"
                    />
                  )}

                  {/* Gradient overlays with project accents */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${p.imageAccent} opacity-80 mix-blend-multiply z-1`} />
                  <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-2" />

                  {/* Grid layout visual overlays */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-3" />
                  
                  {/* Category badging */}
                  <div className="flex justify-between items-center z-10 relative">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono bg-white/10 border border-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        {p.category.toUpperCase().replace('-', ' ')}
                      </span>
                      {p.id === 'scalable-ai-backend' && (
                        <span className="text-[9px] font-mono bg-amber-500/20 border border-amber-400/40 backdrop-blur-sm px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-amber-300">
                          EN PROCESO
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="w-2 h-2 rounded-full bg-white/80" />
                    </div>
                  </div>

                  {/* Micro code visualizations */}
                  <div className="flex-1 flex items-center justify-center relative z-10">
                    {p.id === 'vyntra-fitness' && (
                      <div className="bg-zinc-950/40 backdrop-blur-md border border-white/15 p-3 rounded-lg w-4/5 text-center shadow-lg font-mono text-[9px] space-y-1">
                        <p className="text-zinc-200 font-bold">VYNTRA METRICS LOGGER</p>
                        <p className="text-indigo-300">Active energy: 680 kcal | Workout: Strength</p>
                      </div>
                    )}
                    {p.id === 'scalable-ai-backend' && (
                      <div className="bg-zinc-950/60 backdrop-blur-md border border-amber-500/30 p-3 rounded-lg w-4/5 text-center shadow-lg font-mono text-[9px] space-y-1.5">
                        <p className="text-amber-400 font-bold tracking-wider">⚠ EN DESARROLLO</p>
                        <p className="text-zinc-400 italic">Arquitectura backend en construcción</p>
                        <div className="flex justify-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Role descriptor */}
                  <div className="flex justify-between items-center z-10 text-[10px] font-mono text-white/70 relative">
                    <span>{p.role}</span>
                    {p.id === 'scalable-ai-backend' ? (
                      <span className="text-amber-400/60">EN PROCESO</span>
                    ) : (
                      <span>luissantiago-dev/</span>
                    )}
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  {/* Brief overview */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-sans font-bold text-xl text-zinc-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-zinc-550 dark:text-zinc-450 text-xs sm:text-sm line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono">
                    {p.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-zinc-100 dark:bg-[#050505] text-zinc-650 dark:text-slate-300 rounded-full text-[10.5px] font-mono border border-zinc-200/30 dark:border-white/5 font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Technical Analysis Accordion */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-white/10 mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(p.id); }}
                      className="w-full flex items-center justify-between text-xs font-mono text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-350 font-semibold cursor-pointer py-1"
                    >
                      <span>{isExpanded ? t('projects.hide_details') : t('projects.show_details')}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {/* Expanding challenges panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3 text-left border-l-2 border-sky-500/20 pl-3 space-y-3"
                        >
                          <div className="space-y-1">
                            <h5 className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-500 flex items-center space-x-1">
                              <ShieldAlert size={12} />
                              <span>{t('projects.challenge')}</span>
                            </h5>
                            <p className="text-xs text-zinc-650 dark:text-slate-300 leading-relaxed">
                              {p.challenges}
                            </p>
                          </div>
                          
                          <div className="space-y-1 pt-1">
                            <h5 className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-600 dark:text-sky-450 flex items-center space-x-1">
                              <CheckCircle size={12} />
                              <span>{t('projects.solution')}</span>
                            </h5>
                            <p className="text-xs text-zinc-650 dark:text-slate-300 leading-relaxed">
                              {p.solution}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Link for GitHub Repository code */}
                  <div className="flex items-center justify-between pt-4 mt-2">
                      <a
                        id={`project-github-link-${p.id}`}
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => prefetchExternalUrl(p.githubUrl)}
                        className={`inline-flex items-center space-x-1.5 text-xs font-semibold transition-colors px-3 py-1.5 rounded-xl border cursor-pointer ${
                          p.id === 'scalable-ai-backend'
                            ? 'text-zinc-500 dark:text-zinc-600 bg-zinc-100/50 dark:bg-[#050505]/50 border-zinc-200/30 dark:border-white/5'
                            : 'text-zinc-700 hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-400 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#050505] dark:hover:bg-white/5 border-zinc-200/50 dark:border-white/10'
                        }`}
                      >
                        <Github size={14} />
                        <span>{p.id === 'scalable-ai-backend' ? 'Próximamente' : t('projects.view_code')}</span>
                      </a>

                      <span className={`text-[10.5px] font-mono select-none flex items-center space-x-1 ${
                        p.id === 'scalable-ai-backend' ? 'text-amber-500/50' : 'text-zinc-400'
                      }`}>
                        <Code2 size={11} />
                        <span>{p.id === 'scalable-ai-backend' ? 'En proceso' : t('projects.architecture')}</span>
                      </span>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </ScrollReveal>

      </div>
    </section>
  );
}
