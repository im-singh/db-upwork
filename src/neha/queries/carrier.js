const {dbName,uri} =require('../config.js')
const carrierData=require("../jsonData/carrier.json")

const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  ////////////////////////////////////
  // SAME FOR CARRIER AND SUPPLIER////
  ///////////////////////////////////

  const collection = db.collection('supplier');
  // const collection = db.collection('carrier');

    await collection.insertMany(carrierData)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());