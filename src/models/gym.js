import mongoose from 'mongoose';

const gymSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        type: String
    },
    phone: {
        type: Number
        
    },
    atention: {
        type: String
    },
    size: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    activities: [{
        type: mongoose.Schema.ObjectId,
        ref: "activity",
      }],
    turns: [{
        type: mongoose.Schema.ObjectId,
        ref: "turn",
      }],
    
})
const gym = mongoose.model('gym', gymSchema);

export default gym;