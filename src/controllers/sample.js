import Users from '../models/user';

const controller = {
    unprotected: (req,res)=>{
        res.send("Ok. ruta sin proteger");
    },
    protected: async (req,res)=>{
        const user = await Users.findById(req.user._id).select('-password');
        res.json({ user });
      
    },

}

export default controller;