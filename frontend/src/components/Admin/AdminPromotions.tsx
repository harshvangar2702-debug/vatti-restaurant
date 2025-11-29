import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

interface Promotion {
  _id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  expiryDate: string;
  image: string;
}

interface PromotionFormData {
  title: string;
  description: string;
  discount: string;
  code: string;
  expiryDate: string;
  image: string;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PromotionFormData>({
    title: '',
    description: '',
    discount: '',
    code: '',
    expiryDate: '',
    image: '',
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      };
      const response = await fetch(`${API_BASE_URL}/api/promotions`, { headers });
      const data = await response.json();
      setPromotions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_BASE_URL}/api/promotions/${editingId}`
        : `${API_BASE_URL}/api/promotions`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          discount: parseFloat(formData.discount),
        }),
      });

      if (response.ok) {
        alert(editingId ? 'Promotion updated successfully' : 'Promotion created successfully');
        resetForm();
        fetchPromotions();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save promotion'}`);
      }
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Failed to save promotion. Please check the console for details.');
    }
  };

  const handleEdit = (promo: Promotion) => {
    setFormData({
      title: promo.title,
      description: promo.description,
      discount: promo.discount.toString(),
      code: promo.code,
      expiryDate: promo.expiryDate.split('T')[0],
      image: promo.image,
    });
    setEditingId(promo._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/promotions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPromotions(prev => prev.filter(p => p._id !== id));
        alert('Promotion deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Failed to delete promotion');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount: '',
      code: '',
      expiryDate: '',
      image: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Promotions Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          {showForm ? 'Cancel' : 'Add Promotion'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Promotion' : 'Add New Promotion'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Promo Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {editingId ? 'Update Promotion' : 'Add Promotion'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map(promo => (
            <div key={promo._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              {promo.image && (
                <img src={promo.image} alt={promo.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-500">{promo.discount}%</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm font-semibold">
                    {promo.code}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Expires: {new Date(promo.expiryDate).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(promo._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPromotions;
