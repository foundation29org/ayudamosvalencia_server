'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { conndbaccounts } = require('../db_connect')

const needSchema = new Schema({
  needs: {
    type: [String],
    validate: {
      validator: function(needs) {
          const validNeeds = ['electricity', 'water', 'sumwater', 'food', 'alojamiento', 'ropa'];
          return needs.every(need => validNeeds.includes(need));
      },
      message: props => `${props.value} contiene necesidades no válidas`
    },
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

