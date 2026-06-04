import React, { createContext, useContext, useState, useEffect } from 'react';
import { personalInfo as originalPersonalInfo } from '../data';
import averionDashboardImage from '../assets/images/averion-dashboard.png';
import mdvDashboardImage from '../assets/images/mdv-dashboard.png';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tObj: (key: string) => any;
  personalInfo: typeof originalPersonalInfo;
  skills: any[];
  projects: any[];
  experienceIniciativa: any[];
  dawModules: any[];
  softSkills: any[];
}

const staticTranslations: Record<Language, Record<string, any>> = {
  es: {
    // Navbar
    'nav.inicio': 'Inicio',
    'nav.aboutme': 'Sobre mí',
    'nav.technologies': 'Tecnologías',
    'nav.projects': 'Proyectos',
    'nav.contacto': 'Contacto',
    'nav.download_cv': 'Descargar CV',
    'nav.hire_me': '¿Me contratas?',

    // Hero Section
    'hero.available': 'Disponible para FCT, prácticas y ofertas junior',
    'hero.greeting': 'Hola, mi nombre es',
    'hero.phrase.0': 'Desarrollador Web Junior',
    'hero.phrase.1': 'Apasionado por la tecnología',
    'hero.phrase.2': 'Solucionador de problemas',
    'hero.contact_now': 'Contactar ahora',
    'hero.view_cv': 'Ver Currículum (CV)',
    'hero.copy_email': 'Copiar Email',
    'hero.email_copied': '¡Email Copiado!',
    'hero.links': 'Enlaces:',
    'hero.terminal.title': 'luissantiago-dev ~ zsh',
    'hero.terminal.query': '# Consultando perfil de luis_santiago en bash...',
    'hero.terminal.run_compilation': '# Simulación: compila el código del portfolio',
    'hero.terminal.execute_comp': 'Ejecutar Compilador',
    'hero.terminal.compiling': 'Compilando...',
    'hero.terminal.compile_status': 'Refactorizando dependencias...',
    'hero.terminal.compile_ok': '✓ [OK] Compilación exitosa.',
    'hero.terminal.compile_no_errors': '✓ Cero errores lógicos de tipado.',
    'hero.terminal.compile_opt': '✓ Optimización de rendimiento activa (Lighthouse: 100%).',
    'hero.terminal.foot_ver': 'Luis Portfolio System v1.5',
    'hero.terminal.tls': 'Conexión Protegida TLS',

    // About Me
    'about.subtitle': 'Sobre mí',
    'about.title': 'Pasión por resolver problemas mediante código lógico',
    'about.trajectory': 'Mi Trayectoria en DAW',
    'about.stats.studies': 'Estudios Oficiales',
    'about.stats.projects': 'Proyectos Robustos',
    'about.stats.motivation': 'Motivación FCT',
    'about.values': 'Mis Valores Profesionales',
    'about.location.title': 'Localización',
    'about.location.val': 'Badalona, España',
    'about.location.pitch': 'Busco integrarme a equipos dinámicos y metodologías ágiles de forma presencial u remota. Flexibilidad horaria e incorporación inmediata durante el período de prácticas FCT o como programador junior.',
    'about.qual.clean': 'Código Limpio',
    'about.qual.git': 'Control de versiones',
    'about.qual.db': 'Modelo Relacional',
    'about.qual.team': 'Trabajo en equipo',

    // Technologies
    'tech.subtitle': 'Tecnologías',
    'tech.title': 'Stack Técnico de Desarrollo Web',
    'tech.desc': 'Consolidado a través del riguroso plan de estudios de DAW y reforzado autónomamente con proyectos de programación interactivos.',
    'tech.cat.all': 'Todos',
    'tech.cat.frontend': 'Frontend',
    'tech.cat.backend': 'Backend / Lógica',
    'tech.cat.database': 'Bases de Datos',
    'tech.cat.tools': 'Herramientas',
    'tech.dashboard.database': 'Persistencia Estructurada',
    'tech.dashboard.backend': 'Lógica de Servidor',
    'tech.dashboard.frontend': 'Capa de Cliente',
    'tech.dashboard.tools': 'Flujo de Trabajo',
    'tech.dashboard.concept': 'Concepto e Integridad:',
    'tech.dashboard.methodology': 'Metodología:',
    'tech.dashboard.method_val': 'Teórico-Práctica',
    'tech.dashboard.method_val_tools': 'Estándar Profesional',
    'tech.dashboard.origin': 'Origen:',
    'tech.dashboard.origin_val': 'Plan DAW',
    'tech.dashboard.usage': '¿Cómo lo aplico en mis proyectos?',
    'tech.dashboard.select_placeholder': 'Selecciona una tecnología para ver su detalle analítico',

    // Projects
    'projects.subtitle': 'Mis Proyectos',
    'projects.title': 'Soluciones Prácticas Desarrolladas',
    'projects.desc': 'Una colección de proyectos detallados donde aplico activamente los conocimientos adquiridos en DAW y mi autoaprendizaje.',
    'projects.show_details': 'Mostrar Análisis Técnico (Desafío y Solución)',
    'projects.hide_details': 'Ocultar Análisis Técnico',
    'projects.challenge': 'El Desafío',
    'projects.solution': 'La Solución Técnica',
    'projects.view_code': 'Ver Código',
    'projects.architecture': 'Arquitectura DAW',

    // Contact Form
    'contact.subtitle': 'Contacto',
    'contact.title': 'Construyamos el Canal de Comunicación',
    'contact.desc': 'Si te interesa mi perfil técnico motivado como estudiante de DAW para tus prácticas de FCT o una vacante de desarrollador junior, no dudes en escribirme.',
    'contact.direct': 'Contacto Directo',
    'contact.pitch': 'Tanto si tienes una propuesta de prácticas como si deseas hacerme una consulta sobre mi stack técnico, te atenderé encantado.',
    'contact.form_title': 'Enviar Mensaje Directo',
    'contact.name': 'Nombre Completo',
    'contact.email': 'Correo Electrónico',
    'contact.msg': 'Escribe tu mensaje...',
    'contact.msg.help': 'Explica brevemente los detalles de tu oferta o proyecto',
    'contact.send': 'Enviar Propuesta Segura',
    'contact.sending': 'Procesando Envío...',
    'contact.success': '¡Mensaje Enviado con Éxito!',
    'contact.success_desc': 'Gracias por contactar. Me pondré en contacto contigo lo antes posible para evaluar tu propuesta técnica.',
    'contact.error.name': 'Por favor, introduce tu nombre',
    'contact.error.email': 'Por favor, introduce un correo electrónico válido',
    'contact.error.msg': 'Por favor, escribe tu mensaje',
    'contact.copy_tel': 'Copiar Teléfono',
    'contact.tel_copied': '¡Copiado!',

    // Footer
    'footer.desc': 'Estudiante de Desarrollo de Aplicaciones Web. Enfocado en código de alta integridad y optimización para sentar una base profesional sólida.',
    'footer.nav': 'Navegación',
    'footer.areas': 'Áreas Clave',
    'footer.contact': 'Contacto Directo',
    'footer.web_form': 'Formulario Web',
    'footer.commitment': 'Compromiso Técnico',
    'footer.commitment.title': 'Normas de Calidad',
    'footer.commitment.desc': 'Interfaces semánticas, cumplimiento estricto del responsive, control total de flujos relacionales en bases de datos.',
    'footer.copyright': 'Luis Santiago Dev. Todos los derechos reservados.',
    'footer.validated': 'Código Validado de Forma Segura',

    // CV Modal
    'cv.title': 'Currículum Vitae Técnico',
    'cv.subtitle': 'Formato A4 optimizado • 1 Sola Página Reclutadores',
    'cv.print_btn': 'Guardar o Imprimir PDF',
    'cv.print_instruction': 'Para guardar el archivo como PDF, en el cuadro de diálogo de impresión de tu navegador selecciona la opción "Guardar como PDF / Save as PDF".',
    'cv.profile_title': 'Perfil Técnico',
    'cv.profile_desc': 'Apasionado de la programación estructurada y bases de datos robustas. Desarrollador proactivo formado de manera intensiva en asimilar arquitecturas con código limpio y modular. Disponible para aportar inmediato valor en tu equipo.',
    'cv.key_techs': 'Tecnologías Clave',
    'cv.mastery': 'Dominio',
    'cv.initiative': 'Iniciativa Profesional',
    'cv.initiative.desc1': 'Más de 15 horas semanales añadidas para refinar patrones como MVC en backends remotos.',
    'cv.initiative.desc2': 'Coordinación de flujos seguros de Git evitando colisiones en repositorios educativos compartidos.',
    'cv.daw_record': 'Expediente Curricular DAW (100% Superado)',
    'cv.module.prog': 'Programación Lógica y POO',
    'cv.module.prog.desc': 'Dominio de Java SE 11, polimorfismo, manejo modular de excepciones y colecciones avanzadas.',
    'cv.module.bd': 'Bases de Datos Relacionales',
    'cv.module.bd.desc': 'Transacciones consistentes ACID, normalizaciones a 3NF, disparadores y procedimientos.',
    'cv.module.dwes': 'Servidor Web (PHP OOP)',
    'cv.module.dwes.desc': 'Confección integrada de enrutadores, modelos MVC robustas, seguridad de tokens y cookies persistentes.',
    'cv.module.dwec': 'Desarrollo Cliente (JS ES6+)',
    'cv.module.dwec.desc': 'Lógica reactiva estructurada, asincronía nativa mediante Fetch API, promesas y control dinámico del DOM.',
    'cv.projects_highlight': 'Proyectos Destacados (Ver en Portfolio)',
    'cv.proposal': 'Propuesta de Incorporación Curricular FCT / Junior',
    'cv.proposal.bullets': '• Badalona, España (Listo para modalidad presencial u remota completa).\n• Alta iniciativa técnica, disciplina de autoaprendizaje continuo y adaptabilidad a metodologías Kanban / Scrum.'
  },
  en: {
    // Navbar
    'nav.inicio': 'Home',
    'nav.aboutme': 'About Me',
    'nav.technologies': 'Technologies',
    'nav.projects': 'Projects',
    'nav.contacto': 'Contact',
    'nav.download_cv': 'Download CV',
    'nav.hire_me': 'Hire Me?',

    // Hero Section
    'hero.available': 'Available for FCT, internship programs & junior positions',
    'hero.greeting': 'Hi, my name is',
    'hero.phrase.0': 'Junior Web Developer',
    'hero.phrase.1': 'Passionate about technology',
    'hero.phrase.2': 'Analytical problem solver',
    'hero.contact_now': 'Contact now',
    'hero.view_cv': 'View Resume (CV)',
    'hero.copy_email': 'Copy Email',
    'hero.email_copied': 'Email Copied!',
    'hero.links': 'Links:',
    'hero.terminal.title': 'luissantiago-dev ~ zsh',
    'hero.terminal.query': '# Querying profile for luis_santiago on bash...',
    'hero.terminal.run_compilation': '# Simulation: compile portfolio code',
    'hero.terminal.execute_comp': 'Run Compiler',
    'hero.terminal.compiling': 'Compiling...',
    'hero.terminal.compile_status': 'Refactoring dependencies...',
    'hero.terminal.compile_ok': '✓ [OK] Compilation successful.',
    'hero.terminal.compile_no_errors': '✓ Zero logical typing errors.',
    'hero.terminal.compile_opt': '✓ Active performance optimizations (Lighthouse: 100%).',
    'hero.terminal.foot_ver': 'Luis Portfolio System v1.5',
    'hero.terminal.tls': 'TLS Protected Connection',

    // About Me
    'about.subtitle': 'About Me',
    'about.title': 'Passion for solving problems with logical code',
    'about.trajectory': 'My Journey in DAW',
    'about.stats.studies': 'Official Studies',
    'about.stats.projects': 'Robust Projects',
    'about.stats.motivation': 'FCT Motivation',
    'about.values': 'My Professional Values',
    'about.location.title': 'Location',
    'about.location.val': 'Badalona, Spain',
    'about.location.pitch': 'I look forward to integrated teamwork on dynamic groups and agile methodologies both in-person or remotely. Flexible hours and immediate availability for the FCT school internship or junior backend/frontend opportunities.',
    'about.qual.clean': 'Clean Code',
    'about.qual.git': 'Version Control',
    'about.qual.db': 'Relational Model',
    'about.qual.team': 'Teamwork',

    // Technologies
    'tech.subtitle': 'Technologies',
    'tech.title': 'Web Development Tech Stack',
    'tech.desc': 'Consolidated through the rigorous DAW curriculum and actively reinforced autonomously with interactive program designs.',
    'tech.cat.all': 'All',
    'tech.cat.frontend': 'Frontend',
    'tech.cat.backend': 'Backend / Logic',
    'tech.cat.database': 'Databases',
    'tech.cat.tools': 'Tools',
    'tech.dashboard.database': 'Structured Databases',
    'tech.dashboard.backend': 'Server-Side Logic',
    'tech.dashboard.frontend': 'Frontend Layer',
    'tech.dashboard.tools': 'Workflow Tools',
    'tech.dashboard.concept': 'Concept & Integrity:',
    'tech.dashboard.methodology': 'Methodology:',
    'tech.dashboard.method_val': 'Theoretical-Practical',
    'tech.dashboard.method_val_tools': 'Professional Standard',
    'tech.dashboard.origin': 'Origin:',
    'tech.dashboard.origin_val': 'DAW Curriculum',
    'tech.dashboard.usage': 'How do I apply it in my projects?',
    'tech.dashboard.select_placeholder': 'Select a technology to view its analytical breakdown',

    // Projects
    'projects.subtitle': 'My Projects',
    'projects.title': 'Developed Practical Solutions',
    'projects.desc': 'A collection of detailed projects where I actively apply the knowledge acquired in DAW and my self-taught learning journey.',
    'projects.show_details': 'Show Technical Analysis (Challenge & Solution)',
    'projects.hide_details': 'Hide Technical Analysis',
    'projects.challenge': 'The Challenge',
    'projects.solution': 'The Technical Solution',
    'projects.view_code': 'View Code',
    'projects.architecture': 'DAW Architecture',

    // Contact Form
    'contact.subtitle': 'Contact',
    'contact.title': 'Let\'s Connect and Start the Conversation',
    'contact.desc': 'If you are interested in my technical profile as a motivated DAW student for your FCT internship or a junior developer position, feel free to write to me.',
    'contact.direct': 'Direct Contact',
    'contact.pitch': 'Whether you have an internship proposal or want to ask me a question about my technical stack, I will gladly assist you.',
    'contact.form_title': 'Send Direct Message',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.msg': 'Write your message...',
    'contact.msg.help': 'Briefly explain the details of your offer or project inquiry',
    'contact.send': 'Send Secure Proposal',
    'contact.sending': 'Processing Dispatch...',
    'contact.success': 'Message Sent Successfully!',
    'contact.success_desc': 'Thank you for reaching out. I will get in touch with you as soon as possible to evaluate your technical proposal.',
    'contact.error.name': 'Please enter your name',
    'contact.error.email': 'Please enter a valid email address',
    'contact.error.msg': 'Please write your message',
    'contact.copy_tel': 'Copy Phone',
    'contact.tel_copied': 'Copied!',

    // Footer
    'footer.desc': 'Web Application Development student. Focused on high-integrity code and optimizations to lay a solid professional foundation.',
    'footer.nav': 'Navigation',
    'footer.areas': 'Key Areas',
    'footer.contact': 'Direct Contact',
    'footer.web_form': 'Web Form',
    'footer.commitment': 'Technical Commitment',
    'footer.commitment.title': 'Quality Standards',
    'footer.commitment.desc': 'Semantic interfaces, strict responsive compliance, complete control of relational query flows in databases.',
    'footer.copyright': 'Luis Santiago Dev. All rights reserved.',
    'footer.validated': 'TLS Secure Code Validated',

    // CV Modal
    'cv.title': 'Technical Resume (CV)',
    'cv.subtitle': 'A4 optimized format • Single Page for Recruiters',
    'cv.print_btn': 'Save or Print PDF',
    'cv.print_instruction': 'To save the file as a PDF, in your browser\'s print dialog select the option "Save as PDF".',
    'cv.profile_title': 'Technical Profile',
    'cv.profile_desc': 'Passionate about structured programming and robust databases. Proactive developer trained intensively to assimilate software architectures with clean, modular code. Ready to bring immediate value to your team.',
    'cv.key_techs': 'Key Technologies',
    'cv.mastery': 'Mastery',
    'cv.initiative': 'Professional Initiative',
    'cv.initiative.desc1': 'Over 15 additional hours weekly dedicated to refining patterns such as MVC in remote backends.',
    'cv.initiative.desc2': 'Coordination of secure Git workflows, avoiding merge conflicts in shared educational repositories.',
    'cv.daw_record': 'DAW Academic Curriculum (100% Completed)',
    'cv.module.prog': 'Programming Logic & OOP',
    'cv.module.prog.desc': 'Mastery of Java SE 11, polymorphism, modular exception handling, and advanced collections.',
    'cv.module.bd': 'Relational Databases',
    'cv.module.bd.desc': 'ACID consistent transactions, database normalizations to 3NF, triggers, and stored procedures.',
    'cv.module.dwes': 'Web Server (PHP OOP)',
    'cv.module.dwes.desc': 'Integrated development of custom routers, secure MVC models, tokens security, and persistent cookies.',
    'cv.module.dwec': 'Web Client (JS ES6+)',
    'cv.module.dwec.desc': 'Structured reactive logic, native asynchronous integrations via Fetch API, promises, and DOM.',
    'cv.projects_highlight': 'Featured Projects (View in Portfolio)',
    'cv.proposal': 'Proposal for FCT Curriculum Internship / Junior Position',
    'cv.proposal.bullets': '• Badalona, Spain (Open to in-person or full hybrid remote).\n• High technical initiative, continuous self-learning discipline, and adaptability to Kanban/Scrum.'
  }
};

