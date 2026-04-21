const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
}));

app.use(express.json());

app.get('/recommend', (req, res) => {
    console.log('Received a request at /recommend');
    res.send('Hello World!');
});

const PORT = process.env.PORT 

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();