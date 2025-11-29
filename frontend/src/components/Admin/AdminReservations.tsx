import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string;
}

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      };
      const response = await fetch(`${API_BASE_URL}/api/reservation`, { headers });
      const data = await response.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/reservation/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReservations(prev => prev.filter(r => r._id !== id));
        alert('Reservation deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation');
    }
  };

  const filteredReservations = filterDate
    ? reservations.filter(r => r.date.startsWith(filterDate))
    : reservations;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Reservations</h2>
        <button
          onClick={fetchReservations}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate('')}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Clear Filter
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredReservations.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No reservations found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Time</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Party Size</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Special Requests</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReservations.map(reservation => (
                <tr key={reservation._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{reservation.name}</td>
                  <td className="px-6 py-4">{reservation.email}</td>
                  <td className="px-6 py-4">{reservation.phone}</td>
                  <td className="px-6 py-4">{new Date(reservation.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{reservation.time}</td>
                  <td className="px-6 py-4">{reservation.partySize}</td>
                  <td className="px-6 py-4 text-sm">{reservation.specialRequests || '-'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(reservation._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
