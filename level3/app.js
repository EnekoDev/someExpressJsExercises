import express from "express";
import { connect } from "./libs/connection.js";
import { usersRouter } from "./routes/usersCrud.js";
import { response } from "./libs/responses.js";

const app = express();
const port = process.env.PORT;
async () => await connect();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(usersRouter);

app.get("/", async (req, res) => {
    try {
        return response.success(res, "Running");
    } catch (err) {
        return response.serverError(res, err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});