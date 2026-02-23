const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Client = require('./models/client');

const app = express();

//  MIDDLEWARE 
app.use(cors()); //Allows Vite (5173) to talk to Express (5000)
app.use(express.json());

//  MONGODB CONNECTION 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Cloud'))
  .catch(err => {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  });

//API ROUTES 

//1.GET ALL CLIENTS (To see the list and copy IDs)
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2.GET SINGLE CLIENT (Used by Frontend App.jsx)
app.get('/api/client/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format" });
  }
});

//3.ADD NEW CLIENT (Use this to add your 40 users)
app.post('/api/clients/add', async (req, res) => {
  try {
    const { name, phone, location, footerColor } = req.body;
    const newClient = new Client({ name, phone, location, footerColor });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});   

