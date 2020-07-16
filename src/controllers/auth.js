import User from "../models/user";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import error_types from "./error_types";


const controller = {
  register: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        //if the user exists
        throw new error_types.InfoError("user already exists");
      } else {
        //if the user does not exist it is created / registered
        if (req.body.password.length < 8) {
          throw new error_types.InfoError(
            "the password must be at least 8 characters"
          );
        } else {
          var hash = bcrypt.hashSync(
            req.body.password,
            parseInt(process.env.BCRYPT_ROUNDS)
          );
          let newUser = new User();
          newUser.email = req.body.email || "";
          newUser.password = hash;
          newUser.name = req.body.name;
          newUser.lastname = req.body.lastname;
          newUser.phone= req.body.phone;
          newUser.dni = req.body.dni;
          newUser.save();
        }
      }
      res.json({ message: "User registered" });
    } catch (err) {
      next(err);
    }
  },
  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user) => {
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