const personalTranslations: Record<Language, typeof originalPersonalInfo> = {
  es: {
    ...originalPersonalInfo
  },
  en: {
    fullName: 'Luis Santiago Morales',
    title: 'Junior Web Developer',
    academicStatus: 'Web Application Development Student (DAW)',
    aboutDescription: `I am highly passionate about coding and sketching out streamlined software solutions. I am currently studying a Higher Degree in Web Application Development (DAW), where I have funneled my scientific curiosity into designing robust, compliant, and beautifully modular web apps.\n\nWhile I do not yet have seasoned working experience in the tech industry, my daily routine revolves around crafting responsive frontends, designing robust relational schemas, and developing clean logic. I stand out for my self-taught discipline, agile comprehension of unfamiliar toolchains, and a strict commitment to engineering best practices (well-structured, highly cohesive code). I am fully prepared to deliver great value and initiative on my curricular FCT internships or as a fresh junior developer.`,
    shortBio: 'Web Application Development (DAW) student seeking professional internships and new web development challenges. Committed to clean design, fast databases, and solid full-stack structures.',
    location: 'Badalona, Spain',
    email: 'luissantiagomorales07@gmail.com',
    github: 'https://github.com/luissantiago0',
    linkedin: 'https://www.linkedin.com/in/luis-santiago-morales/'
  }
};

