import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE_URL } from '../config';

gsap.registerPlugin(ScrollTrigger);

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

const Menu = () => {
  const menuRef = useRef(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

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

  useLayoutEffect(() => {
    if (menuItems.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-item", {
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        stagger: 0.2
      });
    }, menuRef);

    return () => ctx.revert();
  }, [menuItems]);

  const getCategoryName = (categoryId: string | Category) => {
    if (typeof categoryId === 'string') {
      const category = categories.find(c => c._id === categoryId);
      return category ? category.name : 'Other';
    }
    return categoryId.name;
  };

  const filteredMenuItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter(item => {
        const itemCategory = typeof item.category === 'string'
          ? item.category
          : item.category._id;
        const selectedCategoryId = categories.find(c => c.name === activeCategory)?._id;
        return itemCategory === selectedCategoryId;
      });

  const categoryOptions = ['All', ...categories.map(c => c.name)];

  return (
    <section ref={menuRef} id="menu" className="py-24 bg-gradient-to-br from-[#FAF9F6] to-[#fbfbd1]">
      <div className="container mx-auto text-center">
        <h2 className="text-7xl font-bold mb-6 text-gray-800 font-modern-serif">Our Menu</h2>
        <p className="mb-12 text-lg text-gray-600 font-modern-serif">Discover our delicious offerings</p>
        <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-4">
          {categoryOptions.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${activeCategory === category ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading menu...</p>
          </div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No menu items found in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8">
              {filteredMenuItems.map((item) => (
                <div key={item._id} className="menu-item min-h-auto rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 bg-white">
                  <div className="w-full h-48 overflow-hidden rounded-t-3xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-6 pb-8 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-4xl font-bold font-modern-serif text-gray-600 mb-2">{item.name}</h3>
                      <div className="flex space-x-2">
                        {item.dietary.map(tag => (
                          <span key={tag} className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-8 text-xl text-gray-600 text-left">{item.description}</p>
                    <hr className="my-4 border-gray-200" />
                    <p className="text-2xl font-bold text-yellow-500">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/menu"
                className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#E67E22] text-white font-bold py-4 px-12 rounded-full text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                View Full Menu
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Menu;
