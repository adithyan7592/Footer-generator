import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PosterGenerator from './components/PosterGenerator';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    // Fetch all 40+ clients from your backend
    axios.get('https://footer-generator.onrender.com/api/clients')
      .then(res => {
        setClients(res.data);
        if (res.data.length > 0) {
          setSelectedClient(res.data[0]); //Default to the first client
        }
      })
      .catch(err => console.error("Error fetching clients:", err));
  }, []);

  if (clients.length === 0) return <div className="container">Loading Clients from Atlas...</div>;

  return (
    
    <div className="container">
      
      <h1>Footer Generator</h1>
      
      <div className="selector-box">
        <label>Choose Client Profile: </label>
        <select 
          className="client-dropdown"
          onChange={(e) => {
            const client = clients.find(c => c._id === e.target.value);
            setSelectedClient(client);
          }}
        >
          {clients.map(c => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.location})
            </option>
          ))}
        </select>
      </div>

      {selectedClient && (
        <div className="generator-section">
          <div className="client-info">
            <h3>Generating for: {selectedClient.name}</h3>
            <p>Footer will show: {selectedClient.phone} | {selectedClient.location}</p>
          </div>
          <PosterGenerator client={selectedClient} />
        </div>
      )}
    </div>
  );
}

export default App;

