import { Skill, Project, ExperienceMile, AcademicModule } from './types';
import averionDashboardImage from './assets/images/averion-dashboard.png';
import mdvDashboardImage from './assets/images/mdv-dashboard.png';

export const personalInfo = {
  fullName: 'Luis Santiago Morales',
  title: 'Desarrollador Web Junior',
  academicStatus: 'Estudiante de Desarrollo de Aplicaciones Web (DAW)',
  aboutDescription: `Soy un apasionado de la programación y el diseño de soluciones de software eficientes. Actualmente curso el Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW), donde he canalizado mi curiosidad técnica hacia el desarrollo de aplicaciones web reales, robustas y bien estructuradas.\n\nAunque aún no cuento con experiencia laboral en el sector, Mi día a día se basa en desarrollar webs, crear ideas digitales y construir soluciones prácticas con tecnología. Me destaco por mi disciplina autodidacta, mi agilidad para asimilar nuevas tecnologías y un riguroso compromiso con las buenas prácticas (código limpio, modular y estructurado). Estoy listo para aportar iniciativa y valor constante en mis primeras prácticas profesionales o puesto como desarrollador junior.`,
  shortBio: 'Estudiante de DAW en busca de prácticas profesionales y nuevos retos en el desarrollo web. Comprometido con la excelencia del diseño, las bases de datos optimizadas y el desarrollo full-stack sólido.',
  location: 'Badalona, España',
  email: 'luissantiagomorales07@gmail.com', // Filled from metadata
  github: 'https://github.com/luissantiag0',
  linkedin: 'https://www.linkedin.com/in/luis-santiago-morales/'
};

export const skills: Skill[] = [
  {
    name: 'HTML',
    category: 'frontend',
    level: 95,
    description: 'Estructuras semánticas accesibles, optimizadas para navegadores y estándares SEO.',
    iconName: 'html'
  },
  {
    name: 'CSS',
    category: 'frontend',
    level: 90,
    description: 'Hojas de estilo fluidas, layouts modernos adaptativos y fluidez responsiva nativa.',
    iconName: 'css'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 90,
    description: 'Lógica interactiva asíncrona, consumos de API mediante fetch, promesas y manipulación del DOM.',
    iconName: 'javascript'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 90,
    description: 'Diseño rápido con utilidades, variables de tema fluidas y estructuras de responsive fluido.',
    iconName: 'tailwind'
  },
  {
    name: 'Astro',
    category: 'frontend',
    level: 80,
    description: 'Construcción de sitios estáticos increíblemente rápidos apoyados en arquitectura de islas modular.',
    iconName: 'astro'
  },
  {
    name: 'Java',
    category: 'backend',
    level: 65,
    description: 'Programación orientada a objetos robusta (POO), manejo estricto de colecciones y control estructurado de errores.',
    iconName: 'java'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 60,
    description: 'Automatizaciones, scripting rápido, análisis estructurado y lógica backend ligera.',
    iconName: 'python'
  },
  {
    name: 'PHP',
    category: 'backend',
    level: 82,
    description: 'Desarrollo en servidor de carácter POO, variables locales de sesión persistentes y formularios controlados.',
    iconName: 'php'
  },
  {
    name: 'SQL',
    category: 'database',
    level: 85,
    description: 'Modelo de datos entidad-relación, integridad con claves, transacciones ACID consistentes y consultas unidas.',
    iconName: 'sql'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 65,
    description: 'Administración de bases de datos relacionales avanzadas, vistas lógicas, disparadores y optimización estructural.',
    iconName: 'postgresql'
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 88,
    description: 'Control de versiones eficiente, pull requests minuciosas y fusión de ramas libre de conflictos.',
    iconName: 'git'
  },
  {
    name: 'Vercel',
    category: 'tools',
    level: 80,
    description: 'Despliegues continuos, orquestación rápida de webs integradas con GitHub en la nube.',
    iconName: 'vercel'
  }
];

