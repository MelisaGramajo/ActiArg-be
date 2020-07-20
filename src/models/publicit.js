import mongoose from 'mongoose';

const publicitSchema = mongoose.Schema({
    img: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
    
})
const publicit = mongoose.model('publicit', publicitSchema);

export default publicit;