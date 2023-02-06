const express = require('express');
const cors = require('cors');
//const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var{MongoClient, ServerApiVersion }  = require('mongodb').MongoClient;
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




  
var MongoClient = require('mongodb').MongoClient;

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-cisbqkw-shard-00-00.65jgjko.mongodb.net:27017,ac-cisbqkw-shard-00-01.65jgjko.mongodb.net:27017,ac-cisbqkw-shard-00-02.65jgjko.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nlcj-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log(uri);
MongoClient.connect(uri, function(err, client) {
 // const collection = client.db("test").collection("devices");
 
  client.close();
});


//// perform actions on the collection object
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion,
  });


//  again

const run = async () => {
    try {
      const productCollection = client.db("readingblog").collection("products");
       
      app.get('/products', async(req, res)=> {
      const query = {};
      const options = await productCollection.find(query).toArray();
      res.send(options);

      })

      app.get("/products", async (req, res) => {
        const cursor = productCollection.find({});
        const product = await cursor.toArray();
  
        res.send({ status: true, data: product });
      });
  
      app.post("/product", async (req, res) => {
        const product = req.body;
  
        const result = await productCollection.insertOne(product);
  
        res.send(result);
      });
  
      app.delete("/product/:id", async (req, res) => {
        const id = req.params.id;
  
        const result = await productCollection.deleteOne({ _id: ObjectId(id) });
        res.send(result);
      });

    } 
    finally {
    }

  };
  
  run().catch((err) => console.log(err));

app.get('/', async(req, res)=>{
    res.send('Reading tech blog is running');
})

app.listen(port, ()=>console.log(`Reading blog running on ${port}`));


//git remote rm origin
//git remote add origin your url
//git push -u origin main
//git remote add origin https://github.com/shahadot99999/noon-tech-starter-pack-main-server.git
//git push -u origin main
