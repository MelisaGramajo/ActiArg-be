import Turn from '../models/turn';
import Day from '../models/day';
import error_types from "./error_types";
import mercadopago from 'mercadopago';

const controller = {
    add: async(req, res, next) => {
       try{
        const newTurn = new Turn({
            workoutTime : req.body.workoutTime,
            days: req.body.days
        });
        const turn = await newTurn.save();
        res.json({ data: turn});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
         const turns = await Turn.find({ active:true })
         .populate([{ path: 'days', select: ['day','NameClass','HourClass','PartialPlaces','TotallPlaces','Action','NameBtn'] }]);
            res.send(turns);
        } catch (err) {
            next(err);
          }            
    },
    searchById: async(req, res, next) => {
        try{
            const turn = await Turn.find({_id:req.params.id, days: req.params.idDay})
            .populate([{ path: 'days', select: ['day','NameClass','HourClass','PartialPlaces','TotallPlaces','Action','NameBtn'] }]);
            console.log("turn:::", turn);
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
            const day= await Day.find({_id:id_day});
            if(day.PartialPlaces >= day.TotallPlaces){
                throw new error_types.InfoError(
                    "No hay cupo disponible para el turno"
                  );
                }else{
                    let preference = {
                        items: [
                            {
                                title: day.nameClass,
                                unit_price: 200.00,
                                quantity: 1,
                                
                            }
                        ]
                    };
                
                    mercadopago.preferences.create(preference)
                        .then(function (response) {
                            days.PartialPlaces= days.PartialPlaces+1;
                            // Este valor reemplazará el string "$$init_point$$" en tu HTML
                            res.send({message: "Se realizó la reserva de manera exitosa"});
                        }).catch(function (err) {
                            next(err);
                        });
                }
            
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