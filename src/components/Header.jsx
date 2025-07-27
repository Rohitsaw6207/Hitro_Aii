import { Menu, Moon, Sun, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = ({ onToggleSidebar, onToggleTheme, darkMode, isAuthenticated, sidebarOpen }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Hitro AI';
      case '/dashboard': return 'AI Tools';
      case '/login': return 'Login';
      case '/signup': return 'Sign Up';
      case '/profile': return 'Profile';
      case '/subscription': return 'Subscription';
      case '/tools/blog': return 'Blog Generator';
      case '/tools/student': return 'Student Assistant';
      case '/tools/code': return 'Code Assistant';
      case '/tools/translator': return 'Translator';
      case '/tools/resume': return 'Resume Assistant';
      default: return 'Hitro AI';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border-b border-secondary-200/50 dark:border-secondary-700/50 transition-all duration-300">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile/Desktop Menu Toggle */}
            <button
              onClick={onToggleSidebar}
              className="group p-2 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  size={20} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    sidebarOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X 
                  size={20} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    sidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                  }`}
                />
              </div>
            </button>

            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Logo size="sm" className="group-hover:scale-110 transition-transform duration-300" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                {getPageTitle()}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="group p-2 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <div className="relative w-5 h-5">
                <Sun 
                  size={20} 
                  className={`absolute inset-0 transition-all duration-500 ${
                    darkMode ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <Moon 
                  size={20} 
                  className={`absolute inset-0 transition-all duration-500 ${
                    darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                  }`}
                />
              </div>
            </button>
            
            {/* User Actions */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Profile Avatar */}
                <Link 
                  to="/profile"
                  className="group p-2 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  {localStorage.getItem('userGender') ? (
                    <img 
                      src={localStorage.getItem('userGender') === 'male' ? '/male-avatar.png' : '/female-avatar.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="group-hover:text-primary-600 transition-colors duration-300" />
                  )}
                </Link>
              </div>
            ) : (
              <Link 
                to="/login"
                className="btn-primary text-sm px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;