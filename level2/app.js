import express from 'express'
import { router } from './todos.js';

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((req, res, next) => {
//     const key = req.query.apiKey;
//     if (!key || key !== "12345") {
//         return res.status(403).json({
//             Error: "Forbiden"
//         });
//     }
//     req.requestTime = Date.now();
//     next();
// });

app.use(router);

app.get("/", (req, res) => {
    const time = req.requestTime;
    res.json({
        timestamp: time
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});