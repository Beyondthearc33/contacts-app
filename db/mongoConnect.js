const { MongoClient } = require("mongodb");

let database;

const initDb = async (mongoUri) => {
  if (database) return database; 

  const client = new MongoClient(mongoUri);
  await client.connect();

  database = client.db(); 
  console.log("Connected to MongoDB");

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};

module.exports = { initDb, getDb };
