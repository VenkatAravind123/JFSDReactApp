import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function ViewAllPoliticians() {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchPoliticians = async () => {
    try {
      const response = await axios.get('http://localhost:2021/admin/viewallpoliticians');
      setPoliticians(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch Politicians');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPoliticians();
  }, []);

  const deletePolitician = async (id) => 
    {
            try 
            {
                await axios.delete(`http://localhost:2021/admin/deletepolitician?id=${id}`);
                fetchPoliticians();
            } 
            catch (error) 
            {
                setError(error.message);
            }
    }

    const displayPolitician = async (id) => 
      {
          try 
          {
            navigate(`/displaypolitician/${id}`)
            console.log(id)
          } 
          catch (error) 
          {
            console.error(error.message);
          }
      
      }

  if (loading) {
    return <div className="loading-message">Loading citizens...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="view-citizens-container">
      <h2>All Politicians</h2>
      <p>You cannot delete a Politician without prior investigation.
        Because There are some entities associated with them.
      </p>
      <table className="citizens-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Party</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {politicians.map((politician, index) => (
            <tr key={index}>
              <td>{politician.id}</td>
              <td>{politician.name}</td>
              <td>{politician.email}</td>
              <td>{politician.dateofbirth}</td>
              <td>{politician.gender}</td>
              <td>{politician.category}</td>
              <td>{politician.party}</td>
              <td>
              <button onClick={()=>deletePolitician(politician.id)} className='delete-button' disabled>Remove</button>
              <button className="view-button" style={{ marginLeft: '10px' }} onClick={()=>displayPolitician(politician.id)}>
                  <AiOutlineEye size={18}  /> 
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
