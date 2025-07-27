const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizes[size]} border-4 border-primary-200 dark:border-primary-800 rounded-full animate-spin-slow`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full animate-spin" />
        </div>
        
        {/* Inner Pulse */}
        <div className={`absolute inset-2 bg-primary-500/20 rounded-full animate-pulse`} />
        
        {/* Center Dot */}
        <div className="absolute inset-1/2 w-1 h-1 bg-primary-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-sm text-secondary-600 dark:text-secondary-400 animate-pulse">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;