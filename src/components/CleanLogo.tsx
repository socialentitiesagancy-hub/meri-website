import React, { useState } from 'react';

interface CleanLogoProps {
  src: string;
  alt: string;
  className?: string;
  tolerance?: number;
  fallback?: React.ReactNode;
}

/**
 * Lightweight logo renderer. Background removal used to run per-pixel canvas
 * work on every logo (very slow on the clients marquee). We now serve the
 * asset directly with lazy loading.
 */
export const CleanLogo: React.FC<CleanLogoProps> = ({
  src,
  alt,
  className = 'h-14 sm:h-16 md:h-18 max-w-[190px] sm:max-w-[230px] w-auto object-contain',
  fallback,
}) => {
  const [error, setError] = useState(false);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  if (error) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      className={className}
    />
  );
};