const skillsTranslations = (lang: Language) => {
  return [
    {
      name: 'HTML',
      category: 'frontend',
      level: 95,
      description: lang === 'es' 
        ? 'Estructuras semánticas accesibles, optimizadas para navegadores y estándares SEO.'
        : 'Accessible semantic structures, optimized for browsers and SEO standards.',
      iconName: 'html'
    },
    {
      name: 'CSS',
      category: 'frontend',
      level: 90,
      description: lang === 'es'
        ? 'Hojas de estilo fluidas, layouts modernos adaptativos y fluidez responsiva nativa.'
        : 'Fluid style sheets, modern adaptive layouts, and native responsive fluidity.',
      iconName: 'css'
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      level: 90,
      description: lang === 'es'
        ? 'Lógica interactiva asíncrona, consumos de API mediante fetch, promesas y manipulación del DOM.'
        : 'Asynchronous interactive logic, API feeds via fetch, promises, and modular DOM handling.',
      iconName: 'javascript'
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      level: 90,
      description: lang === 'es'
        ? 'Diseño rápido con utilidades, variables de tema fluidas y estructuras de responsive fluido.'
        : 'Rapid style setups, fluid layout utilities, customizable theme bindings, and adaptive view formats.',
      iconName: 'tailwind'
    },
    {
      name: 'Astro',
      category: 'frontend',
      level: 80,
      description: lang === 'es'
        ? 'Construcción de sitios estáticos increíblemente rápidos apoyados en arquitectura de islas modular.'
        : 'Supercharging performant static sites leveraging modular component islands architectures.',
      iconName: 'astro'
    },
    {
      name: 'Java',
      category: 'backend',
      level: 65,
      description: lang === 'es'
        ? 'Programación orientada a objetos robusta (POO), manejo estricto de colecciones y control estructurado de errores.'
        : 'Strong object-oriented structuring, multi-tier inheritance, collection algorithms, and solid exceptions routing.',
      iconName: 'java'
    },
    {
      name: 'Python',
      category: 'backend',
      level: 60,
      description: lang === 'es'
        ? 'Automatizaciones, scripting rápido, análisis estructurado y lógica backend ligera.'
        : 'Automations, robust server scripting, clean data models, and lightweight API pipelines.',
      iconName: 'python'
    },
    {
      name: 'PHP',
      category: 'backend',
      level: 82,
      description: lang === 'es'
        ? 'Desarrollo en servidor de carácter POO, variables locales de sesión persistentes y formularios controlados.'
        : 'Server-side OOP development, safe session wrappers, form integrity checks, and clean file routing.',
      iconName: 'php'
    },
    {
      name: 'SQL',
      category: 'database',
      level: 85,
      description: lang === 'es'
        ? 'Modelo de datos entidad-relación, integridad con claves, transacciones ACID consistentes y consultas unidas.'
        : 'Entity-relationship designing, composite keys, ACID transactions, and optimized recursive query joins.',
      iconName: 'sql'
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      level: 65,
      description: lang === 'es'
        ? 'Administración de bases de datos relacionales avanzadas, vistas lógicas, disparadores y optimización estructural.'
        : 'Managing advanced relational persistence, abstract views, reactive triggers, and nested query speedups.',
      iconName: 'postgresql'
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      level: 88,
      description: lang === 'es'
        ? 'Control de versiones eficiente, pull requests minuciosas y fusión de ramas libre de conflictos.'
        : 'High-end versioning pipelines, cohesive branch tracking, PR review systems, and clean code merging.',
      iconName: 'git'
    },
    {
      name: 'Vercel',
      category: 'tools',
      level: 80,
      description: lang === 'es'
        ? 'Despliegues continuos, orquestación rápida de webs integradas con GitHub en la nube.'
        : 'Continuous hosting integration, automated web pipelines synced over remote GitHub repositories.',
      iconName: 'vercel'
    }
  ];
};

