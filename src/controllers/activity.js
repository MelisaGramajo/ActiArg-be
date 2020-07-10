import Activity from '../models/activity';


const controller = {
    add: async(req, res, next) => {
       try{
        const newActivity = new Activity({
            name : req.body.name,
            description: req.body.description,
            price : req.body.price,
        });
       
        const activity = await newActivity.save();
        res.json({ data: activity});

       } catch (err) {
        next(err);
      }
    },
    search: async(req, res, next) => {
        try{
            const activities = await Activity.find({ active:true });
            res.send(activities);
        } catch (err) {
            next(err);
          }            
    },
    update: async (req, res, next) => {
        try {
            const activity = await Activity.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.send(activity);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const activity = await Activity.findOne({ _id: req.params.id });
            activity.active = false;
            activity.save();
            res.json({ message: "Activity removed" });
        } catch (err) {
            next(err);
        }
    }
}

export default controller;