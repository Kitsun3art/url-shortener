const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true, 
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        accessCount: {
            type: Number,
            default: 0
        }

    });
    
    module.exports = mongoose.model('Url', urlSchema);
