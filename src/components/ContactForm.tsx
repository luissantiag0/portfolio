import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContactMessage } from '../types';
import ScrollReveal from './ScrollReveal';
import { prefetchExternalUrl } from '../utils/prefetch';

export default function ContactForm() {
  const { personalInfo, t, language } = useLanguage();
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: 'FCT',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactMessage>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactMessage, boolean>>>({});

  // Reset errors validation messages if language is Switched dynamically
  useEffect(() => {
    setErrors({});
    setTouched({});
  }, [language]);

  const getValidationMessage = (key: string) => {
    const isEs = language === 'es';
    const dict: Record<string, string> = {
      name_required: isEs ? 'El nombre es requerido.' : 'Name is required.',
      email_required: isEs ? 'El correo electrónico es requerido.' : 'Email is required.',
      email_invalid: isEs ? 'El formato del correo electrónico no es válido.' : 'Please enter a valid email address.',
      msg_required: isEs ? 'Por favor, escribe un breve mensaje.' : 'Please write a brief message.',
      msg_too_short: isEs ? 'Escribe al menos 5 caracteres para tu consulta.' : 'Write at least 5 characters for your message.'
    };
    return dict[key] || '';
  };

  const validate = () => {
    const tempErrors: Partial<ContactMessage> = {};
    if (!formData.name.trim()) {
      tempErrors.name = getValidationMessage('name_required');
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = getValidationMessage('email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = getValidationMessage('email_invalid');
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = getValidationMessage('msg_required');
    } else if (formData.message.trim().length < 5) {
      tempErrors.message = getValidationMessage('msg_too_short');
    }
    
    setErrors(tempErrors);
    setTouched({ name: true, email: true, message: true });
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (field: keyof ContactMessage, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const tempErrors = { ...errors };
    if (field === 'name') {
      if (!value.trim()) {
        tempErrors.name = getValidationMessage('name_required');
      } else {
        delete tempErrors.name;
      }
    } else if (field === 'email') {
      if (!value.trim()) {
        tempErrors.email = getValidationMessage('email_required');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        tempErrors.email = getValidationMessage('email_invalid');
      } else {
        delete tempErrors.email;
      }
    } else if (field === 'message') {
      if (!value.trim()) {
        tempErrors.message = getValidationMessage('msg_required');
      } else if (value.trim().length < 5) {
        tempErrors.message = getValidationMessage('msg_too_short');
      } else {
        delete tempErrors.message;
      }
    }
    setErrors(tempErrors);
  };

  const handleBlur = (field: keyof ContactMessage) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const value = formData[field];
    const tempErrors = { ...errors };
    if (field === 'name') {
      if (!value.trim()) {
        tempErrors.name = getValidationMessage('name_required');
      }
    } else if (field === 'email') {
      if (!value.trim()) {
        tempErrors.email = getValidationMessage('email_required');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        tempErrors.email = getValidationMessage('email_invalid');
      }
    } else if (field === 'message') {
      if (!value.trim()) {
        tempErrors.message = getValidationMessage('msg_required');
      } else if (value.trim().length < 5) {
        tempErrors.message = getValidationMessage('msg_too_short');
      }
    }
    setErrors(tempErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('sending');
    
    // Simulate sending SMTP secure package
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'FCT',
        message: ''
      });
      setTouched({});
      setErrors({});
    }, 1800);
  };

  const handleReset = () => {
    setFormStatus('idle');
    setTouched({});
    setErrors({});
  };

  return (
    <section
      id="contacto"
      className="py-20 bg-white dark:bg-[#050505] transition-colors w-full relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <ScrollReveal id="contact-section-header" className="space-y-3 mb-14 text-center lg:text-left" delay={0.05}>
          <p className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-[#050505] dark:text-sky-400 uppercase bg-zinc-100 dark:bg-sky-500/10 px-3 py-1.5 rounded-full border border-zinc-200/65 dark:border-sky-500/20">
            <Mail size={12} />
            <span>{t('contact.subtitle')}</span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('contact.title')}
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-sky-450 to-blue-600 rounded-full mx-auto lg:mx-0" />
        </ScrollReveal>

        {/* Contact Split layout */}
        <div id="contact-split-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Direct info and links */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-5 space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xl text-zinc-900 dark:text-white">
                {t('contact.direct')}
              </h3>
              <p className="text-sm text-zinc-550 dark:text-slate-400 leading-relaxed font-sans">
                {t('contact.desc')}
              </p>
            </div>

            {/* Direct mail action box */}
            <div className="p-5 bg-gradient-to-tr from-zinc-50 to-zinc-100/50 dark:from-[#0A0A0A] dark:to-[#0A0A0A] border border-zinc-200/50 dark:border-white/10 rounded-3xl flex items-center space-x-4">
              <div className="p-3 bg-sky-500/10 dark:bg-sky-500/10 rounded-2xl text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <Mail size={22} />
              </div>
              <div className="space-y-0.5 text-left min-w-0 font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Email:</span>
                <p className="text-sm font-bold text-zinc-800 dark:text-sky-400 truncate select-all font-mono">{personalInfo.email}</p>
              </div>
            </div>

            {/* Structured CTA grids for LinkedIn and GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                id="contact-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => prefetchExternalUrl(personalInfo.linkedin)}
                className="p-4 bg-white dark:bg-[#0A0A0A] hover:bg-zinc-50 dark:hover:bg-white/5 border border-zinc-200/60 dark:border-white/10 rounded-3xl flex items-center space-x-3 cursor-pointer group transition-all"
              >
                <div className="p-2.5 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-105 transition-transform border border-sky-500/25">
                  <Linkedin size={18} />
                </div>
                <div className="text-left font-sans">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">LinkedIn</p>
                  <span className="text-[10px] text-zinc-400 font-mono">{language === 'es' ? 'Mensaje profesional' : 'Professional chat'}</span>
                </div>
              </a>

              <a
                id="contact-github"
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => prefetchExternalUrl(personalInfo.github)}
                className="p-4 bg-white dark:bg-[#0A0A0A] hover:bg-zinc-50 dark:hover:bg-white/5 border border-zinc-200/60 dark:border-white/10 rounded-3xl flex items-center space-x-3 cursor-pointer group transition-all"
              >
                <div className="p-2.5 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-105 transition-transform border border-sky-500/25">
                  <Github size={18} />
                </div>
                <div className="text-left font-sans">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">GitHub</p>
                  <span className="text-[10px] text-zinc-400 font-mono">{language === 'es' ? 'Ver Repositorios' : 'View Code Repos'}</span>
                </div>
              </a>
            </div>

            {/* Geographic coordinates indicator */}
            <div className="text-xs text-slate-450 font-mono flex items-center space-x-1.5">
              <MapPin size={12} className="text-sky-500" />
              <span>{language === 'es' ? 'Badalona, España • Abierta FCT o remoto' : 'Badalona, Spain • Open to FCT or remote'}</span>
            </div>
          </ScrollReveal>

          {/* Right panel: Submitter Form Panel */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-7 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 rounded-3xl border border-zinc-200/60 dark:border-white/10 shadow-sm relative">
            <AnimatePresence mode="wait">
              {formStatus === 'idle' && (
                <motion.form
                  key="contact-form-node"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1.5 text-left relative flex flex-col">
                      <div className="flex justify-between items-center mb-0.5">
                        <label htmlFor="contact-name" className="text-xs font-mono font-bold text-zinc-700 dark:text-slate-400">
                          {t('contact.form_title')}
                        </label>
                        {touched.name && (
                          <span className={`text-[10px] font-mono font-bold ${errors.name ? 'text-red-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                            {errors.name ? '✕' : '✓'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-name"
                          type="text"
                          placeholder={language === 'es' ? "Ej. María Pérez (FCT Coordinator)" : "e.g. Maria Perez (HR Manager)"}
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          className={`w-full p-3 pr-10 bg-zinc-50 dark:bg-[#050505] border rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all ${
                            touched.name
                              ? errors.name
                                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/60'
                                : 'border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-emerald-500/40'
                              : 'border-zinc-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500/10'
                          }`}
                        />
                        {touched.name && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                            {errors.name ? (
                              <span className="text-red-500 font-bold">&#x2715;</span>
                            ) : (
                              <span className="text-emerald-500 font-bold">&#x2713;</span>
                            )}
                          </div>
                        )}
                      </div>
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            className="text-[10px] font-mono text-red-500 mt-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5 text-left relative flex flex-col">
                      <div className="flex justify-between items-center mb-0.5">
                        <label htmlFor="contact-email" className="text-xs font-mono font-bold text-zinc-700 dark:text-slate-400">
                          {t('contact.email')}
                        </label>
                        {touched.email && (
                          <span className={`text-[10px] font-mono font-bold ${errors.email ? 'text-red-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                            {errors.email ? '✕' : '✓'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="perez@compania.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`w-full p-3 pr-10 bg-zinc-50 dark:bg-[#050505] border rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all ${
                            touched.email
                              ? errors.email
                                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/60'
                                : 'border-emerald-500/70 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-emerald-500/40'
                              : 'border-zinc-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500/10'
                          }`}
                        />
                        {touched.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                            {errors.email ? (
                              <span className="text-red-500 font-bold">&#x2715;</span>
                            ) : (
                              <span className="text-emerald-500 font-bold">&#x2713;</span>
                            )}
                          </div>
                        )}
                      </div>
                      <AnimatePresence>
                        {touched.email && errors.email && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            className="text-[10px] font-mono text-red-500 mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Selective Subject selection */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="text-xs font-mono font-bold text-zinc-700 dark:text-slate-400">
                      {language === 'es' ? 'Asunto / Motivo' : 'Subject Inquiry'}
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all font-sans text-zinc-755 dark:text-slate-300"
                    >
                      <option value="FCT">{language === 'es' ? 'Acuerdo de prácticas DAW (FCT)' : 'Curricular DAW Internship (FCT)'}</option>
                      <option value="Job">{language === 'es' ? 'Oferta de Contrato Laboral Junior' : 'Junior Web Developer Employment Offer'}</option>
                      <option value="Collaboration">{language === 'es' ? 'Proyecto Colaborativo o Duda' : 'Shared projects or general questions'}</option>
                      <option value="Other">{language === 'es' ? 'Otro motivo' : 'Other inquiries'}</option>
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div className="space-y-1.5 text-left relative flex flex-col">
                    <div className="flex justify-between items-center mb-0.5">
                      <label htmlFor="contact-message" className="text-xs font-mono font-bold text-zinc-700 dark:text-slate-400">
                        {language === 'es' ? 'Descripción de tu propuesta' : 'Proposal details'}
                      </label>
                      {touched.message && (
                        <span className={`text-[10px] font-mono font-bold ${errors.message ? 'text-red-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                          {errors.message ? '✕' : '✓'}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder={language === 'es' ? "Cuéntame brevemente qué tipo de perfil estás buscando o los detalles de las prácticas curriculares..." : "Tell me briefly what kind of tasks or technologies are planned for the student..."}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        className={`w-full p-3 pr-10 bg-zinc-50 dark:bg-[#050505] border rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all ${
                          touched.message
                            ? errors.message
                              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/60'
                              : 'border-emerald-500/70 focus:border-emerald-505 focus:ring-emerald-505/10 dark:border-emerald-505/40'
                            : 'border-zinc-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500/10'
                        }`}
                      />
                      {touched.message && (
                        <div className="absolute right-3 top-5 pointer-events-none flex items-center">
                          {errors.message ? (
                            <span className="text-red-500 font-bold">&#x2715;</span>
                          ) : (
                            <span className="text-emerald-500 font-bold">&#x2713;</span>
                          )}
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {touched.message && errors.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          className="text-[10px] font-mono text-red-500 mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>{language === 'es' ? 'Enviar Propuesta Segura' : 'Send Secure Proposal'}</span>
                    <Send size={14} />
                  </button>
                </motion.form>
              )}

              {formStatus === 'sending' && (
                <motion.div
                  key="form-sending-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center h-[340px] text-zinc-500 space-y-4"
                >
                  <RefreshCw size={36} className="text-sky-400 animate-spin" />
                  <div className="space-y-1 text-center">
                    <h4 className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-200">{language === 'es' ? 'Transmitiendo paquete encriptado...' : 'Broadcasting secure packets...'}</h4>
                    <p className="text-xs text-zinc-400 font-mono">POST /api/contact_dispatch_simulation HTTPS/1.1</p>
                  </div>
                </motion.div>
              )}

              {formStatus === 'success' && (
                <motion.div
                  key="form-success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center items-center h-[340px] text-center space-y-5"
                >
                  <div className="p-4 bg-sky-500/10 dark:bg-sky-500/10 rounded-full border border-sky-500/20 text-sky-400">
                    <CheckCircle size={44} />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="font-sans font-bold text-lg text-zinc-900 dark:text-white leading-tight">{t('contact.success')}</h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-400">
                      {t('contact.success_desc')}
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-zinc-150 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-805 dark:text-slate-200 border border-zinc-200 dark:border-white/10 font-bold text-xs rounded-full transition-all cursor-pointer inline-flex items-center space-x-1.5"
                  >
                    <span>{language === 'es' ? 'Enviar otra consulta' : 'Submit another inquiry'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
