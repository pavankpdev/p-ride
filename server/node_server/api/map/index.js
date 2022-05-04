import { Router } from "express";

// CONTROLLERS
import { search } from "../../controllers/maps/index.js";

// MIDDLEWARE
import authenticateMiddleware from "../../middleware/authentication.js";

const router = Router();

/*
@route: /map/search/:query
@desc: Get location details from a search string
@Method: GET

 */
router.get("/search/:query", search);

export default router;
