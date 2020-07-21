import express from "express";
var router = express.Router();
import AuthMdw from '../middleware/custom';
import SampleController from '../controllers/sample';
import AuthController from '../controllers/auth';
import GymController from '../controllers/gym';
import ActivityController from '../controllers/activity';
import PublicitController from '../controllers/publicit';
import CarouselController from '../controllers/carousel';
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
router.put('/addPublicittoGym/:id',AuthMdw.ensureAuthenticated, GymController.addPublicits);
router.put('/addTurntoGym/:id',AuthMdw.ensureAuthenticated, GymController.addTurns);
router.put('/addCarouseltoGym/:id',AuthMdw.ensureAuthenticated, GymController.addCarousel);
router.get('/GymsAdmin',AuthMdw.ensureAuthenticated, GymController.search);
router.get('/Gyms', GymController.search);
router.get('/GymbyId/:id', GymController.searchById);
router.get('/GymbyIdAdmin/:id',AuthMdw.ensureAuthenticated, GymController.searchById);
router.get('/ActivityByGymAdmin/:id',AuthMdw.ensureAuthenticated, GymController.searchActivityByGym);
router.get('/ActivityByGym/:id', GymController.searchActivityByGym);
router.get('/PublicitByGym/:id', GymController.searchPublicidadByGym);
router.get('/CarouselByGym/:id', GymController.searchCarouselByGym);
router.get('/TurnByGym/:id', GymController.searchTurnsByGym);
router.put('/updateGym/:id',AuthMdw.ensureAuthenticated, GymController.update);
router.put('/deleteGym/:id',AuthMdw.ensureAuthenticated, GymController.delete);

//Activity
router.post('/addActivity',AuthMdw.ensureAuthenticated, ActivityController.add);
router.get('/Activitys', ActivityController.search);
router.get('/ActivitysAdmin',AuthMdw.ensureAuthenticated, ActivityController.search);
router.put('/updateActivity/:id',AuthMdw.ensureAuthenticated, ActivityController.update);
router.put('/deleteActivity/:id',AuthMdw.ensureAuthenticated, ActivityController.delete);

//Publicit
router.post('/addPublicit',AuthMdw.ensureAuthenticated, PublicitController.add);
router.get('/Publicits', ActivityController.search);
router.get('/PublicitsAdmin',AuthMdw.ensureAuthenticated, PublicitController.search);
router.put('/updatePublicit/:id',AuthMdw.ensureAuthenticated, PublicitController.update);

//Carousel
router.post('/addCarousel',AuthMdw.ensureAuthenticated, CarouselController.add);
router.get('/Carousels', CarouselController.search);
router.get('/CarouselsAdmin',AuthMdw.ensureAuthenticated, CarouselController.search);
router.put('/updateCarousel/:id',AuthMdw.ensureAuthenticated, CarouselController.update);

//Turn
router.post('/addTurn',AuthMdw.ensureAuthenticated, TurnController.add);
router.get('/Turns',AuthMdw.ensureAuthenticated, TurnController.search);
router.get('/TurnbyId/:idDay',AuthMdw.ensureAuthenticated, TurnController.searchById);
router.post('/reserveTurn/:idDay', TurnController.reserve);
router.put('/deleteTurn/:id',AuthMdw.ensureAuthenticated, TurnController.delete);

//Mercado Pago
router.get('/mercadoPago',AuthMdw.ensureAuthenticated, PaymentController.payment);

//Send Mail
router.get('/send', MailController.send);

//Day
router.post('/addDay',AuthMdw.ensureAuthenticated, DayController.add);
router.get('/Days', DayController.search);
export default router;
