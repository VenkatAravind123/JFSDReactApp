import React from 'react'
import HeroSection from '../components/HeroSection'
import CTASection from '../components/CTASection'
import StatsSection from '../components/StatsSection'
import NewsSection from '../components/NewsSection'
import Footer from '../components/Footer'
import '../styles/globals.css'

export default function Home() {
  return (
    <div className='home-container'>
      <HeroSection />
      <CTASection />
      <StatsSection />
      <NewsSection />
      <Footer />
    </div>
  );
}