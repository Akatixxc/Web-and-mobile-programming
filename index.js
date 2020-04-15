const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

const formatPerson = (person) => {
    const formattedPerson = {
        name: person.name,
        number: person.number,
        id: person._id,
    };
    delete formatPerson._id;

    return formattedPerson;
};

app.get('/api/persons', (req, res) => {
    Person.find({}, { __v: 0 }).then((persons) => {
        res.json(persons.map(formatPerson));
    });
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(formatPerson(person));
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            //console.log(err);
            res.status(400).send({ error: 'malformatted id' });
        });
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(204).end();
        })
        .catch((err) => {
            //console.log(err);
            res.status(400).send({ error: 'malformatted id' });
        });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'name or number missing' });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then((savedPerson) => {
        console.log(`adding person ${body.name} number ${body.number} to the directory`);
        Person.find({}, { __v: 0 }).then((persons) => {
            res.json(persons.map(formatPerson));
        });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
