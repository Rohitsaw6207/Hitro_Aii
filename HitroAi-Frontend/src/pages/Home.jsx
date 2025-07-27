import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from "../components/Footer";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant AI-powered responses for all your needs',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support for multiple languages and regions',
      gradient: 'from-blue-400 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8 animate-fade-in">
            <Logo size="xl" className="hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 animate-fade-in-up">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent animate-gradient">
              Hitro AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-4xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '200ms' }}>
            Your intelligent companion for{' '}
            <span className="text-primary-600 font-semibold">blog writing</span>,{' '}
            <span className="text-purple-600 font-semibold">coding</span>,{' '}
            <span className="text-blue-600 font-semibold">translation</span>, and more.{' '}
            <br className="hidden md:block" />
            Powered by advanced AI technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link
              to="/signup"
              className="group btn-primary px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl"
            >
              Get Started
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              <Sparkles size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/login"
              className="btn-secondary px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <feature.icon size={32} className="text-white drop-shadow-lg" />
                </div>
                <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mx-auto opacity-0 group-hover:opacity-30 blur-xl scale-150 transition-all duration-500`} />
              </div>
              
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              <span>Limited Time Offer</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 text-lg">
            Join thousands of users who are already using Hitro AI to streamline their work.
          </p>
          <Link
            to="/signup"
            className="group btn-primary px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-2xl"
          >
            Start Free Trial
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;