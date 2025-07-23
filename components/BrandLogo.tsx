import { Compass, MapPin } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export function BrandLogo({ size = 'md', variant = 'full', className = '' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40
  };

  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <Compass 
            size={iconSizes[size]} 
            className="text-brand-primary relative z-10"
            strokeWidth={2}
          />
          <div className="absolute inset-0 bg-gradient-brand rounded-full opacity-20 blur-sm"></div>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${sizeClasses[size]} font-bold text-gradient-brand ${className}`}>
        Wandr
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="relative bg-gradient-brand p-2 rounded-2xl shadow-brand">
          <Compass 
            size={iconSizes[size]} 
            className="text-white relative z-10"
            strokeWidth={2.5}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-brand rounded-2xl opacity-60 blur-md"></div>
      </div>
      <div className={`${sizeClasses[size]} font-bold text-gradient-brand tracking-tight`}>
        Wandr
      </div>
    </div>
  );
}