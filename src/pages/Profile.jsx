import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Settings, LogOut } from 'lucide-react';
import Footer from "../components/Footer";
import Background from '../components/Background';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    plan: '',
    joinDate: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const gender = localStorage.getItem('userGender')?.toLowerCase() || 'male';

    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error('User not logged in');

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists()) throw new Error('User data not found in Firestore');

        const userData = userDoc.data();
        const creationTime = currentUser.metadata.creationTime;

        setUser({
          name: userData.name || 'User',
          email: currentUser.email || '',
          gender: gender,
          plan: userData.plan || 'Free',
          joinDate: creationTime || '',
        });
      } catch (error) {
        console.error('Profile Fetch Error:', error);
        alert('Failed to load profile info. Try re-logging in.');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Profile Card */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500 bg-primary-600 flex items-center justify-center">
                <img
                  src={user.gender === 'male' ? '/male-avatar.png' : '/female-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">{user.name}</h1>
                <p className="flex items-center text-secondary-600 dark:text-secondary-300">
                  <Mail size={16} className="mr-2" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Account Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar size={20} className="text-primary-500" />
                <div>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">Member Since</p>
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">
                    {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : '---'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Settings size={20} className="text-primary-500" />
                <div>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">Current Plan</p>
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">
                    {user.plan}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/subscription')}
                className="w-full text-left p-4 bg-secondary-100/70 dark:bg-secondary-700 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-600 transition"
              >
                <div className="font-medium text-secondary-900 dark:text-white">
                  Upgrade Plan
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  Get more features and remove limits
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left p-4 bg-red-100/80 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/60 transition text-red-700 dark:text-red-400"
              >
                <div className="font-medium flex items-center">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </div>
                <div className="text-sm">Sign out of your account</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
