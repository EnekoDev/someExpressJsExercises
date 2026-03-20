import { MongoClient } from "mongodb";

let db;

async function connect() {
    if (db) return db; 
    try {
        const client = new MongoClient("mongodb://root:root@localhost:27017");
        await client.connect();
        console.log("Connection successfull");
        db = client.db("users");
        return db;
    } catch (err) {
        console.error("Connection error:", err.message);
        process.exit(1);
    }
}

export { connect };