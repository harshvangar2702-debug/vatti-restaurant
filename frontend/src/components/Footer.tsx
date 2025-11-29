import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 100,
        duration: 1
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC]">
      {/* Main Footer Section - Two Column Layout */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side - Footer Information */}
            <div>
              <h2 className="text-5xl font-bold mb-8 text-gray-800 font-modern-serif">Vatti</h2>
              
              <div className="space-y-8">
                {/* About */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">Experience authentic Italian cuisine, crafted with passion and served with love. Every dish tells a story of tradition and excellence.</p>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Contact Info</h3>
                  <p className="text-gray-600 mb-2">📍 123 Culinary Lane, Foodie City, 54321</p>
                  <p className="text-gray-600 mb-2">📞 123-456-7890</p>
                  <p className="text-gray-600">✉️ info@vatti.com</p>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Hours</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>Mon-Thu: 11am - 10pm</li>
                    <li>Fri-Sat: 11am - 11pm</li>
                    <li>Sun: 10am - 9pm</li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Newsletter</h3>
                  <p className="text-gray-600 mb-4">Stay up to date with our latest news and offers.</p>
                  <form className="flex">
                    <input type="email" placeholder="Your Email" className="bg-white text-gray-800 px-4 py-2 rounded-l-full w-full focus:outline-none border border-gray-300" />
                    <button type="submit" className="bg-[#E67E22] text-white px-6 py-2 rounded-r-full font-bold hover:bg-opacity-90">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <h2 className="text-5xl font-bold mb-8 text-gray-800 font-modern-serif">Contact Us</h2>
              <p className="mb-8 text-lg text-gray-600 font-modern-serif">We'd love to hear from you!</p>
              
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#D4AF37] text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-orange-500 transition-all duration-300 shadow-lg w-full transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer - Copyright & Links */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:animate-bounce"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:animate-bounce"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:animate-bounce"><i className="fab fa-twitter"></i></a>
            </div>
            <p className="text-gray-500 mb-4">&copy; 2025 Vatti Restaurant. All Rights Reserved.</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
