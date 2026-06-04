import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s loads instantly but offers premium feedback

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-[#050505] text-white select-none"
    >
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Decorative subtle grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-6 max-w-xs w-full px-6">
        
        {/* Animated Brand Emblem */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-2xl shadow-[0_0_35px_rgba(14,165,233,0.3)]"
        >
          <span className="font-mono font-black text-black text-lg select-none">LS</span>
          
          {/* Subtle pulsing background ring */}
          <div className="absolute -inset-1 border border-sky-500/25 rounded-2xl animate-pulse opacity-75" />
        </motion.div>

        {/* Brand Text */}
        <div className="text-center space-y-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="text-base font-sans font-bold tracking-tight text-white"
          >
            Luis Santiago
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[10px] text-sky-400 font-mono font-bold tracking-widest uppercase"
          >
            Desarrollador Web Junior
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2">
          <div className="relative w-full h-[3px] bg-[#121212] overflow-hidden rounded-full border border-white/5">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 font-semibold uppercase">
            <span>Compilando Entorno</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
