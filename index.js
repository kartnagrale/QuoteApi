const express = require('express');
const axios = require('axios');

const app = express();

// Example data (you can replace this with your own logic to fetch quotes)
const quotes = [
    { quote: "Example quote 1", author: "Author 1" },
    { quote: "Example quote 2", author: "Author 2" },
    { quote: "Example quote 3", author: "Author 3" }
];

// Endpoint to get a random quote
app.get('/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json({
        quote: randomQuote.quote,
        author: randomQuote.author
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
