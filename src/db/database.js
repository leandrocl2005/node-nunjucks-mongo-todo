require('dotenv/config');
const mongoose = require('mongoose');

const connectionProperties = {
    //url: "mongodb://localhost:27017/todos",
    url: process.env.DB_URI + "?retryWrites=true&w=majority",
    options:  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
};

const _ = mongoose.connect(connectionProperties.url, connectionProperties.options);

const connectionTest = () => {
    return db().then(() => true).catch((err) => {
        console.log('Error: ', err);
        return false;
    });
};

module.exports = { connectionTest };
