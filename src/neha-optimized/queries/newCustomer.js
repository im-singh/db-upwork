const {dbName,uri} =require('../config.js')
const customerName=require("../jsonData/customerName.json");
const customerJson=require('../jsonData/customer.json')

const { MongoClient,Int32 } = require('mongodb');

const client = new MongoClient(uri);

/////////////////////////////////
// MAKE NEW CUSTOMERS WITH ORDER //
//////////////////////////////////


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const customerC = db.collection('customer');
  
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

  let date =new Date("2011-01-01").getTime();
  let card=4512654798543254;
  let orderArr=[];

  for(let i=0;i<90;i++){
    date=date+(30*23*60*60*1000);
    let fillDate=new Date(date);
    
    let obj= {...customerJson[0]};

    // customer details
    obj.name=customerName[i].name;
    obj.address=customerName[i].address;
    obj.contacts=customerName[i].contacts;
    obj.email=customerName[i].email;

    obj.orders=[];
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
            }
        ],
    }
    orderObj.paymentCode= "UPI"
    orderObj.type="credit"
    
    // add order
    obj.orders.push(orderObj);
    
    card=card+1;

    orderArr.push(obj);
  }
// console.log('arr: ',orderArr);
//   console.log('customer: ',orderArr[0]);
// console.log('orders: ',orderArr[0].orders);
// console.log('items: ',orderArr[0].orders[0].items);


    await customerC.insertMany(orderArr)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());