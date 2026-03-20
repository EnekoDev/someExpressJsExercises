import { jwt } from 'jsonwebtoken';
import { response } from '../libs/responses.js';

export async function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return response.badReq(res, "token");

    try {
        req.user = await jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        response.serverError(res, err);
    }
}