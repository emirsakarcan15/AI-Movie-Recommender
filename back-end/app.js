const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');


dotenv.config();

app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
}));

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/recommend', async (req, res) => {
    const { input } = req.body;

    const prompt = ""

    const result = await model.generateContent(prompt)
    const text = result.response.text();

    const cleanText = text.replace(/```json|```/g, '').trim();

    const data = JSON.parse(cleanText);

    res.json(data);
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