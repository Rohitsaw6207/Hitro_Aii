import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login API Raw Response:", data);

      if (!response.ok || !data.user) {
        throw new Error(data?.message || 'Login failed');
      }

      const { name, email: userEmail, gender } = data.user;

      // Save to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', userEmail || '');
      localStorage.setItem('userName', name || '');
      localStorage.setItem('userGender', gender || '');

      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'Login failed. Please try again.');
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Multi-layered Animated Background */}
      <div className="absolute inset-0 -z-10">
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
          
          {/* Additional Layers for More Complexity */}
          <div className="absolute top-2/3 right-2/3 w-40 h-40 bg-gradient-to-r from-lime-400/20 to-green-400/20 dark:from-lime-600/6 dark:to-green-600/6 rounded-full blur-2xl animate-float-medium" />
          <div className="absolute bottom-2/3 left-2/3 w-36 h-36 bg-gradient-to-r from-red-400/20 to-pink-400/20 dark:from-red-600/6 dark:to-pink-600/6 rounded-full blur-2xl animate-float-reverse" />
          <div className="absolute top-1/6 left-2/3 w-20 h-20 bg-gradient-to-r from-indigo-400/25 to-blue-400/25 dark:from-indigo-600/8 dark:to-blue-600/8 rounded-full blur-lg animate-float-fast" />
          <div className="absolute bottom-1/6 right-2/3 w-24 h-24 bg-gradient-to-r from-purple-400/25 to-violet-400/25 dark:from-purple-600/8 dark:to-violet-600/8 rounded-full blur-lg animate-float-slow" />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]">
          <div className="absolute inset-0 bg-grid-pattern animate-grid-move" />
        </div>

        {/* Dynamic Floating Particles */}
        <div className="absolute inset-0">
          {mounted && [...Array(40)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-particle-float ${
                i % 8 === 0 ? 'bg-blue-400/40 dark:bg-blue-300/15' :
                i % 8 === 1 ? 'bg-purple-400/40 dark:bg-purple-300/15' :
                i % 8 === 2 ? 'bg-pink-400/40 dark:bg-pink-300/15' :
                i % 8 === 3 ? 'bg-cyan-400/40 dark:bg-cyan-300/15' :
                i % 8 === 4 ? 'bg-emerald-400/40 dark:bg-emerald-300/15' :
                i % 8 === 5 ? 'bg-orange-400/40 dark:bg-orange-300/15' :
                i % 8 === 6 ? 'bg-yellow-400/40 dark:bg-yellow-300/15' :
                'bg-red-400/40 dark:bg-red-300/15'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 animate-pulse-slow" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-400/10 via-transparent to-cyan-400/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-400/10 via-transparent to-orange-400/10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tl from-violet-400/8 via-transparent to-rose-400/8 animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>

        {/* Subtle Light Rays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent dark:via-white/2 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/3 to-transparent dark:via-white/1 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Moving Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rotate-45 animate-spin-slow" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-500/30 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-pink-500/30 rotate-45 animate-spin-slow" />
          <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-cyan-500/30 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-emerald-500/30 rotate-45 animate-spin-slow" />
          <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-orange-500/30 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/5 left-1/3 w-12 h-12 border border-blue-400/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/5 right-1/3 w-8 h-8 border border-purple-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/5 w-10 h-10 border border-pink-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-2xl p-6 animate-fade-in">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
              Welcome Back
            </h1>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Sign in to your Hitro AI account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-2.5 text-secondary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-secondary-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-2.5 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-sm border border-secondary-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-2.5 text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-secondary-600 dark:text-secondary-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;