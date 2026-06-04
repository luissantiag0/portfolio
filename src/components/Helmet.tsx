import React, { useEffect } from 'react';

interface HelmetProps {
  activeSection: string;
}

interface MetaMetadata {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

const SECTION_SEO: Record<string, MetaMetadata> = {
  inicio: {
    title: "Luis Santiago | Desarrollador Web Junior & Estudiante DAW",
    description: "Portfolio profesional de Luis Santiago, Desarrollador Web Junior y estudiante destacado del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW) en Badalona. Código limpio, modular y de alto rendimiento.",
    keywords: "Luis Santiago, desarrollador web, junior, Badalona, Barcelona, DAW, Java, PHP, JavaScript, TypeScript, SQL, prácticas, FCT, programador, portfolio profesional",
    ogTitle: "Luis Santiago | Desarrollador Web & Portafolio Tecnológico",
    ogDescription: "Explora la trayectoria, proyectos académicos e iniciativa técnica de Luis Santiago, programador en Badalona listo para integraciones profesionales inmediatas."
  },
  'sobre-me': {
    title: "Sobre mí | Luis Santiago - Disciplina e Iniciativa",
    description: "Conoce el perfil, la metodología estructurada y el compromiso técnico de Luis Santiago. Especializado en autoaprendizaje acelerado, orden en código y resolución analítica de problemas.",
    keywords: "Luis Santiago, sobre mi, perfil programador, metodología ágil, autodidacta, Badalona, desarrollador, desarrollo de aplicaciones web",
    ogTitle: "Sobre mí | Luis Santiago - Perfil de Ingeniería",
    ogDescription: "trayectoria técnica y capacidades metodológicas de un estudiante DAW altamente enfocado en el código de excelente calidad y asimilación continua."
  },
  tecnologias: {
    title: "Tecnologías y Stack Técnico | Luis Santiago",
    description: "Detalle del arsenal técnico de Luis Santiago: Programación POO en Java SE, lógica orientada a servidor con PHP MVC, asincronía en React, TypeScript y gestión avanzada de bases de datos relacionales SQL.",
    keywords: "Java, PHP, MySQL, JavaScript, React, TypeScript, Tailwind, Git, MVC, POO, bases de datos relacionales, stack tecnologico",
    ogTitle: "Stack de Tecnologías y Dominio Técnico | Luis Santiago",
    ogDescription: "Explora los lenguajes, frameworks y bases de datos relacionales con los que Luis Santiago construye sistemas web e interfaces interactivas."
  },
  proyectos: {
    title: "Proyectos y Soluciones DAW | Luis Santiago",
    description: "Portafolio de proyectos modulares desarrollados con metodologías robustas: aplicaciones ERP, sistemas de facturación con transacciones MySQL ACID, motores interactivos de juego y utilidades de backend.",
    keywords: "proyectos programacion, portafolio, ERP, transacciones ACID PHP, Java SE CLI, Canvas, interfaces responsivas, Github",
    ogTitle: "Ecosistema de Proyectos Técnicos | Luis Santiago",
    ogDescription: "Casos de estudio real detallando desafíos técnicos complejos, soluciones de código limpio y repositorios interactivos construidos por Luis Santiago."
  },
  contacto: {
    title: "Contacto | Oportunidades FCT y Junior | Luis Santiago",
    description: "¿Interesado en incorporar un perfil técnico proactivo con alta iniciativa para prácticas de grado superior o roles junior? Ponte en contacto directo con Luis Santiago hoy mismo.",
    keywords: "contacto desarrollador junior, contratar programador Badalona, practicas FCT informatica Barcelona, Luis Santiago email, empleo programacion",
    ogTitle: "Contacto Profesional | Luis Santiago",
    ogDescription: "Formulario integrado para propuestas técnicas, oportunidades de prácticas o posiciones de incorporación inmediata de Luis Santiago."
  }
};

export default function Helmet({ activeSection }: HelmetProps) {
  const seo = SECTION_SEO[activeSection] || SECTION_SEO.inicio;

  // React 19 dynamically hoists <title> and <meta> elements directly from components into the document's <head>.
  // We supplement this with an additional imperative fallback to cover any standard browser render loops perfectly.
  useEffect(() => {
    // 1. Synchronize Document Title
    document.title = seo.title;

    // 2. Synchronize Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // 3. Synchronize Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.keywords);

    // 4. Synchronize OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', seo.ogTitle);

    // 5. Synchronize OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', seo.ogDescription);

  }, [seo]);

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://luissantiag0.github.io/portfolio" />
      <meta property="og:locale" content="es_ES" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
      <meta name="theme-color" content="#0f172a" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Luis Santiago Morales" />

      {/* JSON-LD Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Luis Santiago Morales",
          "jobTitle": "Desarrollador Web Junior",
          "url": "https://luissantiag0.github.io/portfolio",
          "email": "luissantiagomorales07@gmail.com",
          "address": { "@type": "PostalAddress", "addressLocality": "Badalona, España" }
        })}
      </script>

      {/* High-speed asset preconnect boundaries */}
      <link rel="preconnect" href="https://github.com" />
      <link rel="preconnect" href="https://www.linkedin.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch fallbacks for secondary lookups */}
      <link rel="dns-prefetch" href="https://github.com" />
      <link rel="dns-prefetch" href="https://www.linkedin.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </>
  );
}
