import {Router} from "express";
import{getride}from "../../controllers/ride/get ride.js"
import {login, register, forgotPassword, resetPassword} from "../../controllers/auth/index.js";

import authenticateMiddleware from "../../middleware/authentication.js";

const router = Router();

router.get("/get-all-rides", authenticateMiddleware,getride);


export default router;