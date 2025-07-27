// Admin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, User, Eye, EyeOff } from 'lucide-react';

/* -------------------------------------------------- */
/* 1. LOGIN                                           */
/* -------------------------------------------------- */
const AdminLogin = ({ onLogin }) => {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [showPwd, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (creds.username === 'Rohit Kumar' && creds.password === 'Rohit@6207') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Admin Access</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={creds.username}
                  onChange={(e) => setCreds({ ...creds, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Eye size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={creds.password}
                  onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!showPwd)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------- */
/* 2.  HARDCODED 20 INDIAN USERS                      */
/* -------------------------------------------------- */
const users = [
  { id: 1,  name: 'Rohit Kumar',     email: 'rohitku6207@gmail.com', joinDate: '2024-01-15', plan: 'premium', gender: 'male' },
  { id: 2,  name: 'Priya Sharma',    email: 'priya123@example.com',  joinDate: '2024-01-20', plan: 'premium', gender: 'female' },
  { id: 3,  name: 'Arjun Patel',     email: 'arjun99@example.com',   joinDate: '2024-02-01', plan: 'premium', gender: 'male' },
  { id: 4,  name: 'Ananya Singh',    email: 'ananya@example.com',    joinDate: '2024-02-05', plan: 'premium', gender: 'female' },
  { id: 5,  name: 'Vikram Malhotra', email: 'vikram.m@example.com',  joinDate: '2024-02-10', plan: 'premium', gender: 'male' },
  { id: 6,  name: 'Neha Gupta',      email: 'neha456@example.com',   joinDate: '2024-02-12', plan: 'free',    gender: 'female' },
  { id: 7,  name: 'Suresh Reddy',    email: 'suresh@example.com',    joinDate: '2024-02-15', plan: 'free',    gender: 'male' },
  { id: 8,  name: 'Kavita Joshi',    email: 'kavita.j@example.com',  joinDate: '2024-02-18', plan: 'free',    gender: 'female' },
  { id: 9,  name: 'Amit Mehra',      email: 'amit.m@example.com',    joinDate: '2024-02-20', plan: 'free',    gender: 'male' },
  { id: 10, name: 'Divya Nair',      email: 'divya.n@example.com',   joinDate: '2024-02-22', plan: 'free',    gender: 'female' },
  { id: 11, name: 'Rahul Verma',     email: 'rahul.v@example.com',   joinDate: '2024-02-25', plan: 'free',    gender: 'male' },
  { id: 12, name: 'Pooja Chawla',    email: 'pooja.c@example.com',   joinDate: '2024-02-27', plan: 'free',    gender: 'female' },
  { id: 13, name: 'Sanjay Bansal',   email: 'sanjay.b@example.com',  joinDate: '2024-03-01', plan: 'free',    gender: 'male' },
  { id: 14, name: 'Meera Iyer',      email: 'meera@example.com',     joinDate: '2024-03-03', plan: 'free',    gender: 'female' },
  { id: 15, name: 'Deepak Rao',      email: 'deepak.r@example.com',  joinDate: '2024-03-05', plan: 'free',    gender: 'male' },
  { id: 16, name: 'Shalini Kapoor',  email: 'shalini.k@example.com', joinDate: '2024-03-07', plan: 'free',    gender: 'female' },
  { id: 17, name: 'Manoj Tiwari',    email: 'manoj.t@example.com',   joinDate: '2024-03-09', plan: 'free',    gender: 'male' },
  { id: 18, name: 'Sanya Biswas',    email: 'sanya.b@example.com',   joinDate: '2024-03-11', plan: 'free',    gender: 'female' },
  { id: 19, name: 'Gaurav Khanna',   email: 'gaurav.k@example.com',  joinDate: '2024-03-13', plan: 'free',    gender: 'male' },
  { id: 20, name: 'Tanya Mukherjee', email: 'tanya.m@example.com',   joinDate: '2024-03-15', plan: 'free',    gender: 'female' },
];

const premiumUsers = users.filter(u => u.plan === 'premium');

/* -------------------------------------------------- */
/* 3.  DASHBOARD                                      */
/* -------------------------------------------------- */
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const navigate = useNavigate();

  const insights = {
    male:   users.filter(u => u.gender === 'male').length,
    female: users.filter(u => u.gender === 'female').length,
    free:   users.filter(u => u.plan === 'free').length,
    premium:users.filter(u => u.plan === 'premium').length,
    revenue: premiumUsers.length * 99,
    monthlyGrowth: 23.5,
  };

  const tabs = [
    { id: 'insights', name: 'Insights', icon: () => null },
    { id: 'users',    name: 'Total Users', icon: () => null },
    { id: 'premium',  name: 'Premium Users', icon: () => null },
  ];

  const handleLogout = () => navigate('/');

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hitro AI Management</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Manage and monitor your Hitro AI platform</p>

            {/* Insights Tab (no graph) */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <StatCard icon={Users} value={insights.male} label="Male Users" />
                  <StatCard icon={Users} value={insights.female} label="Female Users" />
                  <StatCard icon={Users} value={insights.free} label="Free Users" />
                  <StatCard icon={Crown} value={insights.premium} label="Premium Users" />
                  <StatCard icon={Users} value={`₹${insights.revenue.toLocaleString()}`} label="Revenue" />
                </div>
                {/* graph removed */}
              </div>
            )}

            {/* All Users Tab */}
            {activeTab === 'users' && <UserTable data={users} title="All Users" />}

            {/* Premium Users Tab */}
            {activeTab === 'premium' && <UserTable data={premiumUsers} title="Premium Users" />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------- */
/* 4.  HELPER COMPONENTS                              */
/* -------------------------------------------------- */
const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 shadow-md">
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-indigo-500" />
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      </div>
    </div>
  </div>
);

const UserTable = ({ data, title }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg overflow-hidden">
    <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title} ({data.length})</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(u => (
            <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{u.name.charAt(0)}</span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">{u.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{u.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{new Date(u.joinDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${u.plan === 'premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {u.plan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* -------------------------------------------------- */
/* 5.  WRAPPER                                        */
/* -------------------------------------------------- */
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
};

export default Admin;