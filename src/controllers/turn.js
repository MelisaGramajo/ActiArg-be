import Turn from '../models/turn';
import Day from '../models/day';
import error_types from "./error_types";
import mercadopago from 'mercadopago';

const controller = {
    add: async (req, res, next) => {
        try {
            const newTurn = new Turn({
                workoutTime: req.body.workoutTime,
                days: req.body.days,
            });
            const turn = await newTurn.save();
            res.json({ data: turn });

        } catch (err) {
            next(err);
        }
    },
    search: async (req, res, next) => {
        try {
            const turns = await Turn.find({ active: true })
                .populate([{ path: 'days', select: ['day', 'NameClass', 'HourClass', 'PartialPlaces', 'TotallPlaces', 'Action', 'NameBtn', 'PriceClass'] }]);
            res.send(turns);
        } catch (err) {
            next(err);
        }
    },
    searchById: async (req, res, next) => {
        try {
            const day = await Day.find({ _id: req.params.idDay });
            res.send(day);
        } catch (err) {
            next(err);
        }

    },
    reserve: async (req, res, next) => {
        try {
            const day = await Day.findById(req.params.idDay);
            if (day.PartialPlaces >= day.TotallPlaces) {
                throw new error_types.InfoError(
                    "No hay cupo disponible para el turno"
                );
            } else{
                if (day.users.includes(req.user._id)) {
                    throw new error_types.InfoError(
                        "Ya reservaste turno para esta clase");
                } else {
                day.PartialPlaces = day.PartialPlaces + 1;
                    day.users.push(req.user._id);
                    day.save();
                    console.log("dayyy:::",day);
                    let preference = {
                        items: [
                            {
                                title: req.query.title,
                                unit_price: 200.00,
                                quantity: 1,
    
                            }
                        ],
                        back_urls: {
                            success: "https://actiar.herokuapp.com/GymProfile/" + req.params.idGym,
                        },
                        auto_return: "approved",
                    };
                    console.log("preference", preference);
                    mercadopago.preferences.create(preference)
                        .then(function (response) {
                            // Este valor reemplazará el string "$$init_point$$" en tu HTML
                            res.send({ init_point: response.body.init_point });
                        }).catch(function (err) {
                            next(err);
                        });
            } }

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