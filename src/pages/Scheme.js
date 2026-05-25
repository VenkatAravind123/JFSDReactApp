import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SchemeDetails.css';
import Cookies from 'js-cookie';
import config from '../main/config';

export default function Scheme() {
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchSchemeDetails = useCallback(async () => {
    try {
      const token = Cookies.get('citizenToken');
      const response = await axios.get(`${config.url}/citizen/viewscheme/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setScheme(response.data);
    } catch (error) {
      console.error('Error fetching scheme details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkApplicationStatus = useCallback(async () => {
    try {
      const token = Cookies.get('citizenToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const citizenId = payload.id;
        const response = await axios.get(`${config.url}/citizen/checkApplication/${id}/${citizenId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setHasApplied(response.data);
      }
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchSchemeDetails();
    checkApplicationStatus();
  }, [fetchSchemeDetails, checkApplicationStatus]);

  const handleApply = async () => {
    try {
      const token = Cookies.get('citizenToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const citizenId = payload.id;
        await axios.post(`${config.url}/citizen/applyScheme/${id}/${citizenId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setHasApplied(true);
      }
    } catch (error) {
      console.error('Error applying to scheme:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="scheme-details-container">
      {scheme && (
        <>
          <div className="scheme-details-header">
            <h1>{scheme.name}</h1>
            <div className="deadline-info">
              Application Deadline: {new Date(scheme.deadline).toLocaleDateString()}
            </div>
          </div>

          <div className="scheme-details-content">
            <section className="details-section">
              <h2>Description</h2>
              <p>{scheme.description}</p>
            </section>

            <section className="details-section">
              <h2>Eligibility Criteria</h2>
              <ul>
                {scheme.eligibilityCriteria.split(',').map((criteria, index) => (
                  <li key={index}>{criteria.trim()}</li>
                ))}
              </ul>
            </section>

            <section className="details-section">
              <h2>Benefits</h2>
              <ul>
                {scheme.benefits.split(',').map((benefit, index) => (
                  <li key={index}>{benefit.trim()}</li>
                ))}
              </ul>
            </section>

            <div className="application-section">
              {hasApplied ? (
                <div className="already-applied">
                  You have already applied for this scheme
                </div>
              ) : (
                <button 
                  className="apply-button"
                  onClick={handleApply}
                  disabled={new Date(scheme.deadline) < new Date()}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}