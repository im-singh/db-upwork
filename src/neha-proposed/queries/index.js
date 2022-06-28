const {dbName,uri} =require('../config.js')

const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('customer');
  const customerCursor= collection.find({}).limit(2);

  await customerCursor.forEach(ele=>{
      console.log('data: ',ele);
  })
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());