const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id', (req, res) => {
    let id = req.params.id ?? 0;
    res.send(`Welcome user ${id}`);
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
    let postId = req.params.postId ?? 0;
    let commentId = postId !== 0 && (req.params.commentId ?? 0) ? req.params.commentId : 0;
    res.send(`Comment ${commentId} in post ${postId}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});