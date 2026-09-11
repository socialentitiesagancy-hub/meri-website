import React, { useEffect, useState } from 'react';
import { LogoIcon } from './Logo';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s crisp, elegant transition

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 250); // 250ms smooth fade-out
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      onClick={() => onComplete?.()} // Instant click-to-dismiss backup
      className={`fixed inset-0 z-[9999] bg-[#FAF9F5] text-[#2C3725] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Central Content Box */}
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-8">
        
        {/* Minimalist Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#536245]/10 flex items-center justify-center border border-[#536245]/20 shadow-xs">
            <LogoIcon className="w-9 h-9 sm:w-11 sm:h-11 text-[#536245] animate-pulse" />
          </div>
        </div>

        {/* Elegant Typography */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#2C3725] font-sans uppercase">
            Social Entities
          </h1>
          <p className="text-[11px] sm:text-[12px] font-semibold text-[#6B7960] tracking-[0.3em] uppercase">
            Digital Agency
          </p>
        </div>

        {/* Ultra-sleek Thin Progress Bar */}
        <div className="w-44 sm:w-56 space-y-3 pt-2">
          <div className="w-full bg-stone-200/80 h-[2px] rounded-full overflow-hidden">
            <div
              className="bg-[#536245] h-full transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Minimal Status Counter */}
          <div className="flex items-center justify-between text-[11px] font-mono font-medium text-stone-400 tracking-wider">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