const projectsTranslations = (lang: Language) => {
  const isEs = lang === 'es';
  // Use images dynamically
  const averionUiImage = originalPersonalInfo.fullName ? originalPersonalInfo : ''; 
  
  return [
    {
      id: 'averion-ai',
      title: isEs ? 'Averion AI - Plataforma de Infraestructura de IA' : 'Averion AI - AI Infrastructure Platform',
      description: isEs
        ? 'Plataforma moderna para la creación, gestión y orquestación de infraestructura de sistemas de IA y agentes asíncronos.'
        : 'Modern platform for creating, managing, and orchestrating AI system infrastructure and asynchronous agents.',
      detailedDescription: isEs
        ? 'Averion AI nace como un portal avanzado para orquestar múltiples procesos de IA autónomos en paralelo. Integra un ecosistema robusto de colas distribuidas, control de acceso perimetral para agentes y visualizadores de logs concurrente.'
        : 'Averion AI was designed as a sophisticated control layer to orchestrate multiple autonomous AI agents in parallel. Integrates a robust system of distributed queues, perimeter agent access rights, and concurrent logging workspaces.',
      challenges: isEs
        ? 'El reto central consistió en diseñar un motor capaz de coordinar múltiples peticiones de IA concurrentes a gran escala sin demorar el renderizado SSR de Astro o comprometer la reactividad de la interfaz de usuario en tiempo real.'
        : 'The core challenge lay in designing a gateway capable of coordinating concurrent real-time AI requests at scale without stalling Astro’s SSR rendering or causing flickering in client-side interaction frames.',
      solution: isEs
        ? 'Implementé un sistema híbrido empleando workers asíncronos desacoplados del hilo principal combinados con colas de procesamiento con prioridad. Reduje el coste computacional del SSR estructurando la interfaz con Astro Islands interactivas y aceleré la persistencia en MySQL mediante índices compuestos y consultas preparadas.'
        : 'I shaped a hybrid solution utilizing asynchronous workers isolated from the main thread working with dynamically-prioritized queues. Subscribed interactive islands using Astro Islands to bypass hefty SSR rendering costs, and speed-optimized MySQL operations using composite indices and parameterized queries.',
      role: isEs ? 'Desarrollador Full-stack (Creador & Diseñador de Software)' : 'Full-stack Developer (Creator & Software Designer)',
      category: 'web-app',
      technologies: ['Astro', 'TypeScript', 'MySQL', 'Web Workers', 'Tailwind CSS', 'SSR Islands'],
      githubUrl: 'https://github.com/luissantiag0/AverionAI',
      demoUrl: 'https://averionai.es/',
      imageAccent: 'from-violet-600 via-indigo-600 to-sky-600',
      imageUrl: averionDashboardImage,
      imagePlaceholderUrl: averionDashboardImage
    },
    {
      id: 'web-iglesia-mdv',
      title: isEs ? 'Web Iglesia MDV - Plataforma Comunitaria' : 'MDV Church Web - Community Platform',
      description: isEs
        ? 'Plataforma web modular para la gestión de contenido, eventos y recursos pastorales de la iglesia.'
        : 'Modular web platform for content management, events tracker, and pastoral media resources for the church community.',
      detailedDescription: isEs
        ? 'Un portal modular diseñado e implementado para digitalizar y centralizar la comunicación de la iglesia. Incluye secciones dinámicas para la visualización de predicaciones semanales, calendarios litúrgicos interactivos de eventos, anuncios urgentes y descarga de recursos formativos.'
        : 'A modular solution engineered to digitize and unify community announcements. Integrates live-stream sermon modules, digital interactive events tracking, banner highlights, and accessible document download panels for learning resources.',
      challenges: isEs
        ? 'El mayor desafío técnico consistió en diseñar un sistema de actualización de contenido lo suficientemente interactivo y simple que facilitara la actualización diaria de folletos y grabaciones de audio/video por parte de colaboradores no técnicos, sin requerir cambios de código, y todo optimizado para cargas eficientes sobre redes móviles lentas.'
        : 'The chief challenge was ensuring that non-technical contributors could quickly upload media and events weekly without altering codebase configurations, while conserving image and script sizes for reliable, lightweight access on mobile networks.',
      solution: isEs
        ? 'Desarrollé una arquitectura ligera utilizando componentes TypeScript puros, desacoplados mediante plantillas modulares HTML con inyección dinámica de datos estructurados. Se redujo el peso global de la página implementando carga diferida (lazy loading) exhaustiva en imágenes o embeds, logrando un rendimiento óptimo y accesible en dispositivos de gama baja.'
        : 'I engineered a highly modular runtime in pure TypeScript coupled with HTML template injection. Scaled down overhead weights by specifying strict lazy loading behaviors for graphic assets and video embeds, making the platform accessible and lightning-fast on mobile devices.',
      role: isEs ? 'Desarrollador Web Principal (Conceptualización & Despliegue)' : 'Lead Web Developer (Conceptualization & Deployment)',
      category: 'web-app',
      technologies: ['TypeScript', 'HTML5 Semántico', 'CSS3 Puro', 'Componentes Modulares', 'Lazy Loading', 'Responsive Layouts'],
      githubUrl: 'https://github.com/luissantiag0/web-iglesia-mdv',
      demoUrl: 'https://www.iglesiamdv.es/',
      imageAccent: 'from-amber-600 via-yellow-500 to-orange-500',
      imageUrl: mdvDashboardImage,
      imagePlaceholderUrl: mdvDashboardImage
    },
    {
      id: 'vyntra-fitness',
      title: isEs ? 'VYNTRA - Aplicación Fitness' : 'VYNTRA - Fitness & Performance Tracking',
      description: isEs
        ? 'Plataforma interactiva para el seguimiento de rutinas de entrenamiento, cálculo de calorías, macros y análisis personalizado.'
        : 'Interactive platform for tracking workout routines, counting calorie intake, macros, and personalized sports metrics.',
      detailedDescription: isEs
        ? 'VYNTRA es un sistema completo diseñado para digitalizar la planificación de ejercicios de fuerza. Permite a los usuarios organizar rutinas semanales, registrar marcas personales enlazadas a gráficas de progreso y medir valores macronutrientes.'
        : 'VYNTRA is a direct fitness hub engineered to keep strength logs structured. It allows users to program weekly workouts, log personalized metrics linked directly with interactive progress diagrams, and track optimal sports nutrition.',
      challenges: isEs
        ? 'El mayor desafío fue desarrollar un Training Planner Adaptivo que ajustara dinámicamente las rutinas según el rendimiento del usuario, evitando la monotonía y optimizando la progresión sin intervención manual constante.'
        : 'The biggest challenge was building an Adaptive Training Planner that dynamically adjusts routines based on user performance, avoiding monotony and optimizing progression without constant manual input.',
      solution: isEs
        ? 'Diseñé un motor de lógica progresiva en TypeScript que analiza el histórico de entrenamiento, calcula la fatiga acumulada y sugiere variaciones óptimas de series, repes y pesos. Los datos se persisten en MySQL con consultas preparadas y el frontend renderiza en tiempo real los ajustes semanales mediante componentes React con gráficos SVG interactivos.'
        : 'I built a progressive logic engine in TypeScript that analyzes workout history, calculates accumulated fatigue, and suggests optimal sets, reps, and weight variations. Data is persisted in MySQL with prepared statements, and the frontend renders weekly adjustments in real time using React components with interactive SVG charts.',
      role: isEs ? 'Desarrollador Full-stack' : 'Full-stack Developer',
      category: 'web-app',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'SVG Charts', 'Adaptive Algorithms'],
      githubUrl: 'https://github.com/luissantiag0/VYNTRA',
      demoUrl: 'https://vyntra-893133637954.europe-west2.run.app/',
      imageAccent: 'from-blue-600 via-indigo-600 to-violet-600',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'scalable-ai-backend',
      title: isEs ? 'Scalable AI Agents & Automation Backend' : 'Scalable AI Agents & Automation Backend',
      description: isEs
        ? 'Motor backend de alta disponibilidad para la automatización de tareas lógicas y la orquestación distribuida de agentes de IA asíncronos.'
        : 'High-availability backend service for logic automations and distributed asynchronous AI agent integrations.',
      detailedDescription: isEs
        ? 'Una arquitectura backend desacoplada orientada a coordinar colas de agentes de inteligencia artificial. Integra protección contra sobrecargas de API, validación estricta de payloads JSON y manejo paralelo asíncrono.'
        : 'A decoupled server-side engine optimized to coordinate concurrent intelligence agent worker threads. Integrates API rate-limiting rules, strict JSON payload filters, and concurrent async worker queues.',
      challenges: isEs
        ? 'Estabilización de procesos recurrentes evitando bloqueos de hilos (thread locks) y controlando la latencia en las conexiones concurrentes a las bases de datos.'
        : 'Managing backend processes while eliminating database thread blocks, and tracking latencies across continuous third-party requests and model lookups.',
      solution: isEs
        ? 'Diseñé una persistencia ágil con PostgreSQL implementando índices analíticos robustos, configuré colas asíncronas escalables de procesos en NodeJS y programé controladores desacoplados reutilizables.'
        : 'I configured high-performance PostgreSQL persistence utilizing selective indices, structured non-blocking node event loops with Express controllers, and orchestrated modular tasks workflows.',
      role: isEs ? 'Desarrollador Backend / DevOps' : 'Backend Developer / DevOps',
      category: 'web-app',
      technologies: ['Node.js', 'PostgreSQL', 'Express', 'TypeScript', 'Concurrency Pools', 'JSON Rest API'],
      githubUrl: 'https://github.com/luissantiag0/scalable-ai-backend',
      imageAccent: 'from-emerald-500 via-teal-600 to-cyan-600',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
    }
  ];
};

