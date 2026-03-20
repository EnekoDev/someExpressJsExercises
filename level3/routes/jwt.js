import express from 'express';
import { jwt } from 'jsonwebtoken';
import { connect } from '../libs/connection.js';
import { response } from "../libs/responses.js";
import { checkPass, hashPass } from '../libs/encrypt.js';

const con = await connect();
const db = con.collection('token');
const jwtRouter = express.Router();

jwtRouter.post("/register", async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user) return response.badReq(res, "user");
        if (!password) return response.badReq(res, "password");

        const hashedPass = await hashPass(password);
        const register = await db.insertOne({ user, password: hashedPass });

        return response.success(res, register);
    } catch (err) {
        return response.serverError(res, err);
    }
    });

    jwtRouter.post("/login", async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user) return response.badReq(res, "user");
        if (!password) return response.badReq(res, "password");

        const dbUser = await db.findOne({ user });
        if (!dbUser) return response.notFound(res);

        const match = await checkPass(password, dbUser.password);
        if (!match) return response.failed(res, "Passwords don't match");

        const token = jwt.sign(
        { id: dbUser._id, user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
        );

        return response.success(res, token);
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { jwtRouter };