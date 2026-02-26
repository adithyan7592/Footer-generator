const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  footerColor: { type: String, default: 'rgba(0,0,0,0.85)' } 
});

module.exports = mongoose.model('Client', clientSchema);