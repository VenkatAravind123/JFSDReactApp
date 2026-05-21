import React, { useState, useEffect } from 'react';
import '../styles/StatsSection.css';

export default function StatsSection() {
  const [stats, setStats] = useState({
    citizens: 0,
    resolved: 0,
    initiatives: 0
  });

  useEffect(() => {
    const animateCounter = (target, duration = 2000) => {
      let current = 0;
      const increment = target / (duration / 20);
      const startTime = Date.now();

      const update = () => {
        current = Math.min(current + increment, target);
        if (current < target) {
          requestAnimationFrame(update);
        }
      };

      update();
      return Math.floor(current);
    };

    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      const citizensInterval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          citizens: Math.min(prev.citizens + 1500, 150000)
        }));
      }, 10);

      const resolvedInterval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          resolved: Math.min(prev.resolved + 420, 42000)
        }));
      }, 10);

      const initiativesInterval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          initiatives: Math.min(prev.initiatives + 12, 1200)
        }));
      }, 10);

      return () => {
        clearInterval(citizensInterval);
        clearInterval(resolvedInterval);
        clearInterval(initiativesInterval);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 150000 || num >= 42000 || num >= 1200) {
      return Math.floor(num).toLocaleString() + '+';
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <section className="stats-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Platform at a Glance</h2>
          <p className="section-subtitle">Transparency in real-time impact.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number stat-citizen">{formatNumber(stats.citizens)}</div>
            <div className="stat-label">Active Citizens</div>
          </div>
          <div className="stat-card">
            <div className="stat-number stat-resolved">{formatNumber(stats.resolved)}</div>
            <div className="stat-label">Issues Resolved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number stat-initiatives">{formatNumber(stats.initiatives)}</div>
            <div className="stat-label">Ongoing Initiatives</div>
          </div>
        </div>
      </div>
    </section>
  );
}
