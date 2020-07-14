import express from "express";
var router = express.Router();
import AuthMdw from '../middleware/custom';
import SampleController from '../controllers/sample';
import AuthController from '../controllers/auth';
import GymController from '../controllers/gym';
import ActivityController from '../controllers/activity';
import TurnController from '../controllers/turn';
import DayController from '../controllers/day';
import PaymentController from '../controllers/payment';
import MailController from '../controllers/sendMail';
import passport from 'passport';

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Servidor funcionando correctamente" });
});

//Login
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile','email'] }));
router.get('/auth/facebook/callback', AuthController.loginFacebook);
router.get('/protected', AuthMdw.ensureAuthenticated, SampleController.protected);


//Gym
router.post('/addGym',AuthMdw.ensureAuthenticated, GymController.add);
router.put('/addActivitytoGym/:id',AuthMdw.ensureAuthenticated, GymController.addActivity);
router.get('/GymsAdmin',AuthMdw.ensureAuthenticated, GymController.search);
router.get('/Gyms', GymController.search);
router.get('/GymbyId/:id', GymController.searchById);
router.get('/GymbyIdAdmin/:id',AuthMdw.ensureAuthenticated, GymController.searchById);
router.get('/ActivityByGymAdmin/:id',AuthMdw.ensureAuthenticated, GymController.searchActivityByGym);
router.get('/ActivityByGym/:id', GymController.searchActivityByGym);
router.put('/updateGym/:id',AuthMdw.ensureAuthenticated, GymController.update);
router.put('/deleteGym/:id',AuthMdw.ensureAuthenticated, GymController.delete);

//Activity
router.post('/addActivity',AuthMdw.ensureAuthenticated, ActivityController.add);
router.get('/Activitys', ActivityController.search);
router.get('/ActivitysAdmin',AuthMdw.ensureAuthenticated, ActivityController.search);
router.put('/updateActivity/:id',AuthMdw.ensureAuthenticated, ActivityController.update);
router.put('/deleteActivity/:id',AuthMdw.ensureAuthenticated, ActivityController.delete);

//Turn
router.post('/addTurn',AuthMdw.ensureAuthenticated, TurnController.add);
router.get('/Turns',AuthMdw.ensureAuthenticated, TurnController.search);
router.get('/TurnbyId/:id/day/:idDay',AuthMdw.ensureAuthenticated, GymController.searchById);
router.put('/reserveTurn/:id',AuthMdw.ensureAuthenticated, TurnController.reserve);
router.put('/deleteTurn/:id',AuthMdw.ensureAuthenticated, TurnController.delete);

//Mercado Pago
router.get('/mercadoPago',AuthMdw.ensureAuthenticated, PaymentController.payment);

//Send Mail
router.get('/send', MailController.send);

//Day
router.post('/addDay',AuthMdw.ensureAuthenticated, DayController.add);
router.get('/Days', DayController.search);
export default router;
