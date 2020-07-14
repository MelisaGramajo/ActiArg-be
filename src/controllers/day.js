import Day from '../models/day';

const controller = {
    add: async(req, res, next) => {
       try{
        const newDay = new Day({
            day : req.body.day,
            NameClass: req.body.NameClass,
            HourClass : req.body.HourClass,
            PartialPlaces : req.body.PartialPlaces,
            TotallPlaces : req.body.TotallPlaces,
            Action : req.body.Action,
            NameBtn : req.body.NameBtn
        });
       
        const day = await newDay.save();
        res.json({ data: day});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
            const days = await Day.find();
            res.send(days);
        } catch (err) {
            next(err);
          }            
    }
}

export default controller;