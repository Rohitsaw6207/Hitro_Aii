import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import { PenTool, GraduationCap, Code, Languages, FileText, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const tools = [
    {
      title: 'Blog Generator',
      description: 'Create engaging blog posts and articles with AI assistance. Generate SEO-optimized content in minutes.',
      icon: PenTool,
      href: '/tools/blog',
      gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
    },
    {
      title: 'Student Assistant',
      description: 'Get help with homework, research, and academic writing. Your personal study companion.',
      icon: GraduationCap,
      href: '/tools/student',
      gradient: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      title: 'Translator',
      description: 'Translate text between multiple languages instantly with context-aware AI translation.',
      icon: Languages,
      href: '/tools/translator',
      gradient: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Resume Assistant',
      description: 'Create professional resumes and cover letters that stand out to employers.',
      icon: FileText,
      href: '/tools/resume',
      gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
    },
        {
      title: 'Code Assistant',
      description: 'Debug, optimize, and write better code with AI guidance. Support for all programming languages.',
      icon: Code,
      href: '/tools/code',
      gradient: 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Sparkles size={18} className="animate-spin-slow" />
          <span>AI-Powered Productivity Suite</span>
          <Sparkles size={18} className="animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '300% 300%' }}>
            Welcome Back!
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Choose your AI assistant and unlock unlimited possibilities. 
          <br className="hidden md:block" />
          <span className="text-primary-600 dark:text-primary-400 font-semibold">Transform your workflow today.</span>
        </p>
      </div>

      {/* Tools Grid - Centered */}
{/* Tools Grid - 2 Columns with Centered Last Item if Odd */}
<div className="flex flex-col items-center gap-8 mb-16">
  {Array.from({ length: Math.ceil(tools.length / 2) }).map((_, rowIndex) => {
    const start = rowIndex * 2;
    const rowItems = tools.slice(start, start + 2);

    return (
      <div
        key={rowIndex}
        className={`flex gap-8 w-full max-w-4xl ${
          rowItems.length === 1 ? 'justify-center' : 'justify-between'
        }`}
      >
        {rowItems.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            href={tool.href}
            gradient={tool.gradient}
            index={index}
          />
        ))}
      </div>
    );
  })}
</div>


      {/* Quick Actions */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 dark:from-secondary-100 dark:to-secondary-300 bg-clip-text text-transparent mb-8">
          Ready to get started?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/tools/blog')}
            className="group px-8 py-4 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 hover:from-primary-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl"
          >
            <span className="flex items-center justify-center space-x-2">
              <PenTool size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Start Writing</span>
            </span>
          </button>
          <button 
            onClick={() => navigate('/subscription')}
            className="group px-8 py-4 bg-white/80 dark:bg-secondary-800/80 hover:bg-white dark:hover:bg-secondary-700/80 border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600 text-secondary-800 dark:text-secondary-200 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-xl"
          >
            <span className="flex items-center justify-center space-x-2">
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Upgrade Plan</span>
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;