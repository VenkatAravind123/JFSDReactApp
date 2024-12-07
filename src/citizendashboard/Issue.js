import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SideBar.css';
import config from './../main/config';


export default function Issue() {
  const [issue, setIssues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`${config.url}/citizen/displayissuebyid?id=${id}`);
          setIssues(response.data);
        } catch (error) {
          setError('Failed to fetch issue details');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="issue-container">
        <div className="loading">Loading issue details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="issue-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="issue-container">
      {issue ? (
        <div className="issue-details">
          <div className="issue-header">
            <h1>Issue Details</h1>
            <span className="issue-status">{issue.status}</span>
          </div>
          
          <div className="issue-image">
            <img src={issue.image_url} alt="Issue" />
          </div>

          <div className="issue-content">
            <div className="info-group">
              <label>Description</label>
              <p>{issue.description}</p>
            </div>

            <div className="info-group">
              <label>Constituency</label>
              <p>{issue.constituency}</p>
            </div>

            <div className="info-group">
              <label>Reported By</label>
              <p>{issue.citizen?.name}</p>
            </div>

            <div className="info-group">
              <label>Status</label>
              <p className={`status-${issue.status?.toLowerCase()}`}>
                {issue.status}
              </p>
            </div>

            {issue.politician && (
              <div className="info-group">
                <label>Assigned To</label>
                <p>{issue.politician.name}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-data">No issue found</div>
      )}
    </div>
  );
}