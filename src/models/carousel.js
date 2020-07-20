import mongoose from 'mongoose';

const carouselSchema = mongoose.Schema({
    img: {
        type: String
    },
    isActive: {
        type: String
    }
    
})
const carousel = mongoose.model('carousel', carouselSchema);

export default carousel;