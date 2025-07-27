import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email address)",
        "Usage data and interaction patterns with our AI tools",
        "Device information and browser type",
        "Cookies and similar tracking technologies"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our AI services",
        "Personalize your experience",
        "Send important updates and notifications",
        "Analyze usage patterns to enhance our platform"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers with regular security audits",
        "Limited access to personal data by authorized personnel",
        "Regular backups and disaster recovery procedures"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Request data correction or deletion",
        "Opt-out of marketing communications",
        "Data portability upon request"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Shield size={18} />
            <span>Privacy & Security</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          
          <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            <br className="hidden md:block" />
            <span className="text-primary-600 font-semibold">Last updated: January 2025</span>
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl animate-fade-in-up">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Introduction
          </h2>
          <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
            At Hitro AI, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our 
            AI-powered platform and services. By using our services, you agree to the collection and use of information 
            in accordance with this policy.
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="group p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <section.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {section.title}
                </h3>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="space-y-8 mb-12">
          {/* Cookies */}
          <div className="p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🍪</span>
              </div>
              <span>Cookies and Tracking</span>
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                <span className="text-secondary-700 dark:text-secondary-300">Remember your preferences and settings</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                <span className="text-secondary-700 dark:text-secondary-300">Analyze website traffic and usage patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></span>
                <span className="text-secondary-700 dark:text-secondary-300">Provide personalized content and recommendations</span>
              </li>
            </ul>
          </div>

          {/* Third Parties */}
          <div className="p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <UserCheck size={16} className="text-white" />
              </div>
              <span>Third-Party Services</span>
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              We may use third-party services to provide certain features of our platform, including payment processing, 
              analytics, and customer support. These services have their own privacy policies, and we encourage you to 
              review them. We do not sell, trade, or rent your personal information to third parties.
            </p>
          </div>

          {/* Data Retention */}
          <div className="p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Database size={16} className="text-white" />
              </div>
              <span>Data Retention</span>
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              We retain your personal information only for as long as necessary to provide our services and fulfill the 
              purposes outlined in this privacy policy. When you delete your account, we will delete your personal 
              information within 30 days, except where we are required to retain it for legal or regulatory purposes.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center p-8 bg-gradient-to-r from-primary-50 via-purple-50 to-pink-50 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-xl animate-fade-in-up" style={{ animationDelay: '900ms' }}>
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Questions About Privacy?
          </h2>
          
          <p className="text-secondary-700 dark:text-secondary-300 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:rohitku6207@gmail.com"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 hover:from-primary-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <Mail size={20} />
                <span>Contact Developer</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;