export const projects: Project[] = [
  {
    id: 'averion-ai',
    title: 'Averion AI - Plataforma de Infraestructura de IA',
    description: 'Plataforma moderna para la creación, gestión y orquestación de infraestructura de sistemas de IA y agentes asíncronos.',
    detailedDescription: 'Averion AI nace como un portal avanzado para orquestar múltiples procesos de IA autónomos en paralelo. Integra un ecosistema robusto de colas distribuidas, control de acceso perimetral para agentes y visualizadores de logs concurrente.',
    challenges: 'El reto central consistió en diseñar un motor capaz de coordinar múltiples peticiones de IA concurrentes a gran escala sin demorar el renderizado SSR de Astro o comprometer la reactividad de la interfaz de usuario en tiempo real.',
    solution: 'Implementé un sistema híbrido empleando workers asíncronos desacoplados del hilo principal combinados con colas de procesamiento con prioridad. Reduje el coste computacional del SSR estructurando la interfaz con Astro Islands interactivas y aceleré la persistencia en MySQL mediante índices compuestos y consultas preparadas.',
    role: 'Desarrollador Full-stack (Creador & Diseñador de Software)',
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
    title: 'Web Iglesia MDV - Plataforma Comunitaria',
    description: 'Plataforma web modular para la gestión de contenido, eventos y recursos pastorales de la iglesia.',
    detailedDescription: 'Un portal modular diseñado e implementado para digitalizar y centralizar la comunicación de la iglesia. Incluye secciones dinámicas para la visualización de predicaciones semanales, calendarios litúrgicos interactivos de eventos, anuncios urgentes y descarga de recursos formativos.',
    challenges: 'El mayor desafío técnico consistió en diseñar un sistema de actualización de contenido lo suficientemente interactivo y simple que facilitara la actualización diaria de folletos y grabaciones de audio/video por parte de colaboradores no técnicos, sin requerir cambios de código, y todo optimizado para cargas eficientes sobre redes móviles lentas.',
    solution: 'Desarrollé una arquitectura ligera utilizando componentes TypeScript puros, desacoplados mediante plantillas modulares HTML con inyección dinámica de datos estructurados. Se redujo el peso global de la página implementando carga diferida (lazy loading) exhaustiva en imágenes o embeds, logrando un rendimiento óptimo y accesible en dispositivos de gama baja.',
    role: 'Desarrollador Web Principal (Conceptualización & Despliegue)',
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
    title: 'VYNTRA - Aplicación Fitness',
    description: 'Plataforma interactiva para el seguimiento de rutinas de entrenamiento, cálculo de calorías, macros y análisis personalizado.',
    detailedDescription: 'VYNTRA es un sistema completo diseñado para digitalizar la planificación de ejercicios de fuerza. Permite a los usuarios organizar rutinas semanales, registrar marcas personales enlazadas a gráficas de progreso y medir valores macronutrientes.',
    challenges: 'El mayor desafío fue desarrollar un Training Planner Adaptivo que ajustara dinámicamente las rutinas según el rendimiento del usuario, evitando la monotonía y optimizando la progresión sin intervención manual constante.',
    solution: 'Diseñé un motor de lógica progresiva en TypeScript que analiza el histórico de entrenamiento, calcula la fatiga acumulada y sugiere variaciones óptimas de series, repes y pesos. Los datos se persisten en MySQL con consultas preparadas y el frontend renderiza en tiempo real los ajustes semanales mediante componentes React con gráficos SVG interactivos.',
    role: 'Desarrollador Full-stack',
    category: 'web-app',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'SVG Charts', 'Adaptive Algorithms'],
    githubUrl: 'https://github.com/luissantiag0/VYNTRA',
    demoUrl: 'https://vyntra-893133637954.europe-west2.run.app/',
    imageAccent: 'from-blue-600 via-indigo-600 to-violet-600',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=40&q=10'
  },
  {
    id: 'sasa-tasker',
    title: 'TaskFlow DAW - Gestor Ágil de Proyectos',
    description: 'Aplicación web completa para organizar tareas escolares y flujos de trabajo colaborativos con control de roles.',
    detailedDescription: 'TaskFlow nace como una solución a la coordination de proyectos grupales de DAW. Implementa un tablero Kanban dinámico interactivo, sistema de perfiles, registro cifrado de usuarios y filtrado inteligente por categorías o prioridades.',
    challenges: 'El mayor reto fue garantizar la sincronización segura en tiempo real del arrastre de tarjetas sin sobrecargar la base de datos, así como prevenir vulnerabilidades XSS en la inserción de comentarios en el muro del proyecto.',
    solution: 'Implementé una arquitectura PHP orientada a objetos (POO) estructurada con controladores separados y un frontend moderno con llamadas AJAX asíncronas optimizadas mediante Fetch API. La base de datos MySQL incluye claves foráneas y restricciones integradas de integridad.',
    role: 'Desarrollador Full-stack (Proyecto Personal Personalizado)',
    category: 'web-app',
    technologies: ['PHP OOP', 'JavaScript', 'MySQL', 'Tailwind CSS', 'CSS Grid', 'JSON API'],
    githubUrl: 'https://github.com/luissantiago-dev/taskflow-daw',
    imageAccent: 'from-blue-600 via-indigo-600 to-violet-600',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=40&q=10'
  },
  {
    id: 'sabor-daw',
    title: 'SaborDAW - Portal Gastronómico y Reservas',
    description: 'Plataforma web de hostelería que conecta a comensales con un panel interactivo de administración y reserva de mesas.',
    detailedDescription: 'Desarrollado para resolver la problemática de las dobles reservas de mesas en restaurantes. Cuenta con inicio de sesión seguro, asignación interactiva del plano de la sala y gestión de menús dinámicos controlados desde un panel administrativo.',
    challenges: 'Controlar las colisiones horarias en las reservas y evitar reservas fantasma. La seguridad en las contraseñas y la prevención de SQL Injection eran prioritarios.',
    solution: 'Utilicé transacciones SQL explícitas en MySQL para asegurar que una mesa no pudiera asignarse dos veces en el mismo tramo horario (bloqueo concurrente). Cifré las contraseñas utilizando password_hash con algoritmo bcrypt y manejé sentencias preparadas PDO de forma estricta.',
    role: 'Desarrollador Backend',
    category: 'web-app',
    technologies: ['PHP', 'MySQL', 'Fetch API', 'HTML5 Semántico', 'Vite CSS', 'MVC Pattern'],
    githubUrl: 'https://github.com/luissantiago-dev/sabor-daw',
    imageAccent: 'from-emerald-500 via-teal-600 to-cyan-600',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=40&q=10'
  },
  {
    id: 'scalable-ai-backend',
    title: 'Scalable AI Agents & Automation Backend',
    description: 'Motor backend de alta disponibilidad para la automatización de tareas lógicas y la orquestación distribuida de agentes de IA asíncronos.',
    detailedDescription: 'Una arquitectura backend desacoplada orientada a coordinar colas de agentes de inteligencia artificial. Integra protección contra sobrecargas de API, validación estricta de payloads JSON y manejo paralelo asíncrono.',
    challenges: 'Estabilización de procesos recurrentes evitando bloqueos de hilos (thread locks) y controlando la latencia en las conexiones concurrentes a las bases de datos.',
    solution: 'Diseñé una persistencia ágil con PostgreSQL implementando índices analíticos robustos, configuré colas asíncronas escalables de procesos en NodeJS y programé controladores desacoplados reutilizables.',
    role: 'Desarrollador Backend / DevOps',
    category: 'web-app',
    technologies: ['Node.js', 'PostgreSQL', 'Express', 'TypeScript', 'Concurrency Pools', 'JSON Rest API'],
    githubUrl: 'https://github.com/luissantiag0/scalable-ai-backend',
    imageAccent: 'from-emerald-500 via-teal-600 to-cyan-600',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=40&q=10'
  }
];

