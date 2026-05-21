import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-info">
          <div className="footer-logo">Jana SevaAP</div>
          <p className="footer-copy">&copy; {currentYear} Jana SevaAP. Dedicated to civic empowerment.</p>
        </div>
        <div className="footer-links">
          <a className="footer-link" href="#privacy">Privacy Policy</a>
          <a className="footer-link" href="#terms">Terms of Service</a>
          <a className="footer-link" href="#faq">FAQ</a>
          <a className="footer-link" href="#accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
