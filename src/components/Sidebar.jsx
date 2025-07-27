import { X, Home, Grid3x3, User, CreditCard, PenTool, GraduationCap, Code, Languages, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = ({ isOpen, onClose, isAuthenticated }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home, public: true },
    { name: 'Dashboard', href: '/dashboard', icon: Grid3x3, public: false },
    { name: 'Profile', href: '/profile', icon: User, public: false },
    { name: 'Subscription', href: '/subscription', icon: CreditCard, public: false },
  ];

  const tools = [
    { name: 'Code Assistant', href: '/tools/code', icon: Code },
    { name: 'Blog Generator', href: '/tools/blog', icon: PenTool },
    { name: 'Student Assistant', href: '/tools/student', icon: GraduationCap },
    { name: 'Translator', href: '/tools/translator', icon: Languages },
    { name: 'Resume Assistant', href: '/tools/resume', icon: FileText },
  ];

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 ease-out lg:relative lg:translate-x-0 flex flex-col ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
          <div className="flex items-center space-x-3 group">
            <Logo size="md" />
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Hitro AI
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Powered by AI
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* Main Navigation */}
          <nav className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Navigation
            </div>
            {navigation.map((item) => {
              if (!item.public && !isAuthenticated) return null;
              
              const Icon = item.icon;
              const isActive = isCurrentPath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <Icon size={18} className={`transition-all duration-300 ${isActive ? 'text-white' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* AI Tools */}
          {isAuthenticated && (
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                AI Tools
              </div>
              {tools.map((item, index) => {
                const Icon = item.icon;
                const isActive = isCurrentPath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon size={18} className={`transition-all duration-300 ${isActive ? 'text-white' : 'group-hover:scale-110'}`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

      </div>
    </>
  );
};

export default Sidebar;