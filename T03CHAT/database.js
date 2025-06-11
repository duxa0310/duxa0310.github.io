const mongodb = require("mongodb");

export let dbCreate, dbRead, dbUpdate, dbDelete;

async function dbInit() {
  const url = "mongodb://localhost:27017";
  const database = "SomeData";
  const collection = "Collection1";
  const client = new mongodb.MongoClient(url);

  try {
    const connection = await client.connect();
    const db = connection.db(database);
    const col = db.collection(collection);
    dbCreate = async function (obj) {
      await col.insertOne(obj);
    };
    dbRead = async function (obj) {
      const res = await col.find(obj);
      return res.toArray;
    };
    dbUpdate = async function (obj, params) {
      await col.updateOne(obj, { $set: params });
    };
    dbDelete = async function (obj) {
      await col.deleteOne(obj);
    };
  } catch (err) {
    console.error(err);
  }
}