const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Define endpoint to fetch posts
app.get('/api/posts', async(req, res) => {
    try {
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
        const data = await posts.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
});

// Define endpoint to fetch specific post by ID as query parameter
app.get('/api/posts/:id', async(req, res) => {
    const postId = req.params.id;
    try {
        const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const data = await post.json();
        res.json(data);
    } catch (error) {
        console.error(`Error fetching post with ID ${postId}:`, error);
        res.status(500).json({ error: 'An error occurred while fetching the post' });
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});