// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
    Mail,
    Linkedin,
    Github,
} from "lucide-react"; // optional swap for inline SVG icons

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border-t border-secondary-200/50 dark:border-secondary-700/50 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* layout wraps on small screens */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left */}
                    <div className="text-sm text-secondary-600 dark:text-secondary-400 text-center md:text-left">
                        Developed by <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                            Rohit Kumar
                        </span>

                    </div>


                    {/* Center */}
                    <div className="flex flex-wrap items-center justify-center text-sm text-secondary-600 dark:text-secondary-400 gap-x-2 gap-y-1">
                        <span>© {year} Hitro AI. All rights reserved</span>
                        <span className="hidden sm:inline">|</span>
                        <Link
                            to="/privacy-policy"
                            className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Right Socials */}
                    <div className="flex items-center gap-3">
                        {/* Email */}
                        <a
                            href="mailto:rohitku6207@gmail.com"
                            className="group p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-all duration-300 hover:scale-110"
                            title="Email"
                        >
                            <Mail className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/rohit-kumar-saw6207/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-300 hover:scale-110"
                            title="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/Rohitsaw6207"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110"
                            title="GitHub"
                        >
                            <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
