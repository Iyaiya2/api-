const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Yoo serveur est lancé sur le port ${port}`);
});

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de Hackathon Web!");
});


app.use(express.json());


let events = [
    { id: 1, title: 'Hackathon React', description: 'Apprendre React en 48h', date: '2024-12-05', user_id: 1 },
    { id: 2, title: 'Hackathon Node.js', description: 'Créer une API avec Node.js', date: '2024-12-10', user_id: 2 }
];

let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];


app.post("/events", (req, res) => {
    const newEvent = req.body;
    newEvent.id = events.length + 1; // Générer un nouvel ID
    events.push(newEvent);
    res.status(201).send(newEvent);
});


app.get("/events", (req, res) => {
    res.status(200).json(events);
});


app.get("/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find((e) => e.id === eventId);
    if (!event) {
        res.status(404).json({ error: 'Événement non trouvé' });
    } else {
        res.status(200).json(event);
    }
});

app.put("/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex((e) => e.id === eventId);
    if (eventIndex === -1) {
        res.status(404).json({ error: 'Événement non trouvé' });
    } else {
        events[eventIndex] = { ...events[eventIndex], ...req.body }; // Mise à jour avec les nouvelles données
        res.status(200).json(events[eventIndex]);
    }
});


app.delete("/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    events = events.filter((e) => e.id !== eventId);
    res.status(200).json({ message: 'Événement supprimé avec succès' });
});


app.post("/users", (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1; // Générer un nouvel ID
    users.push(newUser);
    res.status(201).send(newUser);
});


app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
        res.status(200).json(user);
    }
});


app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
        users[userIndex] = { ...users[userIndex], ...req.body }; // Mise à jour avec les nouvelles données
        res.status(200).json(users[userIndex]);
    }
});


app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
});

