const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = process.env.DB_URL;

// Database name
const dbName = "event_scheduler";
const collName = "events";

// Database settings
const settings = { useUnifiedTopology: true };

const getEvents = () => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client){
            if(err){
                reject(err);
            } else {
                console.log(`Successfully connected to DB: ${dbName} for GET.`);
                const db = client.db(dbName);
                const collection = db.collection(collName);
                collection.find({}).toArray(function(err,docs){
                    if(err){
                        reject(err);
                    } else {
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    };
                })
            };
        })
    })
    return promise;
}

const addEvent = (event) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log(`Successfully connected to DB: ${dbName} for POST.`);
                const db = client.db(dbName);
                const collection = db.collection(collName);
                collection.insertOne(event, (err, result) => {
                    if(err){
                        console.log(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    }
                })
            };
        })
    })
    return promise;
};

const deleteEvent = (id) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log(`Successfully connected to DB: ${dbName} for DELETE.`);
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.deleteOne({_id: ObjectID(id)}, function(err, result){
                    if(err){
                        reject(err);
                    } else {
                        resolve({deleted_id: id});
                        client.close();
                    };
                })
            };
        })
    })
    return promise;
};

const editEvent = (id, event) => {
    const promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client){
            if(err){
                reject(err);
            } else {
                console.log(`Successfully connected to DB: ${dbName} for PATCH.`);
                const db = client.db(dbName);
                const collection = db.collection(collName);
                await collection.update(
                    {_id: ObjectID(id)},
                    {$set:{
                        eventName: event.eventName,
                        eventDate: event.eventDate,
                        eventType: event.eventType,
                        eventDetails: event.eventDetails,
                    }},
                    {upsert: true},
                    (err, result) => {
                        if(err){
                            console.log(err);
                        } else {
                            resolve({updated_id: id});
                        };
                    }
                )
            };
        })

    })
    return promise;
}

module.exports = {
    getEvents,
    addEvent,
    deleteEvent,
    editEvent
}