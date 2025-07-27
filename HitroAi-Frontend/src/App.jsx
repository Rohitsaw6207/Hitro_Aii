import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import BlogChat from './pages/BlogChat';
import StudentChat from './pages/StudentChat';
import CodeChat from './pages/CodeChat';
import TranslatorChat from './pages/TranslatorChat';
import ResumeChat from './pages/ResumeChat';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }

    // Check for authentication state
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Background>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={closeSidebar} 
            isAuthenticated={isAuthenticated}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              onToggleSidebar={toggleSidebar}
              onToggleTheme={toggleTheme}
              darkMode={darkMode}
              isAuthenticated={isAuthenticated}
              sidebarOpen={sidebarOpen}
            />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/tools/blog" element={<BlogChat />} />
                <Route path="/tools/student" element={<StudentChat />} />
                <Route path="/tools/code" element={<CodeChat />} />
                <Route path="/tools/translator" element={<TranslatorChat />} />
                <Route path="/tools/resume" element={<ResumeChat />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
        </div>
      </Background>
    </Router>
  );
}

export default App;