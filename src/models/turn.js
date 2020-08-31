import mongoose from 'mongoose';

const turnSchema = mongoose.Schema({
    workoutTime: {
        type: String
    },
    days: [{
        type: mongoose.Schema.ObjectId,
        ref: "day",
      }],
    active: {
        type: Boolean,
        default: true
    }
    
})
const turn = mongoose.model('turn', turnSchema);

export default turn;