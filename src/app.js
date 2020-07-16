require('dotenv').config();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {ExtractJwt as ExtractJwt} from 'passport-jwt';
import bcrypt from 'bcrypt';
import indexRouter from './routes/index';
import User from './models/user';
import customMdw from './middleware/custom';
import mercadopago from 'mercadopago';


//Config Mongoose
const connection = mongoose.connection;
const mongoURI = process.env.DATABASE;
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      //return;
      console.log(err.message)
    }
  }
);

// Once the connection to the base is established
// data, print a message to the console.

connection.once(`open`, () => {
  console.log(`Database connected with ${process.env.DATABASE}`);
});

//init
const app = express();

/** config de estrategy local de passport ******/
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  session: false
}, (email, password, done)=>{
  User.findOne({email:email})
  .then(data=>{
      if(data === null) return done(null, false); //el usuario no existe
      else if(!bcrypt.compareSync(password, data.password)) { return done(null, false); } //no coincide la password
      return done(null, data); //login ok
  })
  .catch(err=>done(err, null)) // error en DB
}));

/** config estrategy jwt de passport ******/
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({ _id: jwt_payload.sub })
    .then(data => {
      if (data === null) { //user does not exist
        //we could register the user
        return done(null, false);
      }
      /* we found the user so we proceed to return it for
      inject it into req.user of the current request */
      else
        return done(null, data);
    })
    .catch(err => done(err, null)) //error
}));

/** config estrategy facebook de passport ******/
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "https://actiar-be.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    User.findOne({email: profile.emails[0].value}, function(err, user){
      if(err)
        return done(err);
      if(user){
        user.name = profile.name.givenName;
        user.lastname= profile.name.familyName;
        user.save(function(err){
          if(err)
            throw err;
          return done(null, user);
        })
      }else {
        var newUser = new User();
        newUser.email = profile.emails[0].value;
        newUser.name = profile.name.givenName;
        newUser.lastname= profile.name.familyName;
        newUser.save(function(err){
          if(err)
            throw err;
          return done(null, newUser);
        })
      }
    });
  });
}
));

//configure mercado pago
mercadopago.configure({
  access_token:  process.env.ACCESS_TOKEN
});


//we connect all third party middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


//conect with routers
app.use('/', indexRouter);


//middleware para manejar errores
app.use(customMdw.errorHandler);
app.use(customMdw.notFoundHandler);

export default app;
