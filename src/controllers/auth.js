import User from "../models/user";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import error_types from "./error_types";

let validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const controller = {
  register: async (req, res, next) => {
    try {
      if(!req.body.email){
        throw new error_types.InfoError("Debe ingresar un email");
      }else{
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          throw new error_types.InfoError("El usuario ya existe");
        } else {
          const test= validateEmail(req.body.email);
          if(test===false){
            throw new error_types.InfoError("Email inválido. Revise formato");
          }else{
            if(req.body.email.length > 30 || req.body.password.length > 30 ){
              throw new error_types.InfoError("No se puede ingresar mas de 30 caracteres");
            }else{
            if (req.body.password.length < 8) {
              throw new error_types.InfoError("La contraseña debe tener al menos 8 caracteres");
            } else {
              var hash = bcrypt.hashSync(
                req.body.password,
                parseInt(process.env.BCRYPT_ROUNDS)
              );
              let newUser = new User();
              newUser.email = req.body.email;
              newUser.password = hash;
              newUser.name = req.body.name;
              newUser.lastname = req.body.lastname;
              newUser.phone= req.body.phone;
              newUser.dni = req.body.dni;
              await newUser.save();
            }
          }
        }}
      }
      res.json({ message: "User registered" });
    } catch (err) {
      next(err);
    }
  },
  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user) => {
      if (error || !user) {
        next(new error_types.Error404("Email o Password incorrectos"));
      } else {
        const payload = {
          sub: user._id,
          exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
          email: user.email,
        };
        const token = jwt.sign(
          JSON.stringify(payload),
          process.env.JWT_SECRET,
          { algorithm: process.env.JWT_ALGORITHM }
        );

         res.json({ data: { token: "Bearer "+token, username: user.name , userlastname: user.lastname, userrole: user.role } });

      }
    })(req, res);
  },
  loginFacebook: (req, res, next) => {
    passport.authenticate("facebook", { session: false }, (error, user) => {
      if (error || !user) {
        next(new error_types.Error404("email or password not correct."));
      } else {
        const payload = {
          sub: user._id,
          exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
          email: user.email,
        };
        const token = jwt.sign(
          JSON.stringify(payload),
          process.env.JWT_SECRET,
          { algorithm: process.env.JWT_ALGORITHM }
        );

        res.json({ data: { token: "Bearer "+token, username: user.name , userlastname: user.lastname, userrole: user.role } });

      }
    })(req, res);
  }

};
export default controller;
