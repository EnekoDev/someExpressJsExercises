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

async function readJson(file) {
    const rawJson = await fs.readFile(file, { encoding: "utf-8" });
    return JSON.parse(rawJson);
}