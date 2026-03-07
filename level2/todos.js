const express = require("express");
const router = express.Router();
const fs = require("node:fs/promises")
const path = require('path');

const FILE = path.join(__dirname, "./todos.json");

async function readJson(file) {
    try {
        const rawJson = await fs.readFile(file, { encoding: "utf-8" });
        return JSON.parse(rawJson);
    } catch (err) {
        if (err.code === "ENOENT") throw new Error("File not found");
        throw new Error("Error reading the file");
    }
}

async function writeJson(file, data) {
    try {
        const parsed = JSON.stringify(data);
        await fs.writeFile(file, parsed, { encoding: "utf-8" });
    } catch (err) {
        if (err.code === "ENOENT") throw new Error("File not found");
        throw new Error("Error reading the file");
    }
}

router.get("/todos", async (req, res) => {
    try {
        const data = await readJson(FILE);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            error:err.message
        });
    }
});

router.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                error:"ID is required"
            });
            return;
        }
        const numId = Number(id);
        if (!Number.isInteger(numId) || numId < 1) {
            return res.status(400).json({
                error: "Only positive numbers allowed"
            });
        }
        const data = await readJson(FILE);
        const todo = data.find(item => item.id === Number(id));
        if (!todo) {
            res.status(404).json({
                error: "Element not found"
            });
            return;
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({
            error:err.message
        });
    }
});

router.post("/todos", async (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title) {
            res.status(400).json({
                error:"Title is required"
            });
        }
        if (!completed) {
            res.status(400).json({
                error:"Completed is required"
            });
        }

        

        res.json(data);
    } catch (err) {
        res.status(500).json({
            error:err.message
        });
    }
});

module.exports = router;