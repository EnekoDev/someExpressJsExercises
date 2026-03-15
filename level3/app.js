import express from "express";
import { connect } from "./connection.js";
import { usersRouter } from "./usersCrud.js";

const app = express();
const port = 3000;
const db = await connect();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(usersRouter);

app.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            status:"running"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});