import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CTASection.css';

export default function CTASection() {
  const navigate = useNavigate();

  const handleCitizenClick = () => {
    navigate('/citizen');
  };

  const handlePoliticianClick = () => {
    navigate('/politician');
  };

  return (
    <section className="container cta-section">
      <div className="cta-grid">
        {/* Citizens Card */}
        <div className="cta-card cta-card-citizen">
          <div className="cta-card-content">
            <span className="material-symbols-outlined cta-icon citizen">person_pin_circle</span>
            <h2 className="cta-title">For Citizens</h2>
            <p className="cta-text">
              Voice your concerns, track community issues, and participate in local decision-making. 
              Your feedback shapes your neighborhood.
            </p>
            <button 
              className="cta-link citizen" 
              onClick={handleCitizenClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span>Login / Register to voice your concerns</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="bg-decoration">
            <span className="material-symbols-outlined">campaign</span>
          </div>
        </div>

        {/* Politicians Card */}
        <div className="cta-card cta-card-politician">
          <div className="cta-card-content">
            <span className="material-symbols-outlined cta-icon politician">policy</span>
            <h2 className="cta-title" style={{color:"white"}}>For Politicians</h2>
            <p className="cta-text">
              Directly connect with your constituency. Address grievances, share updates on initiatives, 
              and build trust through transparent communication.
            </p>
            <button 
              className="cta-link politician" 
              onClick={handlePoliticianClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span>Login to connect with your constituency</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="bg-decoration">
            <span className="material-symbols-outlined" style={{ color: 'white' }}>diversity_3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
