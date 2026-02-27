const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => {
    console.log(req.method, req.url);
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    console.log(req.method, req.url);
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    console.log(req.method, req.url);
    res.send('Contact Page');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});