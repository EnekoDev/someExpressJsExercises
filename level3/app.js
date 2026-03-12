import express from "express";
import { connect } from "./connection.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

const db = await connect();

app.get("/", async (req, res) => {
    try {
        const users = await db.collection("users").find().toArray();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});