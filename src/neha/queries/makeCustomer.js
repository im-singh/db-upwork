const { dbName, uri } = require("../config.js");
const customerName = require("../jsonData/customerName.json");
// const customerJson=require('../jsonData/customer.json')

const { MongoClient, Int32 } = require("mongodb");

const client = new MongoClient(uri);

/////////////////////////////////
// MAKE NEW CUSTOMERS WITH ORDER //
//////////////////////////////////

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const customerC = db.collection("customer");

  const productc = db.collection("product");
  const productCursor = productc.find({});
  let productsIds = [];
  await productCursor.forEach((ele) => {
    productsIds.push(ele._id);
  });

  const carrierC = db.collection("carrier");
  const carrierCursor = carrierC.find({});
  let carrierIds = [];
  await carrierCursor.forEach((ele) => {
    carrierIds.push(ele._id);
  });

  const paymentC = db.collection("payment");
  const paymentCursor = paymentC.find({});
  let paymentIds = [];
  await paymentCursor.forEach((ele) => {
    paymentIds.push(ele);
  });

  let date = new Date("2011-01-01").getTime();
  let card = 4512654798543254;
  let customerArr = [];

  // i need to be upto 99
  for (let i = 0; i < 99; i++) {
    date = date + 30 * 23 * 60 * 60 * 1000;
    let fillDate = new Date(date);

    let obj = {};

    // random customer index
    let rci = Math.floor(Math.random() * customerName.length - 1 + 1);
    // // random product index
    // let rpi=Math.floor((Math.random() * productsIds.length-1) + 1)
    // // random carrier index
    // let rcari=Math.floor((Math.random() * carrierIds.length-1) + 1)
    // // random payment index
    // let rpayi=Math.floor((Math.random() * paymentIds.length-1) + 1)

    // customer details
    obj.name = customerName[rci].name;
    obj.address = customerName[rci].address;
    obj.contacts = customerName[rci].contacts;

    if (customerName[rci].email) {
      // only some customer have emails
      obj.email = customerName[rci].email;
    }

    obj.orders = [];
    // order
    // let orderObj={
    //     number:new Int32(Math.floor((Math.random() * 10) + 1)),
    //     date:fillDate,
    //     totalPrice:`$${Math.floor((Math.random() * 100) + 1200)}.00`,
    //     delivery: {
    //         deliveryDate : fillDate,
    //         carrier : carrierIds[rcari]
    //     },
    //     items : [
    //         {
    //             code : "A",
    //             quantity : new Int32(Math.floor((Math.random() * 10) + 1)),
    //             product : productsIds[rpi]
    //         }
    //     ],
    //     commitment:{
    //         paymentDate:fillDate,
    //         payment:paymentIds[rpayi]
    //     }
    // }

    // // add order
    // obj.orders.push(orderObj);

    // card=card+1;

    customerArr.push(obj);
  }
//   console.log("arr: ", customerArr);
//   console.log("arr: ", customerArr[0].contacts);


  await customerC.insertMany(customerArr)
  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
