import { Router } from "express";

// CONTROLLERS
import { search } from "../../controllers/maps/index.js";

// MIDDLEWARE
import authenticateMiddleware from "../../middleware/authentication.js";

const router = Router();

/*
@route: /map/search
@desc: Get location details from a search string
@Method: GET
@access: Private

 */
router.get("/search", authenticateMiddleware, search);

export default router;
