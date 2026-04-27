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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/recommend', async (req, res) => {
    const { input } = req.body;

    const prompt = `
You are an experienced film critic and expert.
Your job is to analyze the user's natural language film request and recommend the most suitable films.

User's request: "${input}"

Your task:
- Carefully analyze the user's request and extract criteria (genre, duration, actor, year, mood, etc.)
- Recommend 3 films that best match these criteria
- If no perfect match exists, suggest the closest alternatives
- Explain why each film is recommended based on the user's criteria

IMPORTANT: Respond ONLY with the following JSON format, nothing else.

{
  "understood_criteria": {
    "genre": "action",
    "max_duration_minutes": 120,
    "actor": "Brad Pitt",
    "other": []
  },
  "films": [
    {
      "title": "Film Title",
      "year": 2020,
      "duration_minutes": 110,
      "imdb_rating": 8.5,
      "director": "Director Name",
      "cast": ["Actor 1", "Actor 2"],
      "description": "A compelling 2-3 sentence description of the film",
      "why_recommended": "Explain which of the user's criteria this film satisfies"
    }
  ],
  "note": "If not all criteria could be met, explain here. Otherwise leave empty."
}
`;

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