const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = process.env.DB_URL;

// Database name
const dbName = "event-scheduler";
const collName = "events";

// Database settings
const settings = { useUnifiedTechnology: true};


