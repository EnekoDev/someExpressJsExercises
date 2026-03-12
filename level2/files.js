import fs from 'node:fs/promises';

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

export { readJson, writeJson };