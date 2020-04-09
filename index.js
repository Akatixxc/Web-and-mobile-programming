const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1,
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2,
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3,
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4,
    },
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'name or number missing' });
    }
    if (!persons.every((person) => person.name !== body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const generateId = () => {
        const maxId =
            persons.length > 0
                ? persons
                      .map((p) => p.id)
                      .sort((a, b) => a - b)
                      .reverse()[0]
                : 1;
        return maxId + 1;
    };

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };
    /*  id:n tilalle kuului laittaa random luku mutta tämä ratkaisu on parmepi.
        Satunnaisen id:n voi luoda seuraavasti (1 - 1000000):
        Math.floor(Math.random() * 1000000) + 1;
    */
    persons = persons.concat(person);
    res.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
