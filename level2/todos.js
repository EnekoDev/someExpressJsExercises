const express = require("express");
const router = express.Router();
const fs = require("node:fs/promises")
const path = require('path');

const FILE = path.join(__dirname, "./todos.json");

async function readJson(file) {
    const rawJson = await fs.readFile(file, { encoding: "utf-8" });
    return JSON.parse(rawJson);
}

router.get("/todos", async (req, res) => {
    const data = await readJson(FILE);
    res.json(data);
});

router.get("/todos/:id", async (req, res) => {
    const data = await readJson(FILE);
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

module.exports = router;