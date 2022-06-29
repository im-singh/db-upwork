const {dbName,uri} =require('../config.js')
// const paymentData=require("../jsonData/payment.json")

const { MongoClient,Int32 } = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  // const collection = db.collection('supplier');
  const paymentC = db.collection('payment');

  const customerC = db.collection('customer');
  const customerCursor = customerC.find({});
  let customerIds = []
  await  customerCursor.forEach(ele => {
      customerIds.push(ele._id)
  })

  let payArr=[];
  let date =new Date("2025-01-01").getTime();
  let card=4512654798543254;

  for(let i=0;i<100;i++){
    date=date+(30*23*60*60*1000);
    let fillDate=new Date(date);
    let obj={};

    obj.bill=new Int32(Math.floor((Math.random() * 1000) + 1));
    obj.creditCard={
        number:card+i,
        expirationDate:fillDate,
    }
    
    let randomCustomerIndex=Math.floor((Math.random() * customerIds.length-1) + 1)
    obj.customer=customerIds[randomCustomerIndex]

    payArr.push(obj);

  }

  // console.log(payArr)
    await paymentC.insertMany(payArr)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());