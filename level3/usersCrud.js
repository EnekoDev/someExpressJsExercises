import express from "express";
import { connect } from "./connection";

const response = {
    success: (res, data) => { res.status(200).json({ data: data }) },
    badReq: (res) => { res.status(400).json({ error: "The ID must be a positive number" }) },
    notFound: (res) => { res.status(404).json({ error: "The element does not exist" }) },
    serverError: (res, err) => { res.status(500).json({ error: "Server error: " + err }) },    
}

const con = await connect();
const usersRouter = express.Router();

usersRouter.get("/users", async (req, res) => {
    try {
        const users = await con.collection("users").find().toArray();
        return response.success(res, users);
    } catch (err) {
        return response.serverError(res, err);
    }
});

usersRouter.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        
        if (!Number.isInteger(numId) || numId < 1) {
            return response.badReq(res);
        }

        const user = await con.collection("users").findOne({ id:id });

        return response.success(res, user);
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { usersRouter };