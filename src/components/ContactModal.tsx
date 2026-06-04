import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, X, CheckCircle, RefreshCw } from 'lucide-react';
import { personalInfo } from '../data';
import { ContactMessage } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: 'FCT',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactMessage>>({});

  const validate = () => {
    const tempErrors: Partial<ContactMessage> = {};
    if (!formData.name.trim()) tempErrors.name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      tempErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Introduce un email válido.';
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Por favor, describe tu mensaje.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'FCT',
        message: ''
      });
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          {/* Backdrop absolute click handler */}
          <div className="absolute inset-0 cursor-default" onClick={onClose} />

          <motion.div
            id="contact-modal"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative z-10 p-6 sm:p-8 flex flex-col space-y-5 text-left"
          >
            {/* Close Button */}
            <button
              id="contact-modal-close"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full text-zinc-550 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer border border-transparent dark:border-white/10"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400">Formulario Directo</span>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                Contactar con Luis Santiago
              </h3>
              <p className="text-xs text-zinc-550 dark:text-slate-450">
                Respuesta ágil • Badalona, España • {personalInfo.email}
              </p>
            </div>

            <div className="border-t border-zinc-150 dark:border-white/10 pt-2 flex-grow overflow-y-auto max-h-[80vh]">
              <AnimatePresence mode="wait">
                {formStatus === 'idle' && (
                  <motion.form
                    key="modal-form-fields"
                    id="modal-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-name" className="text-xs font-semibold text-zinc-700 dark:text-slate-400">
                          Nombre
                        </label>
                        <input
                          id="modal-name"
                          type="text"
                          placeholder="Tu nombre completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full p-3 bg-zinc-50 dark:bg-[#050505] border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                          }`}
                        />
                        {errors.name && <p className="text-[10px] text-red-500 font-mono">{errors.name}</p>}
                      </div>

                      {/* Email input */}
                      <div className="space-y-1 text-left">
                        <label htmlFor="modal-email" className="text-xs font-semibold text-zinc-700 dark:text-slate-400">
                          Email corporativo o personal
                        </label>
                        <input
                          id="modal-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full p-3 bg-zinc-50 dark:bg-[#050505] border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                          }`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-mono">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject Select */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="modal-subject" className="text-xs font-semibold text-zinc-700 dark:text-slate-400">
                        Motivo del contacto
                      </label>
                      <select
                        id="modal-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                      >
                        <option value="FCT">Acuerdo de prácticas DAW (FCT)</option>
                        <option value="Job">Oferta de Contrato Laboral Junior</option>
                        <option value="Collaboration">Proyecto Colaborativo o Duda</option>
                        <option value="Other">Otro motivo</option>
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="modal-message" className="text-xs font-semibold text-zinc-700 dark:text-slate-400">
                        Breve descripción de la propuesta
                      </label>
                      <textarea
                        id="modal-message"
                        rows={4}
                        placeholder="Escribe aquí los detalles..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full p-3 bg-zinc-50 dark:bg-[#050505] border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                          errors.message ? 'border-red-500 focus:ring-red-500' : 'border-zinc-300 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                        }`}
                      />
                      {errors.message && <p className="text-[10px] text-red-500 font-mono">{errors.message}</p>}
                    </div>

                    {/* Submit button */}
                    <button
                      id="modal-submit-btn"
                      type="submit"
                      className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer pt-3"
                    >
                      <span>Transmitir Mensaje</span>
                      <Send size={14} />
                    </button>
                  </motion.form>
                )}

                {formStatus === 'sending' && (
                  <motion.div
                    key="modal-sending-state"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center h-[260px] text-zinc-500 space-y-4"
                  >
                    <RefreshCw size={36} className="text-sky-400 animate-spin" />
                    <div className="space-y-1 text-center">
                      <h4 className="font-sans font-bold text-sm text-zinc-805 dark:text-zinc-200">Enviando propuesta encriptada...</h4>
                      <p className="text-[10px] text-zinc-400 font-mono">POST /api/contact_dispatch_simulation HTTPS/1.1</p>
                    </div>
                  </motion.div>
                )}

                {formStatus === 'success' && (
                  <motion.div
                    key="modal-success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center h-[260px] text-center space-y-4"
                  >
                    <div className="p-3 bg-sky-500/10 dark:bg-sky-500/10 rounded-full border border-sky-500/20 text-sky-450">
                      <CheckCircle size={36} />
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-sans font-bold text-base text-zinc-900 dark:text-white">¡Propuesta enviada con éxito!</h4>
                      <p className="text-xs text-zinc-500 dark:text-slate-400 leading-relaxed">
                        El simulador ha enviado el mensaje a <strong>{personalInfo.email}</strong>. Luis Santiago recibirá este aviso y se pondrá en contacto contigo muy pronto.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-black font-extrabold text-xs rounded-full transition-all cursor-pointer"
                    >
                      Entendido
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
