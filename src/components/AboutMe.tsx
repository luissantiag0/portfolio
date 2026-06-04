import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, Compass, CheckCircle2, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

export default function AboutMe() {
  const { personalInfo, softSkills, t } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<number | null>(0);

  return (
    <section
      id="sobre-me"
      className="py-20 bg-zinc-50 dark:bg-[#050505]/95 transition-colors w-full relative"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal id="about-section-header" className="space-y-3 mb-16 text-center lg:text-left" delay={0.05}>
          <p className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-[#050505] dark:text-sky-400 uppercase bg-zinc-100 dark:bg-sky-500/10 px-3 py-1.5 rounded-full border border-zinc-200/65 dark:border-sky-500/20">
            <User size={12} />
            <span>{t('about.subtitle')}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white max-w-4xl">
            {t('about.title')}
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-sky-450 to-blue-600 rounded-full mx-auto lg:mx-0" />
        </ScrollReveal>

        {/* Bento Grid Structure */}
        <div id="about-bento-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Biography (Left-Main Block) - spans 7 cols on lg */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-7 bg-white dark:bg-[#0A0A0A] border border-zinc-200/60 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
            <div className="flex items-center space-x-3 text-sky-500">
              <Compass size={22} />
              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">{t('about.trajectory')}</h3>
            </div>
            
            <div className="space-y-4 text-zinc-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed text-left">
              {(personalInfo.aboutDescription || "").split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Microstats list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200/60 dark:border-white/10">
              <div className="text-left space-y-1">
                <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">DAW</span>
                <p className="text-xs text-zinc-500 dark:text-slate-500 font-mono tracking-wider uppercase">{t('about.stats.studies')}</p>
              </div>
              <div className="text-left space-y-1">
                <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">4+</span>
                <p className="text-xs text-zinc-500 dark:text-slate-500 font-mono tracking-wider uppercase">{t('about.stats.projects')}</p>
              </div>
              <div className="text-left space-y-1 col-span-2 sm:col-span-1">
                <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">100%</span>
                <p className="text-xs text-zinc-500 dark:text-slate-500 font-mono tracking-wider uppercase">{t('about.stats.motivation')}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2/3 Stack: Interactive Soft Skills & Geography (Right Block) - spans 5 cols on lg */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Soft Skills Section */}
            <ScrollReveal direction="up" delay={0.25} className="bg-white dark:bg-[#0A0A0A] border border-zinc-200/60 dark:border-white/10 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 text-sky-500 mb-6">
                <Sparkles size={20} />
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">{t('about.values')}</h3>
              </div>

              <div id="soft-skills-interactive-list" className="space-y-3">
                {softSkills.map((skill, index) => {
                  const isSelected = selectedSkill === index;
                  const isExco = skill.rate === 'Excepcional' || skill.rate === 'Outstanding';
                  return (
                    <div
                      key={index}
                      id={`soft-skill-card-${index}`}
                      onClick={() => setSelectedSkill(isSelected ? null : index)}
                      className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-300 text-left ${
                        isSelected
                          ? 'bg-sky-50 border-sky-200 dark:bg-[#050505] dark:border-sky-500/30 shadow-sm'
                          : 'bg-zinc-50 hover:bg-zinc-100/70 border-zinc-200/40 dark:bg-[#050505]/40 dark:border-zinc-805/30 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">{skill.name}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isExco
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-450 border border-sky-100 dark:border-sky-500/20'
                            : 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20'
                        }`}>
                          {skill.rate}
                        </span>
                      </div>
                      
                      {/* Expanded text */}
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-zinc-650 dark:text-slate-400 mt-2.5 leading-relaxed pl-1.5 border-l-2 border-sky-450 dark:border-sky-505/60"
                        >
                          {skill.description}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Geographical Card & Quick Pitch */}
            <ScrollReveal direction="up" delay={0.35} className="bg-gradient-to-tr from-[#050505] to-[#0A0A0A] text-white rounded-3xl p-6 shadow-md border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2 text-sky-400 text-xs font-mono uppercase tracking-wider">
                  <MapPin size={14} />
                  <span>{t('about.location.title')}</span>
                </div>
                <h4 className="text-lg font-bold font-sans">{t('about.location.val')}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {t('about.location.pitch')}
                </p>
              </div>

              <div id="about-qualities-checklist" className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300 font-mono">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-sky-400 flex-shrink-0" />
                  <span>{t('about.qual.clean')}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-sky-400 flex-shrink-0" />
                  <span>{t('about.qual.git')}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-sky-400 flex-shrink-0" />
                  <span>{t('about.qual.db')}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 size={12} className="text-sky-400 flex-shrink-0" />
                  <span>{t('about.qual.team')}</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
