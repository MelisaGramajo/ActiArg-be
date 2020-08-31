import Carousel from '../models/carousel';


const controller = {
    add: async(req, res, next) => {
       try{
        const newCarousel = new Carousel({
            img : req.body.img,
            isActive : req.body.isActive
        });
       
        const carousel = await newCarousel.save();
        res.json({ data: carousel});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
            const carousel = await Carousel.find();
            res.send(carousel);
        } catch (err) {
            next(err);
          }            
    },
    update: async (req, res, next) => {
        try {
            const carousel = await Carousel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(carousel);
        } catch (err) {
            next(err);
        }
    },
 
}

export default controller;