const experienceTranslations = (lang: Language) => {
  return lang === 'es' ? [
    {
      title: 'Iniciativa de Proyectos Personales y Prácticas DAW',
      subtitle: 'Enfoque práctico intensivo',
      period: '2025 - Presente',
      description: 'Para complementar mis estudios académicos y destacar en el mercado técnico, dedico más de 15 horas semanales adicionales a la construcción de arquitecturas de software limpias.',
      highlights: [
        'Implementación rigurosa de patrones de diseño clásicos como MVC en backends de PHP y Singletons en Java.',
        'Refactorización constante de repositorios de código usando ramificaciones de Git limpias y documentadas.',
        'Auto-formación continua en desarrollo con React y Tailwind CSS, dominando el ecosistema modular de componentes moderno.'
      ]
    },
    {
      title: 'Proyectos Académicos de DAW en Equipo',
      subtitle: 'Desarrollador y Coordinador Git',
      period: '2025',
      description: 'Participé activamente en la resolución de problemas lógicos de bases de datos y desarrollo colaborativo en el aula de DAW.',
      highlights: [
        'Normalización de bases de datos relacionales complejas hasta la 3ª Forma Normal (3NF), garantizando la no duplicidad.',
        'Gestión de ramas en entornos académicos compartidos y resolución de conflictos de fusión de Git para el equipo directivo de la práctica.',
        'Defensa técnica de proyectos de código ante tribunales docentes, explicando con claridad la lógica interna elegida.'
      ]
    }
  ] : [
    {
      title: 'Personal Projects Initiative & DAW Studies',
      subtitle: 'Intensive Practical Focus',
      period: '2025 - Present',
      description: 'To complement my academic degree and excel in modern developer environments, I dedicate 15+ weekly hours above normal classes to sculpting clean and secure systems architectures.',
      highlights: [
        'Rigidly implementing software design patterns like MVC in PHP backends and JVM singletons in Java.',
        'Continuous Git source tracking, documenting cohesive branch lines and clean commit practices.',
        'Self-guided mastery of React hook loops and descriptive CSS layouts inside modular frontend wrappers.'
      ]
    },
    {
      title: 'Academic Group Collaborations in DAW',
      subtitle: 'Software Engineer & Git Coordinator',
      period: '2025',
      description: 'Actively contributed to implementing logical schemas and managing multi-branch repositories for course evaluations.',
      highlights: [
        'Normalizing dense relational layouts to Third Normal Form (3NF) structures to remove all redundant storage blocks.',
        'Supervising team branches in collaborative environments, performing secure Git merges and resolving logical conflicts.',
        'Presenting live code demonstrations before academic boards, clearly defending system choices and relational flows.'
      ]
    }
  ];
};

