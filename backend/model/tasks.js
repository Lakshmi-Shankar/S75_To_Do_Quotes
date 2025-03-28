const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }, // Optional
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    dueDate: { type: Date }, // Optional
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
