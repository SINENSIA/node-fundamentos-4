const mongo = require('mongodb').MongoClient;
const assert = require('assert');

// Dotenv
require('dotenv').config();
const url = `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASS)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
//const url = `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASS)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
// Database Name
//const dbName = 'curso';

const connection = mongo.connect(url);

connection
.then(() => console.log("Connected"))
.catch((err) => console.log("Catch Se ha producido un error: " + err));