const modulesTranslations = (lang: Language) => {
  const isEs = lang === 'es';
  return [
    { 
      name: isEs ? 'Programación (Java orientado a objetos y lógica)' : 'Programming (Logic and Object-Oriented Java)', 
      code: 'PROG', 
      highlight: isEs 
        ? 'Dominio de POO, herencias, interfaces, colecciones de datos, streams e hilos.' 
        : 'Mastering OOP, class trees, interface bounds, collection structures, stream pipelines, and exceptions handles.', 
      completed: true 
    },
    { 
      name: isEs ? 'Bases de Datos (SQL, MySQL y consultas optimizadas)' : 'Databases (SQL, MySQL, and Query Optimization)', 
      code: 'BD', 
      highlight: isEs 
        ? 'Modelado conceptual-lógico, vistas, disparadores (triggers), transacciones complejas y normalización.' 
        : 'Entity-relationship scoping, transactional states, triggers, composite index optimizations, and 3NF mappings.', 
      completed: true 
    },
    { 
      name: isEs ? 'Desarrollo Web en Entorno Servidor (PHP, MVC)' : 'Server-Side Web Development (PHP, MVC Model)', 
      code: 'DWES', 
      highlight: isEs 
        ? 'Creación de APIs RESTful en PHP, sesiones en servidor, autenticación segura y persistencia mediante PDO.' 
        : 'Setting secure modular APIs in PHP, server sessions control, password hashing, and database abstraction.', 
      completed: true 
    },
    { 
      name: isEs ? 'Desarrollo Web en Entorno Cliente (JavaScript ES6+)' : 'Client-Side Web Development (JS ES6+ Frameworks)', 
      code: 'DWEC', 
      highlight: isEs 
        ? 'Programación reactiva asíncrona, asincronía en fetches, promesas, manipulación avanzada de DOM.' 
        : 'Asynchronous event loops, REST API feeds with Fetch, state callbacks, and robust DOM tree handles.', 
      completed: true 
    },
    { 
      name: isEs ? 'Diseño de Interfaces Web (Accesibilidad y Responsive)' : 'Web Interface Design (Accessibility & Responsiveness)', 
      code: 'DIW', 
      highlight: isEs 
        ? 'Sistemas de rejillas fluidas CSS Grid, Tailwind CSS, animaciones interactivas y criterios de usabilidad WCAG.' 
        : 'Fluid layout grids, Tailwind, Framer Motion cues, and user accessibility checks conforming to WCAG standards.', 
      completed: true 
    },
    { 
      name: isEs ? 'Lenguajes de Marcas y Sistemas (HTML, XML, JSON)' : 'Markup Languages & Systems (HTML, XML, JSON)', 
      code: 'LMSGI', 
      highlight: isEs 
        ? 'Diseño de documentos semánticos limpios, validaciones mediante esquemas, parsing e integración de ficheros.' 
        : 'Structuring clean semantic code blocks, parsing datasets, mapping configurations, and markup schemas validation.', 
      completed: true 
    },
    { 
      name: isEs ? 'Entornos de Desarrollo (Git, Testing, Despliegue)' : 'Development Environments (Git, Testing, Setup)', 
      code: 'ED', 
      highlight: isEs 
        ? 'Control de versiones integral, pruebas unitarias integradas, documentación de código (Javadoc) y refactorización.' 
        : 'End-to-end Git architectures, Javadoc specs, automated local tests, and system refactoring structures.', 
      completed: true 
    }
  ];
};

