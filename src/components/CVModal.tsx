import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MapPin, FileText, Printer, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { language } = useLanguage();
  const isEs = language === 'es';

  // Custom print-engine to export CV directly as a pixel-perfect, vector PDF
  const handlePrintCV = () => {
    // Elegant standalone HTML template for the printed PDF Page
    const printHTML = `
      <!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <title>CV Luis Santiago Morales - ${isEs ? 'Desarrollador Web Junior' : 'Junior Web Developer'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            color: #1c1917;
            background: #ffffff;
            line-height: 1.45;
            padding: 40px;
            font-size: 11.5px;
            width: 210mm; /* A4 size */
            margin: 0 auto;
          }
          
          /* Header layout of the CV matching the PDF exactly */
          .header-container {
            text-align: center;
            margin-bottom: 12px;
          }
          .name {
            font-size: 26px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 6px;
            letter-spacing: -0.01em;
          }
          .contacts {
            font-size: 10.5px;
            color: #1c1917;
            margin-bottom: 10px;
          }
          .contacts a {
            color: #111827;
            text-decoration: underline;
          }
          .divider {
            border: 0;
            border-top: 1px solid #1c1917;
            margin: 12px 0;
          }
          .bio-text {
            font-style: italic;
            color: #1c1917;
            font-size: 10.5px;
            text-align: justify;
            margin-bottom: 16px;
            line-height: 1.5;
          }
          
          /* Sections */
          .section-title {
            font-size: 12.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #000000;
            border-bottom: 1.5px solid #1c1917;
            padding-bottom: 2px;
            margin-top: 16px;
            margin-bottom: 12px;
          }
          
          /* Lists and Jobs */
          .job-entry {
            margin-bottom: 6px;
          }
          .flex-justify {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
          }
          .bold-title {
            font-weight: 700;
            color: #000000;
          }
          .italic-subtitle {
            font-style: italic;
            color: #1c1917;
            font-size: 10.5px;
          }
          .meta-text {
            font-size: 10.5px;
            color: #1c1917;
          }
          
          .bullets-list {
            list-style-type: disc;
            margin-left: 18px;
            margin-top: 6px;
            margin-bottom: 10px;
          }
          .bullets-list li {
            margin-bottom: 4px;
            color: #1c1917;
            text-align: justify;
            font-size: 10.5px;
            line-height: 1.4;
          }
          
          /* Habilidades técnicas layout */
          .tech-row {
            margin-bottom: 6px;
            font-size: 10.5px;
          }
          .tech-category {
            font-weight: 700;
            color: #000000;
            display: inline-block;
          }
          
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="header-container">
          <div class="name">Luis Santiago Morales</div>
          <div class="contacts">
            Barcelona, España &middot; 
            <a href="https://github.com/luissantiag0" target="_blank">github.com/luissantiago0</a> &middot; 
            +34 667 28 75 87 &middot; 
            luissantiagomorales07@gmail.com
          </div>
        </div>
        
        <hr class="divider"/>
        
        <div class="bio-text">
          ${isEs 
            ? 'Estudiante de Desarrollo de Aplicaciones Web con formación previa en SMX y experiencia en soporte técnico. Interesado en desarrollo web, backend y automatización. Busco prácticas FCT o DUAL donde seguir creciendo como desarrollador.'
            : 'Web Application Development student with prior background in microcomputer systems and helpdesk experience. Interested in web development, backend engineering, and automation. Looking for FCT or DUAL internships to continue growing as a developer.'
          }
        </div>
        
        <!-- EXPERIENCIA PROFESIONAL -->
        <div class="section-title">${isEs ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'}</div>
        <div class="job-entry">
          <div class="flex-justify">
            <span class="bold-title">Escola Prim</span>
            <span class="meta-text">${isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
          </div>
          <div class="flex-justify">
            <span class="italic-subtitle">${isEs ? 'Prácticas en Soporte Técnico Informático' : 'IT Helpdesk Support Intern'}</span>
            <span class="meta-text">${isEs ? 'Septiembre 2024&ndash;Marzo 2025' : 'September 2024&ndash;March 2025'}</span>
          </div>
          <ul class="bullets-list">
            <li>${isEs ? 'Diagnostiqué y resolví incidencias en equipos informáticos, impresoras y periféricos.' : 'Diagnosed and resolved incidents in computer systems, printer rigs, and peripherals.'}</li>
            <li>${isEs ? 'Realicé mantenimiento preventivo y correctivo de ordenadores, tablets y portátiles.' : 'Performed preventive and corrective maintenance on local computers, tablets, and laptops.'}</li>
            <li>${isEs ? 'Instalé y actualicé software, garantizando su compatibilidad con las necesidades del usuario.' : 'Installed and updated system applications, guaranteeing full alignment with end-user requirements.'}</li>
            <li>${isEs ? 'Brindé soporte técnico a docentes y personal del centro en problemas de hardware y software.' : 'Delivered immediate hardware and software troubleshooting to teachers and academic staff.'}</li>
            <li>${isEs ? 'Impartí formación básica en herramientas ofimáticas (Excel, Word, LibreOffice) para mejorar la productividad.' : 'Taught fundamental concepts of productivity spreadsheets and office packages to improve general output.'}</li>
          </ul>
        </div>
        
        <!-- EDUCACIÓN -->
        <div class="section-title">${isEs ? 'EDUCACIÓN' : 'EDUCATION'}</div>
        <div class="job-entry" style="margin-bottom: 8px;">
          <div class="flex-justify">
            <span class="bold-title">Instituto La Pineda</span>
            <span class="meta-text">${isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
          </div>
          <div class="flex-justify">
            <span class="italic-subtitle">${isEs ? 'Grado Superior en Desarrollo de Aplicaciones Web' : 'Higher Degree in Web Application Development (DAW)'}</span>
            <span class="meta-text">${isEs ? 'Sep 2025 - Actualidad' : 'Sep 2025 - Present'}</span>
          </div>
        </div>
        
        <div class="job-entry">
          <div class="flex-justify">
            <span class="bold-title">Instituto La Pineda</span>
            <span class="meta-text">${isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
          </div>
          <div class="flex-justify">
            <span class="italic-subtitle">${isEs ? 'Grado Medio en Sistemas Microinformáticos y Redes' : 'Intermediate Degree in Microcomputer Systems & Networks (SMX)'}</span>
            <span class="meta-text">${isEs ? 'Jun 2025' : 'Jun 2025'}</span>
          </div>
        </div>
        
        <!-- HABILIDADES TÉCNICAS -->
        <div class="section-title">${isEs ? 'HABILIDADES TÉCNICAS' : 'TECHNICAL SKILLS'}</div>
        <div class="tech-row">
          <span class="tech-category">&bull; Frontend :</span> HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Astro.
        </div>
        <div class="tech-row">
          <span class="tech-category">&bull; Backend:</span> Java, Python, PHP.
        </div>
        <div class="tech-row">
          <span class="tech-category">&bull; Bases de datos:</span> SQL, PostgreSQL.
        </div>
        <div class="tech-row">
          <span class="tech-category">&bull; Herramientas :</span> Git & GitHub.
        </div>
        
        <!-- HABILIDADES ADICIONALES -->
        <div class="section-title">${isEs ? 'HABILIDADES ADICIONALES' : 'ADDITIONAL SKILLS'}</div>
        <ul class="bullets-list">
          <li>${isEs ? 'Experiencia en trabajo colaborativo en proyectos' : 'Structured teamwork and project milestone collaboration.'}</li>
          <li>${isEs ? 'Habilidad para explicar conceptos técnicos a usuarios no especializados.' : 'Strong communication skills making code setups comprehensible of non-technical communities.'}</li>
          <li>${isEs ? 'Resolución de incidencias y atención a usuarios' : 'Prompt troubleshooting response and user-service helpdesk approach.'}</li>
          <li>${isEs ? 'Nativo en Español y Catalán.' : 'Native Spanish and Catalan speaker.'}</li>
        </ul>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
      </html>
    `;

    // Open printing in a hidden frame so you compile the PDF crisp without polluting the tab layout
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(printHTML);
      doc.close();
      
      // Clean up DOM after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cv-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md overflow-hidden"
        >
          {/* Framer motion transition card */}
          <motion.div
            id="cv-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-white dark:bg-[#0A0A0A] w-full max-w-5xl h-[90vh] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Modal Header Actions Bar */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-50 dark:bg-white/5 flex-shrink-0 select-none">
              <div className="flex items-center space-x-2.5">
                <FileText className="text-sky-500" size={18} />
                <h3 className="font-sans font-extrabold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
                  {isEs ? 'Currículum Vitae' : 'Professional CV'}
                </h3>
                <span className="hidden sm:inline px-2 py-0.5 bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 font-mono text-[9px] font-bold uppercase rounded-full">
                  {isEs ? 'PDF Reclutadores' : 'Recruiters PDF'}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  id="cv-save-pdf-header-btn"
                  onClick={handlePrintCV}
                  className="flex-1 sm:flex-none px-4 py-2 bg-sky-500 hover:bg-sky-450 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer border-0"
                >
                  <Printer size={14} />
                  <span>{isEs ? 'Guardar o Imprimir PDF' : 'Save or Print PDF'}</span>
                </button>

                <button
                  id="cv-close-btn"
                  onClick={onClose}
                  className="p-2.5 bg-zinc-105 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors cursor-pointer border border-transparent dark:border-white/10"
                  aria-label="Close cv"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded Paper Document Simulation container */}
            <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-8 bg-zinc-100 dark:bg-[#060606] scrollbar-thin">
              {/* Perfect simulated CV paper sheet matching the PDF visually */}
              <div className="max-w-[800px] mx-auto bg-white text-zinc-900 rounded-2xl shadow-xl border border-zinc-200 p-6 sm:p-12 flex flex-col space-y-6">
                
                {/* Simulated Header block */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-sans font-bold tracking-tight text-black">
                    Luis Santiago Morales
                  </h1>
                  <p className="text-xs text-zinc-700 font-mono flex flex-wrap justify-center gap-x-2 gap-y-1">
                    <span>Barcelona, España</span> &bull; 
                    <a href="https://github.com/luissantiag0" className="text-sky-600 hover:underline">github.com/luissantiago0</a> &bull; 
                    <span>+34 667 28 75 87</span> &bull; 
                    <span className="text-zinc-800">luissantiagomorales07@gmail.com</span>
                  </p>
                </div>

                <hr className="border-t border-zinc-900" />

                {/* Subtitle bio statement */}
                <p className="text-xs text-zinc-800 leading-relaxed italic text-justify">
                  {isEs 
                    ? 'Estudiante de Desarrollo de Aplicaciones Web con formación previa en SMX y experiencia en soporte técnico. Interesado en desarrollo web, backend y automatización. Busco prácticas FCT o DUAL donde seguir creciendo como desarrollador.'
                    : 'Web Application Development student with prior background in microcomputer systems and helpdesk experience. Interested in web development, backend engineering, and automation. Looking for FCT or DUAL internships to continue growing as a developer.'
                  }
                </p>

                {/* Experiencia Profesional */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-900 pb-1 uppercase">
                    {isEs ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE'}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-xs">Escola Prim</span>
                      <span className="text-xs text-zinc-700">{isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="italic text-xs text-zinc-800">{isEs ? 'Prácticas en Soporte Técnico Informático' : 'IT Helpdesk Support Intern'}</span>
                      <span className="text-xs text-zinc-700">{isEs ? 'Septiembre 2024–Marzo 2025' : 'September 2024–March 2025'}</span>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-800 text-justify">
                      <li>{isEs ? 'Diagnostiqué y resolví incidencias en equipos informáticos, impresoras y periféricos.' : 'Diagnosed and resolved incidents in computer systems, printer rigs, and peripherals.'}</li>
                      <li>{isEs ? 'Realicé mantenimiento preventivo y correctivo de ordenadores, tablets y portátiles.' : 'Performed preventive and corrective maintenance on local computers, tablets, and laptops.'}</li>
                      <li>{isEs ? 'Instalé y actualicé software, garantizando su compatibilidad con las necesidades del usuario.' : 'Installed and updated system applications, guaranteeing full alignment with end-user requirements.'}</li>
                      <li>{isEs ? 'Brindé soporte técnico a docentes y personal del centro en problemas de hardware y software.' : 'Delivered immediate hardware and software troubleshooting to teachers and academic staff.'}</li>
                      <li>{isEs ? 'Impartí formación básica en herramientas ofimáticas (Excel, Word, LibreOffice) para mejorar la productividad.' : 'Taught fundamental concepts of productivity spreadsheets and office packages to improve general output.'}</li>
                    </ul>
                  </div>
                </div>

                {/* Educación */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-900 pb-1 uppercase">
                    {isEs ? 'EDUCACIÓN' : 'EDUCATION'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-xs">Instituto La Pineda</span>
                        <span className="text-xs text-zinc-700">{isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="italic text-xs text-zinc-800">{isEs ? 'Grado Superior en Desarrollo de Aplicaciones Web' : 'Higher Degree in Web Application Development (DAW)'}</span>
                        <span className="text-xs text-zinc-700">{isEs ? 'Sep 2025 - Actualidad' : 'Sep 2025 - Present'}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-xs">Instituto La Pineda</span>
                        <span className="text-xs text-zinc-700">{isEs ? 'Barcelona, España' : 'Barcelona, Spain'}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="italic text-xs text-zinc-800">{isEs ? 'Grado Medio en Sistemas Microinformáticos y Redes' : 'Intermediate Degree in Microcomputer Systems & Networks (SMX)'}</span>
                        <span className="text-xs text-zinc-700">Jun 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Habilidades Técnicas */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-900 pb-1 uppercase">
                    {isEs ? 'HABILIDADES TÉCNICAS' : 'TECHNICAL SKILLS'}
                  </h3>
                  
                  <div className="space-y-1.5 text-xs text-zinc-850">
                    <div className="flex">
                      <span className="font-bold w-36">&bull; Frontend :</span>
                      <span>HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Astro.</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-36">&bull; Backend:</span>
                      <span>Java, Python, PHP.</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-36">&bull; Bases de datos:</span>
                      <span>SQL, PostgreSQL.</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-36">&bull; Herramientas :</span>
                      <span>Git & GitHub.</span>
                    </div>
                  </div>
                </div>

                {/* Habilidades Adicionales */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold tracking-wider text-black border-b border-zinc-900 pb-1 uppercase">
                    {isEs ? 'HABILIDADES ADICIONALES' : 'ADDITIONAL SKILLS'}
                  </h3>
                  
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-800">
                    <li>{isEs ? 'Experiencia en trabajo colaborativo en proyectos' : 'Structured teamwork and project milestone collaboration.'}</li>
                    <li>{isEs ? 'Habilidad para explicar conceptos técnicos a usuarios no especializados.' : 'Strong communication skills making code setups comprehensible of non-technical communities.'}</li>
                    <li>{isEs ? 'Resolución de incidencias y atención a usuarios' : 'Prompt troubleshooting response and user-service helpdesk approach.'}</li>
                    <li>{isEs ? 'Nativo en Español y Catalán.' : 'Native Spanish and Catalan speaker.'}</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Bottom help bar */}
            <div className="bg-white dark:bg-[#0A0A0A] px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-slate-400 select-none flex-shrink-0">
              {isEs 
                ? 'Para guardar el archivo como PDF, en el cuadro de diálogo de impresión de tu navegador selecciona la opción "Guardar como PDF / Save as PDF".'
                : 'To export this layout as a resume document, select the "Save as PDF" device destination on your system print options page.'
              }
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
