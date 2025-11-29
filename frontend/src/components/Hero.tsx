import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import hotelImage from '../assets/hotel.jpeg';

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { opacity: 0, y: 100, duration: 1, delay: 0.5 });
      gsap.from(".hero-subtitle", { opacity: 0, y: 100, duration: 1, delay: 0.8 });
      gsap.from(".hero-buttons", { opacity: 0, y: 100, duration: 1, delay: 1.1 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url(${hotelImage})` }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.2))' }}></div>
      <div className="relative text-center p-4 md:p-20 rounded-lg">
        <h1 className="text-5xl md:text-9xl font-bold hero-title font-modern-serif">Vatti</h1>
        <p className="text-xl md:text-3xl mt-4 hero-subtitle font-modern-serif" style={{ color: '#D4AF37' }}>Where Family Comes Together</p>
        <p className="text-xl md:text-3xl mt-4 hero-subtitle font-modern-serif">Authentic Italian Cuisine – Family-Owned Since 1998</p>
        <div className="mt-8 md:mt-16 hero-buttons flex flex-col md:flex-row gap-4 justify-center items-center">
          <a href="#order" className="bg-[#E67E22] text-white py-3 px-6 rounded-full font-bold text-lg md:text-xl hover:bg-[#D4AF37] transition-all duration-300 shadow-lg transform hover:scale-105 w-full md:w-auto">Order Online</a>
          <a href="#reservation" className="border-2 border-white text-white py-3 px-6 rounded-full font-bold text-lg md:text-xl hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 w-full md:w-auto">Reserve Table</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
