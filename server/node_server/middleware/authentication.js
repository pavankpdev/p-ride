import jwt from "jsonwebtoken";

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.body.userId = user?.user;

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateMiddleware;