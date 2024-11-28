const express = require("express")
const app = express()
const port = process.env.PORT||3000

app.listen(port,() => { 
    console.log('Yoo serveur est lancé sur le port ${port}');
});

app.get('/', (req, res) => {
    res.send("bienvenue sur  l'API de MentorHub!");
});

const topics = [
    { id: 1, title: 'Maitriser JS', description: 'blabli ' },
    { id: 2, title: 'Trouver du travail', description: 'blabli' },
    { id: 3, title: 'Devenir Hacker', description: 'Blablu' }
]

//middleware to parse json request
app.use(express.json());

app.post("/topics",(req, res) => {
    const newTopic = req.body;
    topics.push(newTopic);
    res.status(201).send(newTopic);
});