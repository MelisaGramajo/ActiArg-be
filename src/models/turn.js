import mongoose from 'mongoose';

const turnSchema = mongoose.Schema({
    activity: {
        type: mongoose.Schema.ObjectId, ref: "activity"
    },
    date: {
        type: Date
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "user",
      }],
    capaciteTotal: {
        type: Number
    },
    capacitePartial: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    }
    
})
const turn = mongoose.model('turn', turnSchema);

export default turn;