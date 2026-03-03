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


app.get('/users/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({
            error: "ID is required"
        });
    }
    res.send(`User ID is: ${id}`);
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    if (!postId) {
        return res.status(404).json({
            error: "Post ID is required"
        });
    }
    if (!commentId) {
        return res.status(404).json({
            error: "Comment ID is required"
        });
    }
    res.send(`Comment ${commentId} in post ${postId}`);
});

app.get('/search', (req, res) => {
    const { term, limit } = req.query;
    res.json({
        term: term,
        limit: limit
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});