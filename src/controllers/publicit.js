import Publicit from '../models/publicit';


const controller = {
    add: async(req, res, next) => {
       try{
        const newPublicit = new Publicit({
            img : req.body.img,
            title : req.body.title,
            description: req.body.description
            
        });
       
        const publicit = await newPublicit.save();
        res.json({ data: publicit});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
            const publicit = await Publicit.find();
            res.send(publicit);
        } catch (err) {
            next(err);
          }            
    },
    update: async (req, res, next) => {
        try {
            const publicit = await Publicit.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(publicit);
        } catch (err) {
            next(err);
        }
    },
 
}

export default controller;