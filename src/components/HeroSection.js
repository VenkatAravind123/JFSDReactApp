import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    // Scroll to CTA section or navigate to more info
    document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-bg">
        <img 
          alt="Government building" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ90t80aZunKPPcp6AyYGDIxZzyigV6J69RoqHlJhKWSxGzJEfrvm2yMRvoabBGrDjNF9usBGnMPycO_aBChwYnlsNIL8H6x3D956xIPWZHdmbFV3YEcBXxACULRKqt5we7-GdKmN424ObM_yEKVGYklrZaFtSOLESGSzQcO0G-n0iV8hFSIJOmTP0bXESyPKLVgfKlual9qWVcmIBzUs49ksSpuI5n0KyIzgEJsR4dBYo9RNtESTT3cH5_9V0bpIvXgq_N0bnXw" 
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Empowering Every Voice for a Better Tomorrow</h1>
          <p className="hero-description">
            Bridging the gap between the people and their representatives. Experience a transparent, 
            efficient, and direct channel for civic engagement and local governance.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-outline" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
