import { useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Promotions from './components/Promotions';
import Footer from './components/Footer';
import FullMenu from './pages/FullMenu';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function HomePage() {
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });

    return () => {
      // Kill the smoother instance when the component unmounts
      if (smoother) smoother.kill();
    };
  }, []);

  const handleSelectPromotion = (promotionTitle: string) => {
    setSelectedPromotion(promotionTitle);
    gsap.to(window, { duration: 1, scrollTo: "#reservation" });
  };

  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <OurStory />
            <Menu />
            <Reservation selectedPromotion={selectedPromotion} />
            <Gallery />
            <Promotions onSelectPromotion={handleSelectPromotion} />
            <Reviews />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<FullMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
