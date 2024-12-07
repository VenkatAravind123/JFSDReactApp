import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import config from '../main/config';

export default function Politician() {
  const [politician,setPolitician] = useState(null);
  const { id } = useParams();

  const fetchPolitician = async () => 
    {
      if (id) 
     { 
        try 
        {
          const response = await axios.get(`${config.url}/admin/displaypoliticianbyid?id=${id}`);
          setPolitician(response.data);
        } 
        catch (error) 
        {
          console.error(error.message);
        }
      }
    }
  useEffect(() => {
      fetchPolitician();
  }, [id])
  
  return (
    politician ? (
      <div className='profile-card'>
        <p><strong>ID:</strong> {politician.id}</p>
        <p><strong>Name:</strong> {politician.name}</p>
        <p><strong>Gender:</strong> {politician.gender}</p>
        <p><strong>Date Of Birth:</strong> {politician.dateofbirth}</p>
        <p><strong>Email:</strong> {politician.email}</p>
        <p><strong>Category:</strong> {politician.category}</p>
        <p><strong>Party Name:</strong> {politician.party}</p>
        <p><strong>Constituency:</strong> {politician.constituency}</p>
      </div>
    ) : (
      <p style={{ color: "red", fontWeight: "bolder" }}>Citizen Data Not Found</p>
    )
  );
}
