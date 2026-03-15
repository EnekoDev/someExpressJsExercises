import express from "express";
import { connect } from "./connection.js";

const response = {
    success: (res, data) => { res.status(200).json({ data: data }) },
    badReq: (res, field) => { res.status(400).json({ error: `The ${field} is required` }) },
    notFound: (res) => { res.status(404).json({ error: "The element does not exist" }) },
    serverError: (res, err) => { res.status(500).json({ error: "Server error: " + err }) },    
}

const con = await connect();
const db = con.collection("user");
const usersRouter = express.Router();

usersRouter.get("/users", async (req, res) => {
    try {
        const users = await db.find().toArray();
        return response.success(res, users);
    } catch (err) {
        return response.serverError(res, err);
    }
});

usersRouter.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!Number.isInteger(numId) || numId < 1) return response.badReq(res);

        const user = await db.findOne({ userId:numId });

        return response.success(res, user);
    } catch (err) {
        return response.serverError(res, err);
    }
});

usersRouter.post("/users", async (req, res) => {
    try {
        const { name, role } = req.body;
        
        if (!name) return response.badReq(res, "name");
        if (!role) return response.badReq(res, "role");
        
        const users = await db.find().toArray();
        const length = users.length + 1;
        
        const newUser = await db.insertOne({
            userId: length,
            name: name,
            role: role
        });
        
        return response.success(res, newUser);
    } catch (err) {
        return response.serverError(res, err);
    }
});

usersRouter.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!Number.isInteger(numId) || numId < 1) return response.badReq(res);

        const { name, role } = req.body;

        const user = db.findOne({ userId:numId });

        if (name) user.name = name;
        if (role) user.role = role;

        const update = db.updateOne({ userId:numId }, {
            userId:numId,
            name:name,
            role:role
        });
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { usersRouter };