import {Router} from "express";

// CONTROLLERS
import {login, register, forgotPassword, resetPassword} from "../../controllers/auth/index.js";

const router = Router();

/*

@route: /auth/login
@desc: Login route
@Method: POST

 */
router.post("/login", login);


/*

@route: /auth/register
@desc: Register route
@Method: POST

 */
router.post("/register", register);


/*
@route: /auth/forgot-password
@desc: Forgot password route
@Method: POST

 */
router.post("/forgot-password", forgotPassword);


/*
@route: /auth/reset-password
@desc: Reset password route
@Method: POST
@access: Private

 */
router.post("/reset-password", forgotPassword);

export default router;