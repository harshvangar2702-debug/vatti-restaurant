import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      };
      const response = await fetch(`${API_BASE_URL}/api/review`, { headers });
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ approved: true }),
      });

      if (response.ok) {
        setReviews(prev =>
          prev.map(r => (r._id === id ? { ...r, approved: true } : r))
        );
        alert('Review approved successfully');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/review/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReviews(prev => prev.filter(r => r._id !== id));
        alert('Review deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'approved') return review.approved;
    if (filter === 'pending') return !review.approved;
    return true;
  });

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Reviews Management</h2>
        <div className="flex gap-2">
          {(['all', 'approved', 'pending'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg ${
                filter === f
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No reviews found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl">{renderStars(review.rating)}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                      review.approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <p className="text-xs text-gray-400 mb-4">
                {new Date(review.createdAt).toLocaleDateString()} {new Date(review.createdAt).toLocaleTimeString()}
              </p>
              <div className="flex gap-2">
                {!review.approved && (
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleReject(review._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
                >
                  {review.approved ? 'Delete' : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
