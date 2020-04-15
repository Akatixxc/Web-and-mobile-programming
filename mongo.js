const mongoose = require('mongoose');
const uri = require('./dburi');

mongoose.connect(uri.uri, { useNewUrlParser: true });

const Person = mongoose.model('Person', {
    name: String,
    number: String,
});

if (process.argv.length == 4) {
    pname = process.argv[2];
    pnumber = process.argv[3];

    const person = new Person({
        name: pname,
        number: pnumber,
    });

    person.save().then((resp) => {
        console.log(`adding person ${pname} number ${pnumber} to the directory`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then((resp) => {
        resp.forEach((person) => {
            console.log(person);
        });
        mongoose.connection.close();
    });
}
