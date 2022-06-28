const {dbName,uri} =require('../config.js')
const orderData=require("../jsonData/order.json")
const randomSupplier = require('../jsonData/supplier.json');
const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const orderc = db.collection('order');
  const customerc=db.collection('customer');
  const productc=db.collection('product');

    const customerCursor = customerc.find({});
    let customerIds = [];
    await customerCursor.forEach(ele => {
        customerIds.push(ele)
    })

    const productCursor = productc.find({});
    let productsIds = []

    await  productCursor.forEach(ele => {
        productsIds.push(ele._id)
    })

    let date =new Date("2016-01-01").getTime();
    let orderArr=[];

    for(let j=0;j<100;j++){
        for(let i = 0;i<90;i++){
            date=date+(30*23*60*60*1000);
            let fillDate=new Date(date);
    
            let obj = {...orderData[0]};
            obj.date=fillDate;
            obj.paymentDate=fillDate;
            obj.delivery.deliveryDate=fillDate;
            obj.customer=customerIds[i]._id;
            obj.totalPrice=`$${Math.floor((Math.random() * 100) + 120)}.00`,
            obj.items= [
                {
                    code : "A",
                    quantity : 2,
                    "product" : productsIds[i]
                },
                {
                    "code" : "C",
                    "quantity" : 3,
                    "product" : productsIds[i+1]
                },
                {
                    code : "E",
                    quantity : 1,
                    "product" : productsIds[i+2]
                },
    
            ];
            obj.delivery.carrier = randomSupplier[i]
    
            obj.paymentCode="VISA";
            // obj.paymentCode="MASTERCARD";
            // obj.paymentCode="UPI";
    
    
            orderArr.push(obj)
        }
    }
    
    // console.log(orderArr.length);

    await orderc.insertMany(orderArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

