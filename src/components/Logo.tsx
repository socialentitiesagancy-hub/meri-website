import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const LogoIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle Arc with Gap at Top-Right (~1:00 to 2:00 position) */}
      <path
        d="M 81.9 43.5 A 33 33 0 1 1 61.3 21.0"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Round Dot Floating in the Top-Right Gap (~1:30 position) */}
      <circle cx="74.3" cy="29.7" r="4.8" fill="currentColor" />

      {/* Inner Centered 'n' Arch Symbol */}
      <path
        d="M 36 68 V 48 A 14 14 0 0 1 64 48 V 68"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  variant = 'dark',
  size = 'md',
}) => {
  const iconSizeClass =
    size === 'sm' ? 'w-7 h-7 sm:w-8 sm:h-8' : size === 'lg' ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-8 h-8 sm:w-10 sm:h-10';

  const textSizeClass =
    size === 'sm'
      ? 'text-[17px] sm:text-[20px]'
      : size === 'lg'
      ? 'text-[24px] sm:text-[32px]'
      : 'text-[19px] sm:text-[24px]';

  const textColorClass = variant === 'light' ? 'text-white' : 'text-[#0F1A34]';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      <LogoIcon className={`${iconSizeClass} ${textColorClass} shrink-0`} />
      {!iconOnly && (
        <span
          className={`font-extrabold ${textSizeClass} tracking-tight ${textColorClass} font-sans whitespace-nowrap`}
        >
          Social Entities
        </span>
      )}
    </div>
  );
};
