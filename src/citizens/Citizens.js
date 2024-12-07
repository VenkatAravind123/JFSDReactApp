import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import config from '../main/config';

export default function Citizens() 
{
  const [citizen,setCitizen] = useState(null);
  const { id } = useParams();

  const fetchCitizen = async () => 
    {
      if (id) 
     { 
        try 
        {
          const response = await axios.get(`${config.url}/admin/displaycitizenbyid?id=${id}`);
          setCitizen(response.data);
        } 
        catch (error) 
        {
          console.error(error.message);
        }
      }
    }
  useEffect(() => {
      fetchCitizen();
  }, [id])
  
  return (
    citizen ? (
      <div className='profile-card'>
        <p><strong>ID:</strong> {citizen.id}</p>
        <p><strong>Name:</strong> {citizen.name}</p>
        <p><strong>Gender:</strong> {citizen.gender}</p>
        <p><strong>Date Of Birth:</strong> {citizen.dateofbirth}</p>
        <p><strong>Email:</strong> {citizen.email}</p>
        <p><strong>Aadhaar Number:</strong> {citizen.aadhaarnumber}</p>
        <p><strong>Contact Number:</strong> {citizen.contactnumber}</p>
      </div>
    ) : (
      <p style={{ color: "red", fontWeight: "bolder" }}>Citizen Data Not Found</p>
    )
  );
}
