import React, { useEffect, useState } from 'react';

interface CleanLogoProps {
  src: string;
  alt: string;
  className?: string;
  tolerance?: number;
  fallback?: React.ReactNode;
}

export const CleanLogo: React.FC<CleanLogoProps> = ({
  src,
  alt,
  className = "h-14 sm:h-16 md:h-18 max-w-[190px] sm:max-w-[230px] w-auto object-contain",
  tolerance = 28,
  fallback,
}) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          if (isMounted) setProcessedSrc(src);
          return;
        }

        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample background colors from edges and corners
        const corners = [
          [0, 0],
          [width - 1, 0],
          [0, height - 1],
          [width - 1, height - 1],
          [Math.floor(width / 2), 0],
          [0, Math.floor(height / 2)],
          [width - 1, Math.floor(height / 2)],
          [Math.floor(width / 2), height - 1],
        ];

        let bgR = 0, bgG = 0, bgB = 0;
        corners.forEach(([x, y]) => {
          const idx = (y * width + x) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        });
        bgR = Math.round(bgR / corners.length);
        bgG = Math.round(bgG / corners.length);
        bgB = Math.round(bgB / corners.length);

        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const distBg = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
            const isNearWhite = r > 230 && g > 230 && b > 230;

            if (distBg < tolerance * 1.6 || isNearWhite) {
              if (distBg < tolerance || (r > 240 && g > 240 && b > 240)) {
                data[i + 3] = 0;
              } else {
                const alphaRatio = Math.max(0, Math.min(1, (distBg - tolerance) / (tolerance * 0.6)));
                data[i + 3] = Math.round(alphaRatio * 255);
              }
            }

            // Track non-transparent bounding box for auto-trimming
            if (data[i + 3] > 25) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // Auto-trim to crop excess surrounding whitespace/empty areas
        if (maxX > minX && maxY > minY) {
          const pad = 10; // small breathing room
          const cropX = Math.max(0, minX - pad);
          const cropY = Math.max(0, minY - pad);
          const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
          const cropH = Math.min(height - cropY, (maxY - minY) + pad * 2);

          const trimmedCanvas = document.createElement('canvas');
          trimmedCanvas.width = cropW;
          trimmedCanvas.height = cropH;
          const trimmedCtx = trimmedCanvas.getContext('2d');
          if (trimmedCtx) {
            trimmedCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            const dataUrl = trimmedCanvas.toDataURL('image/png');
            if (isMounted) setProcessedSrc(dataUrl);
            return;
          }
        }

        const dataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setProcessedSrc(dataUrl);
        }
      } catch (err) {
        console.warn('CleanLogo processing fallback to src:', err);
        if (isMounted) setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setError(true);
    };

    return () => {
      isMounted = false;
    };
  }, [src, tolerance]);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      style={{
        transition: 'opacity 0.25s ease-out',
        opacity: processedSrc ? 1 : 0.95,
      }}
    />
  );
};
