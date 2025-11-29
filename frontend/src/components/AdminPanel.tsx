import React, { useState, useEffect } from 'react';
import AdminDashboard from './Admin/AdminDashboard';
import AdminReservations from './Admin/AdminReservations';
import AdminMenu from './Admin/AdminMenu';
import AdminPromotions from './Admin/AdminPromotions';
import AdminReviews from './Admin/AdminReviews';
import AdminSettings from './Admin/AdminSettings';
import AdminLogin from './Admin/AdminLogin';
import { API_BASE_URL } from '../config';

type AdminPage = 'dashboard' | 'reservations' | 'menu' | 'promotions' | 'reviews' | 'settings' | 'login';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

const AdminPanel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reservationCount, setReservationCount] = useState(0);
  const [lastReservationIds, setLastReservationIds] = useState<string[]>([]);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const name = localStorage.getItem('adminName');
    if (token && name) {
      setIsLoggedIn(true);
      setAdminName(name);
      setCurrentPage('dashboard');
      
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      checkForNewReservations(token);
      // Poll for new reservations every 10 seconds
      const interval = setInterval(() => checkForNewReservations(token), 10000);
      return () => clearInterval(interval);
    }
  }, []);

  const checkForNewReservations = async (token: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const response = await fetch(`${API_BASE_URL}/api/reservation`, { headers });
      const data = await response.json();
      const reservations = Array.isArray(data) ? data : [];
      const currentIds = reservations.map((r: any) => r._id);
      
      // Check for new reservations by ID
      const newReservations = currentIds.filter((id: string) => !lastReservationIds.includes(id));
      
      // Show notification for each new reservation
      newReservations.forEach((id: string) => {
        const reservation = reservations.find((r: any) => r._id === id);
        if (reservation) {
          const message = `New Reservation from ${reservation.name} for ${reservation.partySize} people on ${new Date(reservation.date).toLocaleDateString()}`;
          addNotification(message, 'success');
          
          // Send browser push notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🔔 New Restaurant Reservation', {
              body: message,
              icon: '🍽️',
              tag: 'reservation-' + id, // Prevents duplicate notifications
              requireInteraction: true, // Keeps notification visible until user interacts
            });
          }
        }
      });
      
      setLastReservationIds(currentIds);
      setReservationCount(reservations.length);
    } catch (error) {
      console.error('Error checking reservations:', error);
    }
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      id,
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleLogin = (token: string, name: string) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminName', name);
    setIsLoggedIn(true);
    setAdminName(name);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    setIsLoggedIn(false);
    setAdminName('');
    setCurrentPage('login');
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`${getNotificationStyles(notification.type)} text-white px-6 py-3 rounded-lg shadow-lg animate-pulse`}
          >
            <div className="font-semibold flex items-center">
              <span className="mr-2">🔔</span>
              {notification.message}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">Vatti Admin</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full text-left px-4 py-2 rounded ${
              currentPage === 'dashboard'
                ? 'bg-orange-500'
                : 'hover:bg-gray-800'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('reservations')}
            className={`w-full text-left px-4 py-2 rounded ${
              currentPage === 'reservations'
                ? 'bg-orange-500'
                : 'hover:bg-gray-800'
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => setCurrentPage('menu')}
            className={`w-full text-left px-4 py-2 rounded ${
              currentPage === 'menu'
                ? 'bg-orange-500'
                : 'hover:bg-gray-800'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setCurrentPage('promotions')}
            className={`w-full text-left px-4 py-2 rounded ${
              currentPage === 'promotions'
                ? 'bg-orange-500'
                : 'hover:bg-gray-800'
            }`}
          >
            Promotions
          </button>
          <button
            onClick={() => setCurrentPage('reviews')}
            className={`w-full text-left px-4 py-2 rounded ${
              currentPage === 'reviews'
                ? 'bg-orange-500'
                : 'hover:bg-gray-800'
            }`}
          >
            Reviews
          </button>
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">Logged in as:</p>
          <p className="text-white font-semibold mb-4">{adminName}</p>
          <button
            onClick={() => setCurrentPage('settings')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded mb-2"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {currentPage === 'dashboard' && <AdminDashboard />}
          {currentPage === 'reservations' && <AdminReservations />}
          {currentPage === 'menu' && <AdminMenu />}
          {currentPage === 'promotions' && <AdminPromotions />}
          {currentPage === 'reviews' && <AdminReviews />}
          {currentPage === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
