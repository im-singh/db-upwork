const {dbName,uri} =require('../config.js')
const productJson = require('../jsonData/product.json'); 
const { MongoClient ,Int32} = require('mongodb');

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
const productc=db.collection('product')
  const categoryC=db.collection('category');
  const supplierC=db.collection('supplier');

    const categoryCursor = categoryC.find({});
    let categoryIds = [];
    await categoryCursor.forEach(ele => {
        categoryIds.push(ele._id)
    })

    const supplierCursor = supplierC.find({});
    let supplierIds = []

    await  supplierCursor.forEach(ele => {
        supplierIds.push(ele._id)
    })

    let productArr=[]
    for(let i = 0;i<90;i++){
        let obj = {...productJson[0]};

        obj.price=new Int32(Math.floor((Math.random() * 100) + 1));
        obj.catalog=categoryIds[Math.floor((Math.random() * 17) + 1)]; // total categories = 18
        obj.furnishing=supplierIds[i];
        obj.quantity=Math.floor((Math.random() * 10) + 1)

     productArr.push(obj);   
    }
// console.log(productArr)
    await productc.insertMany(productArr);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

