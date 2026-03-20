import express from "express";
import { connect } from "../libs/connection.js";
import { response } from "../libs/responses.js";
import { authMiddleware } from "../middleware/auth.js";

const con = await connect();
const db = con.collection("user");
const usersRouter = express.Router();

usersRouter.get("/users", authMiddleware, async (req, res) => {
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

        const updateFields = {};
        if (name) updateFields.name = name;
        if (role) updateFields.role = role;

        const update = await db.updateOne({ userId:numId }, {
            $set: updateFields
        });

        return response.success(res, "Update completed");
    } catch (err) {
        return response.serverError(res, err);
    }
});

usersRouter.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!Number.isInteger(numId) || numId < 1) return response.badReq(res);

        const result = await db.deleteOne({ userId:numId });

        if (result.deleteCount !== 1) {
            return response.failed(res, result);
        }
        return response.success(res, result);
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { usersRouter };