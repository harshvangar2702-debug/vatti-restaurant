import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category | string;
  dietary: string[];
}

const FullMenu: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu`);
      const data = await response.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch =
      selectedCategory === 'all' ||
      (typeof item.category === 'string'
        ? item.category === selectedCategory
        : item.category._id === selectedCategory);
    
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC] pt-20 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          ← Back to Home
        </button>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-modern-serif">
          Our Complete Menu
        </h1>
        <p className="text-lg text-gray-600 font-modern-serif">
          Explore our full selection of delicious dishes
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 mb-8">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
            }`}
          >
            All Items
          </button>
          {categories.map(category => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category._id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      {loading ? (
        <div className="container mx-auto px-6 text-center py-12">
          <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="container mx-auto px-6 text-center py-12">
          <p className="text-gray-500 text-lg">No menu items found.</p>
        </div>
      ) : (
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 font-modern-serif">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Dietary Tags */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {item.dietary.map(diet => (
                        <span
                          key={diet}
                          className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Category Badge */}
                  {typeof item.category !== 'string' && (
                    <div className="mb-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        {item.category.name}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="border-t pt-4">
                    <p className="text-3xl font-bold text-orange-500 font-modern-serif">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="container mx-auto px-6 mt-12 text-center">
        <p className="text-gray-600 text-lg">
          Showing {filteredItems.length} of {menuItems.length} items
        </p>
      </div>
    </div>
  );
};

export default FullMenu;