export const experienceIniciativa: ExperienceMile[] = [
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
];

export const dawModules: AcademicModule[] = [
  { name: 'Programación (Java orientado a objetos y lógica)', code: 'PROG', highlight: 'Dominio de POO, herencias, interfaces, colecciones de datos, streams e hilos.', completed: true },
  { name: 'Bases de Datos (SQL, MySQL y consultas optimizadas)', code: 'BD', highlight: 'Modelado conceptual-lógico, vistas, disparadores (triggers), transacciones complejas y normalización.', completed: true },
  { name: 'Desarrollo Web en Entorno Servidor (PHP, MVC)', code: 'DWES', highlight: 'Creación de APIs RESTful en PHP, sesiones en servidor, autenticación segura y persistencia mediante PDO.', completed: true },
  { name: 'Desarrollo Web en Entorno Cliente (JavaScript ES6+)', code: 'DWEC', highlight: 'Programación reactiva asíncrona, asincronía en fetches, promesas, manipulación avanzada de DOM.', completed: true },
  { name: 'Diseño de Interfaces Web (Accesibilidad y Responsive)', code: 'DIW', highlight: 'Sistemas de rejillas fluidas CSS Grid, Tailwind CSS, animaciones interactivas y criterios de usabilidad WCAG.', completed: true },
  { name: 'Lenguajes de Marcas y Sistemas (HTML, XML, JSON)', code: 'LMSGI', highlight: 'Diseño de documentos semánticos limpios, validaciones mediante esquemas, parsing e integración de ficheros.', completed: true },
  { name: 'Entornos de Desarrollo (Git, Testing, Despliegue)', code: 'ED', highlight: 'Control de versiones integral, pruebas unitarias integradas, documentación de código (Javadoc) y refactorización.', completed: true }
];

export const softSkills = [
  { name: 'Capacidad de aprendizaje rápido', rate: 'Excepcional', description: 'Habilidad comprobada para entender nuevas sintaxis, frameworks u APIs de manera ágil y aplicarlas de inmediato.' },
  { name: 'Iniciativa y Autogestión', rate: 'Elevada', description: 'Capacidad de avanzar tareas, sugerir funcionalidades y acometer proyectos lógicos desde la conceptualización.' },
  { name: 'Metodología y Orden', rate: 'Riguroso', description: 'Escritura ordenada para que otros programadores comprendan la intención del código, manteniendo carpetas estructuradas.' },
  { name: 'Resolución analítica de problemas', rate: 'Fuerte', description: 'Desglose lógico de bugs técnicos; búsqueda activa de soluciones óptimas en logs técnicos e hilos formales.' }
];
