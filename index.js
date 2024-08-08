const express = require('express');
const axios = require('axios');

const app = express();

// Example data (you can replace this with your own logic to fetch quotes)
const quotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
    { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The best way to predict your future is to create it.", author: "Peter Drucker" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
    { quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { quote: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "If you want to achieve greatness stop asking for permission.", author: "Unknown" },
    { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { quote: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream it. Wish it. Do it.", author: "Unknown" },
    { quote: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
    { quote: "The harder you work, the more luck you will have.", author: "Unknown" },
    { quote: "Dream bigger. Do bigger.", author: "Unknown" },
    { quote: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
    { quote: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { quote: "Do what you love, love what you do.", author: "Unknown" },
    { quote: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", author: "Unknown" },
    { quote: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
    { quote: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { quote: "Dream it. Believe it. Build it.", author: "Unknown" },
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream it. Believe it. Chase it.", author: "Unknown" },
    { quote: "Success is what happens after you have survived all your mistakes.", author: "Unknown" },
    { quote: "Inhale confidence. Exhale doubt.", author: "Unknown" },
    { quote: "Little things make big days. Great days come from hard work and perseverance.", author: "Unknown" },
    { quote: "Don’t wait for opportunity. Create it.", author: "Unknown" },
    { quote: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
    { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
    { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { quote: "Success is not just about what you accomplish in your life, it’s about what you inspire others to do.", author: "Unknown" },
    { quote: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { quote: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { quote: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { quote: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
    { quote: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
    { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream it. Believe it. Build it.", author: "Unknown" },
    { quote: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
    { quote: "The harder you work, the more luck you will have.", author: "Unknown" },
    { quote: "Dream bigger. Do bigger.", author: "Unknown" },
    { quote: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
    { quote: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { quote: "Do what you love, love what you do.", author: "Unknown" },
    { quote: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", author: "Unknown" },
    { quote: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
    { quote: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { quote: "Dream it. Believe it. Chase it.", author: "Unknown" },
    { quote: "Success is what happens after you have survived all your mistakes.", author: "Unknown" },
    { quote: "Inhale confidence. Exhale doubt.", author: "Unknown" },
    { quote: "Little things make big days. Great days come from hard work and perseverance.", author: "Unknown" },
    { quote: "Don’t wait for opportunity. Create it.", author: "Unknown" },
    { quote: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
    { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
    { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { quote: "Success is not just about what you accomplish in your life, it’s about what you inspire others to do.", author: "Unknown" },
    { quote: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { quote: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { quote: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
    { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { quote: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
    { quote: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" }
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
