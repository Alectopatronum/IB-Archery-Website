const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {       //JSON Schema for Events Database
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    category: String,
    discipline: String,     
    wapCertified: { type: Boolean, default: false }, 
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        discipline: String,
        score: { type: Number, default: null }
    }
    ],
});

module.exports = mongoose.model('Event', eventSchema);