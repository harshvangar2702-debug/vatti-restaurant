import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC]">
      <div className="container mx-auto text-center px-8">
        <h2 className="text-7xl font-bold mb-6 text-gray-800 font-modern-serif">Contact Us</h2>
        <p className="mb-16 text-xl text-gray-600 font-modern-serif">We'd love to hear from you!</p>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-left text-base font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-base font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-base font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white py-3 px-8 rounded-full font-bold text-base hover:bg-orange-500 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
