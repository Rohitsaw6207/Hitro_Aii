// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Crown, Calendar, LogOut } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/* -------------------------------------------------------
   1. LOGIN (unchanged except cosmetic)
------------------------------------------------------- */
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      credentials.username.trim() === 'Rohit Kumar' &&
      credentials.password === 'Rohit@6207'
    ) {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
              Admin Access
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              Enter admin credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
                placeholder="Admin Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full pr-10 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   2. DASHBOARD
------------------------------------------------------- */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const navigate = useNavigate();

  /* ---------------------------------
     Firestore real-time snapshots
  --------------------------------- */
  const [users, setUsers] = useState([]);
  const [dau, setDau] = useState([]); // { label, count }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      const docs = [];
      snap.forEach((d) => docs.push({ uid: d.id, ...d.data() }));
      setUsers(docs);
    });

    // Daily Active Users – example structure:
    // collection('daily_stats') -> doc('2024-08-01') -> { count: 42 }
    const dauUnsub = onSnapshot(collection(db, 'daily_stats'), (snap) => {
      const stats = [];
      snap.forEach((d) => {
        stats.push({ label: d.id, count: d.data().count || 0 });
      });
      // sort by date
      stats.sort((a, b) => new Date(a.label) - new Date(b.label));
      setDau(stats);
    });

    return () => {
      unsub();
      dauUnsub();
    };
  }, []);

  const premiumUsers = users.filter((u) => u.premium);

  /* ---------------------------------
     Tabs
  --------------------------------- */
  const tabs = [
    { id: 'insights', name: 'Insights', icon: BarChart3 },
    { id: 'users', name: 'Total Users', icon: Users },
    { id: 'premium', name: 'Premium Users', icon: Crown },
  ];

  const handleLogout = () => navigate('/');

  /* ---------------------------------
     Chart helpers
  --------------------------------- */
  const lineData = {
    labels: dau.map((d) => d.label),
    datasets: [
      {
        label: 'Daily Active Users',
        data: dau.map((d) => d.count),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139,92,246,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-xl border-r border-secondary-200/50 dark:border-secondary-700/50">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-secondary-900 dark:text-secondary-100">
                  Admin Panel
                </h1>
                <p className="text-xs text-secondary-600 dark:text-secondary-400">
                  Hitro AI Management
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg'
                        : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                {tabs.find((t) => t.id === activeTab)?.name}
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Manage and monitor your Hitro AI platform
              </p>
            </div>

            {/* ---------- INSIGHTS ---------- */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Users size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
                      {users.length}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Total Users
                    </p>
                  </div>

                  <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Crown size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
                      {premiumUsers.length}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Premium Users
                    </p>
                  </div>

                  <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <Calendar size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
                      {dau.length ? dau[dau.length - 1]?.count : 0}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Active Today
                    </p>
                  </div>

                  <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <BarChart3 size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
                      {premiumUsers.length}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      Active Subscriptions
                    </p>
                  </div>
                </div>

                {/* DAU Chart */}
                <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                    Daily Active Users
                  </h3>
                  <div className="h-72">
                    <Line data={lineData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            )}

            {/* ---------- TOTAL USERS ---------- */}
            {activeTab === 'users' && (
              <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-secondary-200/50 dark:border-secondary-700/50">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    All Users ({users.length})
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50 dark:bg-secondary-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Plan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                      {users.map((user) => (
                        <tr
                          key={user.uid}
                          className="hover:bg-secondary-50 dark:hover:bg-secondary-700/30"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={user.profilePic || '/male-avatar.png'}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="ml-3 text-sm font-medium text-secondary-900 dark:text-secondary-100">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">
                            {user.createdAt?.toDate
                              ? user.createdAt.toDate().toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.premium
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {user.premium ? 'Pro' : 'Free'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ---------- PREMIUM USERS ---------- */}
            {activeTab === 'premium' && (
              <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/50 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-secondary-200/50 dark:border-secondary-700/50">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    Premium Users ({premiumUsers.length})
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50 dark:bg-purple-900/20">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Premium Since
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                      {premiumUsers.map((user) => (
                        <tr
                          key={user.uid}
                          className="hover:bg-purple-50 dark:hover:bg-purple-900/10"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={user.profilePic || '/male-avatar.png'}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="ml-3 text-sm font-medium text-secondary-900 dark:text-secondary-100">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 dark:text-secondary-400">
                            {user.createdAt?.toDate
                              ? user.createdAt.toDate().toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {user.premiumStarted?.toDate
                              ? user.premiumStarted.toDate().toLocaleDateString()
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   3. ENTRY POINT
------------------------------------------------------- */
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  );
};

export default Admin;