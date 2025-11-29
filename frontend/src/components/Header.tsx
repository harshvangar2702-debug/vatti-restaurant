import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
    <header className={`fixed top-0 left-0 w-full z-50 h-24 py-4 px-8 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white text-gray-700 shadow-md' : 'bg-transparent text-white'}`}>
      <div className="flex items-center text-white">
        <img src="/src/assets/logo.svg" alt="Vatti Logo" className="h-10 w-10 mr-3" />
        <div className={`text-3xl font-bold font-modern-serif`}>Vatti</div>
      </div>
      <nav className="hidden md:flex items-center">
        <ul className="flex space-x-8">
          <li className="relative group">
            <a href="#story" className={`text-lg pb-2 transition-all duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>Our Story</a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </li>
          <li className="relative group">
            <a href="#menu" className={`text-lg pb-2 transition-all duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>Menu</a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </li>
          <li className="relative group">
            <a href="#gallery" className={`text-lg pb-2 transition-all duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>Gallery</a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </li>
          <li className="relative group">
            <a href="#reviews" className={`text-lg pb-2 transition-all duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>Reviews</a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </li>
          <li className="relative group">
            <a href="#promotions" className={`text-lg pb-2 transition-all duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>Promotions</a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </li>
        </ul>
      </nav>
      <div className="hidden md:block space-x-4">
        <a href="#contact" className="bg-[#E67E22] text-white py-4 px-8 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105">Contact Us</a>
        <a href="#reservation" className="bg-[#D4AF37] text-white py-4 px-8 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105">Reserve Now</a>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${scrolled ? 'text-gray-700' : 'text-white'} focus:outline-none hover:scale-110 transition-transform duration-300`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </header>
      {isMenuOpen && (
        <div className={`md:hidden fixed top-0 right-0 w-64 h-full bg-gray-800 bg-opacity-90 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col items-center space-y-8 mt-24">
            <li><a href="#story" className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Our Story</a></li>
            <li><a href="#menu" className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Menu</a></li>
            <li><a href="#gallery" className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Gallery</a></li>
            <li><a href="#reviews" className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Reviews</a></li>
            <li><a href="#promotions" className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>Promotions</a></li>
            <li><a href="#contact" className="bg-[#E67E22] text-white py-3 px-6 rounded-full font-bold hover:bg-opacity-90" onClick={() => setIsMenuOpen(false)}>Contact Us</a></li>
            <li><a href="#reservation" className="bg-[#E67E22] text-white py-3 px-6 rounded-full font-bold hover:bg-opacity-90" onClick={() => setIsMenuOpen(false)}>Reserve Table</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
