import { readJson, writeJson } from "./files.js";
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE = path.join(__dirname, "./todos.json");

const response = {
    badReq: (res) => res.status(400).json({ error: "The ID must be a positive number" }),
    notFound: (res) => res.status(404).json({ error: "Element not found" }),
    serverError: (res, err) => res.status(500).json({ error: err.message }),
    success: (res, data) => res.status(200).json({ data }),
}

function checkPositiveInteger(num, res) {
    if (!Number.isInteger(num) || num < 1) {
        response.badReq(res);
        return false;
    }
    return true;
}

router.get("/todos", async (req, res) => {
    try {
        const data = await readJson(FILE);
        return response.success(res, data);
    } catch (err) {
        return response.serverError(res, err);
    }
});

router.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!checkPositiveInteger(numId, res)) return;
        const data = await readJson(FILE);
        const todo = data.find(item => item.id === numId);
        if (!todo) {
            return response.notFound(res);
        }
        return response.success(res, todo);
    } catch (err) {
        return response.serverError(res, err);
    }
});

router.post("/todos", async (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title) {
            return res.status(400).json({
                error:"Title is required"
            });
        }
        if (completed === undefined) {
            return response.notFound(res);
        }

        const data = readJson(FILE);
        const id = data.length + 1;
        data.push({id:id, title:title, completed:completed});
        writeJson(FILE, data);
        return response.success(res, data)
    } catch (err) {
        return response.serverError(res, err);
    }
});

router.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!checkPositiveInteger(numId, res)) return;

        const { title, completed } = req.body;

        const data = readJson(FILE);
        const todo = data.find(item => item.id === numId);
        if (!todo) {
            return response.notFound(res);
        }
        if (title !== undefined) {
            todo.title = title;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }
        writeJson(FILE, data);
        return response.success(res, data);
    } catch (err) {
        return response.serverError(res, err);
    }
});

router.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const numId = Number(id);
        if (!checkPositiveInteger(numId, res)) return;
        
        const data = await readJson(FILE);
        const todo = data.find(item => item.id === numId);
        if (!todo) {
            return response.notFound(res);
        }

        const index = data.indexOf(todo);
        data.splice(index, 1);
        
        return response.success(res, data);
    } catch (err) {
        return response.serverError(res, err);
    }
});

export { router };