const softSkillsTranslations = (lang: Language) => {
  const isEs = lang === 'es';
  return [
    { 
      name: isEs ? 'Capacidad de aprendizaje rápido' : 'Fast Learning Capacity', 
      rate: isEs ? 'Excepcional' : 'Outstanding', 
      description: isEs 
        ? 'Habilidad comprobada para entender nuevas sintaxis, frameworks u APIs de manera ágil y aplicarlas de inmediato.' 
        : 'Strong records grabbing new syntaxes, frameworks, or APIs quickly, building deployable outcomes in short spaces.' 
    },
    { 
      name: isEs ? 'Iniciativa y Autogestión' : 'Initiative & Self-Management', 
      rate: isEs ? 'Elevada' : 'High', 
      description: isEs 
        ? 'Capacidad de avanzar tareas, sugerir funcionalidades y acometer proyectos lógicos desde la conceptualización.' 
        : 'Ability to outline development plans, add useful utilities, and construct logical tasks independently.' 
    },
    { 
      name: isEs ? 'Metodología y Orden' : 'Methodical Mindset & Order', 
      rate: isEs ? 'Riguroso' : 'Rigorous', 
      description: isEs 
        ? 'Escritura ordenada para que otros programadores comprendan la intención del código, manteniendo carpetas estructuradas.' 
        : 'Meticulous style patterns so fellow teammates can read and expand components comfortably, in tidy directories.' 
    },
    { 
      name: isEs ? 'Resolución analítica de problemas' : 'Analytical Problem Solving', 
      rate: isEs ? 'Fuerte' : 'Analytical', 
      description: isEs 
        ? 'Desglose lógico de bugs técnicos; búsqueda activa de soluciones óptimas en logs técnicos e hilos formales.' 
        : 'Isolating complex bugs logically, tracking traces in runtime logs, and reviewing developer documentations for solid fixes.' 
    }
  ];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'es' || saved === 'en') return saved;
    // Fallback to browser language or default to Spanish
    if (typeof window !== 'undefined') {
      const browserLang = window.navigator.language;
      if (browserLang.startsWith('en')) return 'en';
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translations = staticTranslations[language];
    return translations[key] || staticTranslations['es'][key] || key;
  };

  const tObj = (key: string): any => {
    const translations = staticTranslations[language];
    return translations[key] || staticTranslations['es'][key] || [];
  };

  // Build reactive translated items conforming to types
  const [personalInfo, setPersonalInfo] = useState<any>(personalTranslations[language]);
  const [skills, setSkills] = useState<any[]>(skillsTranslations(language));
  const [projects, setProjects] = useState<any[]>(projectsTranslations(language));
  const [experienceIniciativa, setExperienceIniciativa] = useState<any[]>(experienceTranslations(language));
  const [dawModules, setDawModules] = useState<any[]>(modulesTranslations(language));
  const [softSkills, setSoftSkills] = useState<any[]>(softSkillsTranslations(language));

  useEffect(() => {
    setPersonalInfo(personalTranslations[language]);
    setSkills(skillsTranslations(language));
    setProjects(projectsTranslations(language));
    setExperienceIniciativa(experienceTranslations(language));
    setDawModules(modulesTranslations(language));
    setSoftSkills(softSkillsTranslations(language));
    
    // Set html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      tObj,
      personalInfo,
      skills,
      projects,
      experienceIniciativa,
      dawModules,
      softSkills
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
