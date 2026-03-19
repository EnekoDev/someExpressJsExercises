import { express } from 'express';
import { connect } from './connection.js';
import { response } from "./responses.js";
import { checkPass, hashPass } from './encrypt.js';

const con = await connect();
const db = con.collection('token');
const jwtRouter = express.Router();

jwtRouter.get("/register", async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user) return response.badReq(res, "user");
        if (!password) return response.badReq(res, "password");
        
        const hashedPass = await hashPass(password);

        const register = await db.insertOne({
            user: user,
            password: hashedPass
        });

        return response.success(res, register);
    } catch (err) {
        return response.serverError(res, err);
    }
});

jwtRouter.get("/login", async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user) return response.badReq(res, "user");
        if (!password) return response.badReq(res, "password");

        const dbUser = db.findOne({ user: user });
        if (!dbUser) return response.notFound(res);

        const match = checkPass(password, dbUser.password);
        if (!match) return response.failed(res, "Passwords don't match");
        return response.success(res, "Login successful");
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { jwtRouter };