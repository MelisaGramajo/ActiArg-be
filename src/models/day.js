import mongoose from 'mongoose';

const daySchema = mongoose.Schema({
    day: {
        type: Number
    },
    NameClass: {
        type: String
    },
    HourClass: {
        type: String
    },
    PriceClass: {
        type: String
    },
    PartialPlaces: {
        type: Number
    },
    TotallPlaces: {
        type: Number
    },
    Action: {
        type: String
    },
    NameBtn: {
        type: String
    }
   
    
})
const day = mongoose.model('day', daySchema);

export default day;