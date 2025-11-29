import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE_URL } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface IOffer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  expiryDate: string;
  image: string;
}

interface PromotionsProps {
  onSelectPromotion: (promotionTitle: string) => void; // New prop
}

const Promotions: React.FC<PromotionsProps> = ({ onSelectPromotion }) => { // Destructure prop
  const promotionsRef = useRef(null);
  const [offers, setOffers] = useState<IOffer[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/promotion`);
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
        setOffers([]);
      }
    };

    fetchPromotions();
  }, []);

  useLayoutEffect(() => {
    if (offers.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".promotion-card", {
        scrollTrigger: {
          trigger: promotionsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.2
      });
    }, promotionsRef);

    return () => ctx.revert();
  }, [offers]);

  return (
    <section ref={promotionsRef} id="promotions" className="py-32 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC]">
      <div className="container mx-auto text-center px-8">
        <h2 className="text-7xl font-bold mb-6 text-gray-800 font-modern-serif">Current Promotions</h2>
        <p className="mb-8 text-xl text-gray-600 font-modern-serif">Don't miss out on our special offers.</p>
        {offers.length === 0 ? (
          <div className="py-12 text-gray-500">
            <p className="text-lg">No promotions available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ perspective: '1000px' }}>
            {offers.map((offer) => (
              <div key={offer._id} className="relative bg-white rounded-xl shadow-lg promotion-card transform transition-transform duration-500 hover:translate-y-[-8px] hover:shadow-xl border border-gray-100 overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <span className="absolute top-0 right-0 bg-[#E67E22] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">{offer.discount}% OFF</span>
                  <h3 className="text-3xl font-bold mb-4 text-gray-800 font-modern-serif">{offer.title}</h3>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700">Code: <span className="text-[#E67E22] font-mono">{offer.code}</span></p>
                    <p className="text-xs text-gray-500">Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => onSelectPromotion(offer.title)} className="w-full bg-[#E67E22] text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-md transform hover:scale-105">Reserve Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Promotions;
