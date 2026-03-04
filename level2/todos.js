const fs = require("node:fs/promises")
const express = require("express");
const app = express();

const FILE = "./todos.json";

export async function getTodos() {
    const data = await readJson(FILE);
    app.get("/todos", (req, res) => {
        res.json(data);
    });
}

export async function getSingleTodo() {
    const data = await readJson(FILE);
    app.get("/todos/:id", (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                error:"ID is required"
            });
            return;
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                res.json(data[i]);
                return;
            }
        }
    });
}

async function readJson(file) {
    const rawJson = await fs.readFile(file, { encoding: "utf-8" });
    return JSON.parse(rawJson);
}