import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import config from '../main/config';

export default function ViewAllCitizens() {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const navigate = useNavigate();

  const fetchCitizens = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewcitizens`);
      setCitizens(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch citizens');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizens();
  }, []);

  const deleteCitizen = async (id) => 
    {
            try 
            {
                await axios.delete(`${config.url}/admin/deletecitizen?id=${id}`);
                fetchCitizens();
            } 
            catch (error) 
            {
                setError(error.message);
            }
    }


    const displayCitizen = async (id) => 
      {
          try 
          {
            navigate(`/displaycitizen/${id}`)
            console.log(id)
          } 
          catch (error) 
          {
            console.error(error.message);
          }
      
      }

  if (loading) {
    return <div class="loader"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="view-citizens-container">
      <h2>All Citizens</h2>
      <p style={{color:"black"}}>You cannot delete a Citizen without prior investigation. </p>
      Because There are some entities associated with them.
      <table className="citizens-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {citizens.map((citizen, index) => (
            <tr key={index}>
              <td>{citizen.id}</td>
              <td>{citizen.name}</td>
              <td>{citizen.email}</td>  
              <td>{citizen.dateofbirth}</td>
              <td>{citizen.gender}</td>
              <td>
              <button onClick={()=>deleteCitizen(citizen.id)} className='delete-button' disabled>Remove</button> 
              <button className="view-button" style={{ marginLeft: '10px' }} onClick={()=>displayCitizen(citizen.id)}>
                  <AiOutlineEye size={18} /> 
              </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
