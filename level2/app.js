const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    const key = req.query.apiKey;
    console.log(key)
    if (!key || key !== "12345") {
        return res.status(403).json({
            Error: "Unauthorized"
        });
    }
    req.requestTime = Date.now();
    next();
})

app.get("/", (req, res) => {
    const time = req.requestTime;
    res.json({
        timestamp: time
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});