import { Check, Star, Zap, Crown, Sparkles, TrendingUp, Shield, Headphones, Clock, Database, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Footer from "../components/Footer";

const Subscription = () => {
  const [isAnnual, setIsAnnual] = useState(false);

const features = [
  {
    icon: Zap,
    title: 'Unlimited Tool Support',
    description: 'All AI tools are fully unlocked for premium users.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Code Assistant Limit',
    description: 'Premium users can use 10 messages/day for Code Assistant.',
    gradient: 'from-blue-400 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Priority Support',
    description: 'Premium members get 24/7 support and faster issue resolution.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Chat History',
    description: 'Save and revisit all your conversations and code anytime.',
    gradient: 'from-pink-400 to-red-500',
  },
];

  const handleUpgrade = (plan) => {
    if (plan.current) return;
    // Simulate Razorpay integration
    alert(`Redirecting to Razorpay for ${plan.name} plan (${plan.price} ${plan.period})...`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Crown size={18} className="animate-bounce" />
            <span>Upgrade Your Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h1>
          
          <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto">
            Unlock the full potential of AI with our premium features. 
            <br className="hidden md:block" />
            <span className="text-primary-600 font-semibold">Start your journey to unlimited productivity.</span>
          </p>
        </div>

                {/* 🧾 Two Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
  {/* Free Plan */}
  <div className="p-6 border rounded-2xl shadow-md bg-white dark:bg-secondary-800 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
    <div className="flex items-center gap-3 mb-4">
      <Star className="text-yellow-500" />
      <h2 className="text-xl font-semibold">Free Plan</h2>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      Perfect for exploring our tools with no cost.
    </p>
    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
      <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={16}/> 5 messages per tool per day</li>
      <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={16}/> Limited tool access</li>
      <li className="flex items-center gap-2"><CheckCircle className="text-green-500" size={16}/> Email support</li>
    </ul>
  </div>

  {/* Premium Plan */}
  <div className="p-6 border border-purple-500 rounded-2xl shadow-lg bg-gradient-to-tr from-purple-600 to-pink-500 text-white transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
    <div className="flex items-center gap-3 mb-4">
      <Crown className="text-yellow-300" />
      <h2 className="text-xl font-semibold">Premium Plan</h2>
    </div>
    <p className="mb-4">
      Unlock unlimited potential with full AI access.
    </p>
    <ul className="space-y-2 text-sm">
      <li className="flex items-center gap-2"><CheckCircle size={16}/> Unlimited messages across all tools</li>
      <li className="flex items-center gap-2"><CheckCircle size={16}/> Code Assistant: 10 messages/day</li>
      <li className="flex items-center gap-2"><CheckCircle size={16}/> Priority support</li>
      <li className="flex items-center gap-2"><CheckCircle size={16}/> Fastest response time</li>
    </ul>
  </div>
</div>


        {/* Features Grid */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Premium Plan?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                
                <h3 className="font-bold text-secondary-900 dark:text-secondary-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Subscription;