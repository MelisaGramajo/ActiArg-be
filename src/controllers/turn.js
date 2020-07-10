import Turn from '../models/turn';
import error_types from "./error_types";

const controller = {
    add: async(req, res, next) => {
       try{
        const newTurn = new Turn({
            activity : req.body.activity,
            users: req.body.users,
            date : req.body.date,
            capaciteTotal : req.body.capaciteTotal,
            capacitePartial: 0
        });
        const turn = await newTurn.save();
        res.json({ data: turn});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
            const turns = await Turn.find({ active:true });
            res.send(turns);
        } catch (err) {
            next(err);
          }            
    },
    searchById: async(req, res, next) => {
        try{
            const turn = await Turn.findById(req.params.id);
            if(turn.active === false){
                throw new error_types.InfoError(
                    "Turn not found"
                  );
            }else{
                res.send(turn);
            }
           
        } catch (err) {
            next(err);
          }
            
    },
    reserve: async (req, res, next) => {
        try {
            const turn = await Turn.findOne({ _id: req.params.id });
            if(turn.capacitePartial >= turn.capaciteTotal){
                throw new error_types.InfoError(
                    "No hay cupo disponible para el turno"
                  );
                }else{
                        turn.capacitePartial= capaciteTotal+1;
                        turn.users.push(req.body.user);
                  }
            res.send(turn);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const turn = await Turn.findOne({ _id: req.params.id });
            turn.active = false;
            turn.save();
            res.json({ message: "Turn removed" });
        } catch (err) {
            next(err);
        }
    }
}

export default controller;