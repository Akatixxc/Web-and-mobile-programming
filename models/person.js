const mongoose = require('mongoose');
const uri = require('./dburi');

mongoose.connect(uri.uri, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const Person = mongoose.model('Person', {
    name: String,
    number: String,
});

module.exports = Person;
