import Gym from '../models/gym';
import error_types from "./error_types";

const controller = {
    add: async(req, res, next) => {
       try{
        const newGym = new Gym({
            name : req.body.name,
            description: req.body.description,
            address : req.body.address,
            photo : req.body.photo,
            phone : req.body.phone,
            atention : req.body.atention,
            size : req.body.size,
            turns : req.body.turns

        });
       
        const gym = await newGym.save();
        res.json({ data: gym});

       } catch (err) {
        next(err);
      }
    },
    addActivity: async (req, res, next) => {
        try {
            const gym = await Gym.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(gym);
        } catch (err) {
            next(err);
        }
    },
    searchById: async(req, res, next) => {
        try{
            const gym = await Gym.findById(req.params.id);
            if(gym.active === false){
                throw new error_types.InfoError(
                    "Gym not found"
                  );
            }else{
                res.send(gym);
            }
           
        } catch (err) {
            next(err);
          }
            
    },
    searchActivityByGym: async(req, res, next) => {
        try{
            const gym = await Gym.findById(req.params.id)
            .populate([{ path: 'activities', select: ['name','description'] }])
            .select('activities');
            res.send(gym);
        } catch (err) {
            next(err);
          }
            
    },
    search: async(req, res, next) => {
        try{
            const gyms = await Gym.find({ active:true });
            res.send(gyms);
        } catch (err) {
            next(err);
          }            
    },
    update: async (req, res, next) => {
        try {
            const gym = await Gym.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(gym);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const gym = await Gym.findOne({ _id: req.params.id });
            gym.active = false;
            gym.save();
            res.json({ message: "Gym removed" });
        } catch (err) {
            next(err);
        }
    }
}

export default controller;