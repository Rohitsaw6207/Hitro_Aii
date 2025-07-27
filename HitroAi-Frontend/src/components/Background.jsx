import { useEffect, useState } from 'react';

const Background = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Multi-layered Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base Gradient with Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-slate-950 dark:via-gray-900 dark:to-black transition-all duration-1000 animate-gradient" 
             style={{ backgroundSize: '400% 400%' }} />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Large Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 dark:from-cyan-600/8 dark:to-blue-600/8 rounded-full blur-2xl animate-float-medium" />
          <div className="absolute bottom-1/3 left-1/2 w-48 h-48 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 dark:from-indigo-600/8 dark:to-purple-600/8 rounded-full blur-2xl animate-float-slow" />
          
          {/* Medium Colorful Orbs */}
          <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-gradient-to-r from-pink-400/30 to-rose-400/30 dark:from-pink-600/10 dark:to-rose-600/10 rounded-full blur-xl animate-float-fast" />
          <div className="absolute bottom-1/2 right-1/6 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-xl animate-float-reverse" />
          <div className="absolute top-3/4 left-1/3 w-28 h-28 bg-gradient-to-r from-orange-400/25 to-yellow-400/25 dark:from-orange-600/8 dark:to-yellow-600/8 rounded-full blur-xl animate-float-medium" />
          
          {/* Small Accent Orbs */}
          <div className="absolute top-1/5 right-1/5 w-16 h-16 bg-gradient-to-r from-violet-400/35 to-purple-400/35 dark:from-violet-600/12 dark:to-purple-600/12 rounded-full blur-lg animate-float-fast" />
          <div className="absolute bottom-1/5 left-1/5 w-20 h-20 bg-gradient-to-r from-cyan-400/30 to-sky-400/30 dark:from-cyan-600/10 dark:to-sky-600/10 rounded-full blur-lg animate-float-reverse" />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]">
          <div className="absolute inset-0 bg-grid-pattern animate-grid-move" />
        </div>

        {/* Dynamic Floating Particles */}
        <div className="absolute inset-0">
          {mounted && [...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-particle-float ${
                i % 6 === 0 ? 'bg-blue-400/40 dark:bg-blue-300/15' :
                i % 6 === 1 ? 'bg-purple-400/40 dark:bg-purple-300/15' :
                i % 6 === 2 ? 'bg-pink-400/40 dark:bg-pink-300/15' :
                i % 6 === 3 ? 'bg-cyan-400/40 dark:bg-cyan-300/15' :
                i % 6 === 4 ? 'bg-emerald-400/40 dark:bg-emerald-300/15' :
                'bg-orange-400/40 dark:bg-orange-300/15'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${20 + Math.random() * 15}s`
              }}
            />
          ))}
        </div>

        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 animate-pulse-slow" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-400/10 via-transparent to-cyan-400/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-400/10 via-transparent to-orange-400/10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Subtle Light Rays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent dark:via-white/2 animate-pulse-slow" />
        
        {/* Moving Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rotate-45 animate-spin-slow" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-500/30 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-pink-500/30 rotate-45 animate-spin-slow" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;