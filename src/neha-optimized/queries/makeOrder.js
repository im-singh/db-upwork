const {dbName,uri} =require('../config.js')

const { MongoClient,Int32 } = require('mongodb');

const client = new MongoClient(uri);

/////////////////////////////////
// MAKE NEW ORDER TO CUSTOMERS //
//////////////////////////////////


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const customerC = db.collection('customer');
  const customerCursor = customerC.find({});
  let customersIds = []
  await  customerCursor.forEach(ele => {
    customersIds.push(ele._id)
  })

  const productc=db.collection('product');
  const productCursor = productc.find({});
  let productsIds = []
  await  productCursor.forEach(ele => {
      productsIds.push(ele._id)
  })

  const carrierC = db.collection('carrier');
  const carrierCursor = carrierC.find({});
  let carrierIds = [];
  await carrierCursor.forEach(ele => {
    carrierIds.push(ele._id)
  })

  let date =new Date("2016-01-01").getTime();
  let card=4512654798543254;
  let orderArr=[];

  for(let i=0;i<1;i++){
    date=date+(30*23*60*60*1000);
    let fillDate=new Date(date);

    // order
    let orderObj={
        number:new Int32(Math.floor((Math.random() * 10) + 1)),
        date:fillDate,
        totalPrice:`$${Math.floor((Math.random() * 100) + 1200)}.00`,
        paymentDate:fillDate,
        cardNumber:card,
        delivery: {
            deliveryDate : fillDate,
            carrier : carrierIds[i]
        },
        items : [
            {
                code : "A",
                quantity : new Int32(Math.floor((Math.random() * 10) + 1)),
                product : productsIds[i]
            },
            {
                code : "B",
                quantity : new Int32(Math.floor((Math.random() * 10) + 1)),
                product : productsIds[i+1]
            }
        ],
    }
    orderObj.paymentCode= "VISA"
    orderObj.type="credit"
    
    card=card+1;

    orderArr.push(orderObj);
  }
// console.log('arr: ',orderArr);
//   console.log('delivery: ',orderArr[0].delivery);
// console.log('items: ',orderArr[0].items);


    await customerC.updateMany({},{$push:{orders:orderArr[0]}})
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());