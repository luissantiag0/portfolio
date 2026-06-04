import React, { useState, useEffect, useRef } from 'react';

interface BlurUpImageProps {
  src?: string;
  placeholderSrc?: string;
  alt: string;
  className?: string; // Classes for the parent container
}

export default function BlurUpImage({
  src,
  placeholderSrc,
  alt,
  className = '',
}: BlurUpImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Load images slightly before they become visible, for a seamless UX
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fallback to solid background if no images are specified
  if (!src) {
    return <div className={`bg-zinc-800 ${className}`} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
    >
      
      {/* 1. Low-Resolution Placeholder (Blurred phase) */}
      {placeholderSrc && !isHighResLoaded && isInView && (
        <img
          src={placeholderSrc}
          alt={`Visualización previa de ${alt}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-lg transition-opacity duration-500 pointer-events-none"
        />
      )}

      {/* 2. Loading indicator overlay spinner inside the low-res image */}
      {isInView && !isHighResLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-350 z-10">
          <div className="w-5 h-5 border-2 border-sky-400/35 border-t-sky-400 rounded-full animate-spin" />
        </div>
      )}

      {/* 3. High-Quality Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsHighResLoaded(true)}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHighResLoaded 
              ? 'opacity-100 blur-0 scale-100 translate-y-0' 
              : 'opacity-0 blur-md scale-102 translate-y-1'
          }`}
        />
      )}

    </div>
  );
}
