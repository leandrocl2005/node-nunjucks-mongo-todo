var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},  {
        versionKey: false
    }
);

module.exports = mongoose.model('todos', TodoSchema);
