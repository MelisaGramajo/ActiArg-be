import mongoose from 'mongoose';
var Float = require('mongoose-float').loadType(mongoose, 4);

const activitySchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Float
    },
    active: {
        type: Boolean,
        default: true
    }
    
})
const activity = mongoose.model('activity', activitySchema);

export default activity;