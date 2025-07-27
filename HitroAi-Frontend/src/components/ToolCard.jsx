import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const ToolCard = ({ title, description, icon: Icon, href, gradient, index = 0 }) => {
  return (
    <Link
      to={href}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative p-6 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
        
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
            <Icon size={28} className="text-white drop-shadow-lg" />
          </div>
          
          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 w-14 h-14 rounded-2xl ${gradient} opacity-0 group-hover:opacity-30 blur-xl scale-150 transition-all duration-500`} />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-secondary-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Link>
  );
};

export default ToolCard;