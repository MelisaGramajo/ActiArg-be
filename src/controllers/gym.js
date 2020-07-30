import Gym from '../models/gym';
import Turn from '../models/turn';
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
            size : req.body.size
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
    addPublicits: async (req, res, next) => {
        try {
            const gym = await Gym.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(gym);
        } catch (err) {
            next(err);
        }
    },
    addTurns: async (req, res, next) => {
        try {
            const gym = await Gym.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(gym);
        } catch (err) {
            next(err);
        }
    },
    addCarousel: async (req, res, next) => {
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
    searchPublicidadByGym: async(req, res, next) => {
        try{
            const gym = await Gym.findById(req.params.id)
            .populate([{ path: 'publicits', select: ['img','title','description'] }])
            .select('publicits');
            res.send(gym);
        } catch (err) {
            next(err);
          }
            
    },
    searchTurnsByGym: async(req, res, next) => {
        try{
            const arrayTurn = await Gym.findById(req.params.id).select('turns');
            console.log("arrayTurn::::",arrayTurn.turns);
            const turns = await Turn.find({ _id:arrayTurn.turns,active:true})
            .populate([{ path: 'days', select: ['day','NameClass','HourClass','PartialPlaces','TotallPlaces','Action','NameBtn','PriceClass'] }]);
            res.send(turns);
        } catch (err) {
            next(err);
          }
            
    },
    searchCarouselByGym: async(req, res, next) => {
        try{
            const gym = await Gym.findById(req.params.id)
            .populate([{ path: 'carousels', select: ['img','isActive'] }])
            .select('carousels');
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
            res.json(gym); 
        } catch (err) {
            next(err);
        }
    }
}

export default controller;