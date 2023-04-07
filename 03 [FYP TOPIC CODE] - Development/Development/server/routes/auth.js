import express from "express"
import * as controllers from "../controllers/auth.js"
import { requireSignin } from "../middlewares/auth.js";
import {requireAdmin} from "../middlewares/admin.js";

const router =  express.Router();

router.get('/',requireSignin,controllers.welcome );
router.post('/pre-register', controllers.preRegister);
router.post('/register', controllers.register);
router.post('/login',controllers.login);
router.post('/forgot-password',controllers.forgotPassword);
router.post('/access-account',controllers.accessAccount);
router.get('/refresh-token',controllers.refreshToken);
router.get('/current-user',requireSignin, controllers.currentUser);
router.get('/getuser/:id',requireSignin, controllers.getUser);
router.get('/profile/:username', controllers.publicProfile);
router.put('/update-password',requireSignin, controllers.updatePassword);
router.put('/update-profile',requireSignin, controllers.updateProfile);
router.get('/users',requireSignin, controllers.users);
router.get('/user-ad-count/:_id',requireAdmin, controllers.userad);
router.put('/banuser/:userId',requireAdmin, controllers.banUser);
router.get('/user/:username',requireAdmin, controllers.user);

export default router;