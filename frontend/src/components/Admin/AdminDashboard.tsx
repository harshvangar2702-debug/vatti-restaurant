import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

interface DashboardStats {
  totalReservations: number;
  totalMenuItems: number;
  totalPromotions: number;
  totalGalleryItems: number;
  totalReviews: number;
  approvedReviews: number;
  pendingReviews: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalReservations: 0,
    totalMenuItems: 0,
    totalPromotions: 0,
    totalGalleryItems: 0,
    totalReviews: 0,
    approvedReviews: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      };

      const [
        menuRes,
        reservationRes,
        promotionRes,
        galleryRes,
        reviewRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/api/menu`, { headers }),
        fetch(`${API_BASE_URL}/api/reservation`, { headers }),
        fetch(`${API_BASE_URL}/api/promotions`, { headers }),
        fetch(`${API_BASE_URL}/api/gallery`, { headers }),
        fetch(`${API_BASE_URL}/api/review`, { headers }),
      ]);

      const menuData = await menuRes.json();
      const reservationData = await reservationRes.json();
      const promotionData = await promotionRes.json();
      const galleryData = await galleryRes.json();
      const reviewData = await reviewRes.json();

      const reviewArray = Array.isArray(reviewData) ? reviewData : [];
      const approvedCount = reviewArray.filter((r: any) => r.approved).length;
      const pendingCount = reviewArray.filter((r: any) => !r.approved).length;

      setStats({
        totalMenuItems: Array.isArray(menuData) ? menuData.length : 0,
        totalReservations: Array.isArray(reservationData) ? reservationData.length : 0,
        totalPromotions: Array.isArray(promotionData) ? promotionData.length : 0,
        totalGalleryItems: Array.isArray(galleryData) ? galleryData.length : 0,
        totalReviews: reviewArray.length,
        approvedReviews: approvedCount,
        pendingReviews: pendingCount,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    bgColor = 'bg-blue-50',
    textColor = 'text-blue-600'
  }: { 
    title: string
    value: number
    bgColor?: string
    textColor?: string
  }) => (
    <div className={`${bgColor} p-6 rounded-lg shadow-md border-l-4 border-orange-500`}>
      <h3 className="text-gray-600 font-semibold mb-2">{title}</h3>
      <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard 
              title="Reservations" 
              value={stats.totalReservations}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <StatCard 
              title="Menu Items" 
              value={stats.totalMenuItems}
              bgColor="bg-green-50"
              textColor="text-green-600"
            />
            <StatCard 
              title="Promotions" 
              value={stats.totalPromotions}
              bgColor="bg-purple-50"
              textColor="text-purple-600"
            />
            <StatCard 
              title="Gallery Items" 
              value={stats.totalGalleryItems}
              bgColor="bg-pink-50"
              textColor="text-pink-600"
            />
            <StatCard 
              title="Total Reviews" 
              value={stats.totalReviews}
              bgColor="bg-yellow-50"
              textColor="text-yellow-600"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Reviews Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-semibold">Approved</span>
                    <span className="text-green-600 font-bold">{stats.approvedReviews}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.approvedReviews / stats.totalReviews) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-semibold">Pending</span>
                    <span className="text-yellow-600 font-bold">{stats.pendingReviews}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-yellow-500 h-4 rounded-full"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.pendingReviews / stats.totalReviews) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Content Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Menu Items</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.totalMenuItems}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Active Promotions</span>
                  <span className="text-2xl font-bold text-purple-600">{stats.totalPromotions}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-gray-700">Gallery Images</span>
                  <span className="text-2xl font-bold text-pink-600">{stats.totalGalleryItems}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border-l-4 border-blue-500">
                <p className="text-gray-600 mb-2">Total Bookings</p>
                <p className="text-4xl font-bold text-blue-600">{stats.totalReservations}</p>
              </div>
              <div className="text-center p-4 border-l-4 border-orange-500">
                <p className="text-gray-600 mb-2">Total Content</p>
                <p className="text-4xl font-bold text-orange-600">
                  {stats.totalMenuItems + stats.totalPromotions + stats.totalGalleryItems}
                </p>
              </div>
              <div className="text-center p-4 border-l-4 border-green-500">
                <p className="text-gray-600 mb-2">Reviews to Approve</p>
                <p className="text-4xl font-bold text-green-600">{stats.pendingReviews}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
