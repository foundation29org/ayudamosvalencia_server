'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { conndbaccounts } = require('../db_connect')

const needSchema = new Schema({
  needs: {
    type: [String],
    required: false
  },
  otherNeeds: {
    type: String,
    required: false
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    default: 'new'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Esto añadirá automáticamente createdAt y updatedAt
});

module.exports = conndbaccounts.model('Need', needSchema);

