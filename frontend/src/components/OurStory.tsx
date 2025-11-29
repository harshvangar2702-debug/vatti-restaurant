import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import familyImage from '../assets/family.jpeg';



gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const storyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-content", {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: -100,
        duration: 1
      });
      gsap.from(".story-image", {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: 100,
        duration: 1
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={storyRef} id="story" className="animate-section py-20 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC] ">
      <div className="container mx-auto flex flex-col-reverse md:flex-row-reverse gap-8 md:gap-24 items-center">
        <div className="story-image w-full md:w-1/2">
          <img src={familyImage} alt="Family gathering" className="rounded-lg shadow-2xl w-full h-full object-cover" />
        </div>
        <div className="story-content px-4 md:px-8 w-full md:w-1/2">
          <h2 className="text-4xl md:text-7xl font-bold mb-6 text-gray-800 font-modern-serif">Our Story</h2><br />
          <p className="mb-6 text-lg text-gray-600">
            Vatti is a family-owned restaurant born from a passion for authentic Italian cuisine. Our journey began with our grandparents, who brought their cherished family recipes from the heart of Italy to our kitchen. We believe in creating a warm, inviting atmosphere where every guest feels like part of our family.
          </p>
          <p className="mb-8 text-lg text-gray-600">
            Our philosophy is simple: use the freshest, locally-sourced ingredients to craft traditional dishes with a modern twist. From our handmade pasta to our wood-fired pizzas, every meal is a celebration of flavor, tradition, and community.
          </p><br />
          <a href="#menu" className="bg-[#E67E22] text-white py-3 px-6 rounded-full font-bold text-base hover:bg-[#D4AF37] transition-all duration-300 shadow-lg mt-4">Explore Our Menu</a>
        </div>
      </div>
    </section>
  );
};

export default OurStory;