const {dbName,uri} =require('../config.js')
const orderData=require("../jsonData/order.json")

const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);

// do not use this.


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('order');
    let updated=orderData.map(ele=>{
      let obj=ele;
      obj.date=new Date(ele.date);
      obj.paymentDate=new Date(obj.paymentDate);
      obj.delivery.deliveryDate=new Date(obj.delivery.deliveryDate);
      return obj;
    })

    console.log(updated);
      await collection.insertMany(updated)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  // to get order of particular year
  // db.order.find({"delivery.deliveryDate":{$gte:new Date("2022-01-01"),$lt: new Date("2023-01-01")}}).pretty()
