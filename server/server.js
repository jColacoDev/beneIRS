const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

/*******************************************************************/
// START Database
/*******************************************************************/
const startMongoDb = async (cloud = false) => {
    const db = cloud ? process.env.DATABASE_CLOUD : process.env.DATABASE;
    try{
        mongoose.set("strictQuery", false);
        const success = await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        
        console.log(`DB Connected:`)
        if(cloud) console.log(` cloud mongoDB at jColacoDev db`)
        else console.log(` local mongoDB at ${process.env.DATABASE}`)
        
    } catch (error){
        console.log('DB connection error',error)
    }
};
startMongoDb(true);

const entitySchema = new mongoose.Schema({
    NIF: String,
    NOME: String,
    LOCALIDADE: String
});
const EntityData = mongoose.model('entity', entitySchema);

app.post('/api/data', async (req, res) => {
    try {
      const dataArr = req.body; // assuming req.body is an array of objects
      const savedDataArr = []; // to keep track of saved data
      
      for (let i = 0; i < dataArr.length; i++) {
        // console.log(dataArr[i])
        const data = new EntityData(dataArr[i]);
        console.log(data)
        await data.save();
        savedDataArr.push(data);
      }
      res.send(savedDataArr);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving data!');
    }
});
app.get('/api/data', async (req, res) => {
    try {
      const data = await EntityData.find();
      console.log(data)
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving data!');
    }
});

app.listen(process.env.PORT, () => console.log(`http server is ready at http://localhost:${process.env.PORT}`));
