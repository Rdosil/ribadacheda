
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import WineMenu from '@/components/WineMenu';
import Reservation from '@/components/Reservation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Animation observer for scrolling elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Simulate image preloading
  useEffect(() => {
    const imagesToPreload = [
      '/images/hero-bg.jpg',
      '/images/restaurant-1.jpg',
      '/images/wine-glasses.jpg',
      '/images/wine-bottles.jpg',
      '/images/coastal-bg.jpg',
    ];
    
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Features />
      <WineMenu />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
