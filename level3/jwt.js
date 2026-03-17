import { express } from 'express';
import { connect } from './connection.js';
import { response } from "./responses.js";

const con = await connect();
const db = con.collection('token');
const jwtRouter = express.Router();

jwtRouter.get("/register", async (req, res) => {
    const { user, password } = req.body;
    if (!user) return response.badReq(res, "user");
    if (!password) return response.badReq(res, "password");

    
});

export { jwtRouter };