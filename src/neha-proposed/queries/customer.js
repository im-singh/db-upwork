const {dbName,uri} =require('../config.js')
const customerData=require("../jsonData/customer.json")

const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('customer');

    await collection.insertMany(customerData)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());