const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

/*******************************************************************/
// START Database
/*******************************************************************/
const startMongoDbBirs = async (cloud = false) => {
  const db = cloud ? process.env.DATABASE_CLOUD_BIRS : process.env.DATABASE_BIRS;
  try{
      mongoose.set("strictQuery", false);
      const success = await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      
      console.log(`DBirs Connected:`)
      if(cloud) console.log(` cloud mongoDB at BeneIRS db`)
      else console.log(` local mongoDB at ${process.env.DATABASE_BIRS}`)
      
  } catch (error){
      console.log('DBirs connection error',error)
  }
};
// startMongoDbBirs(true);
const connectDBs = () => {
  try {
      const jcDb = mongoose.createConnection(process.env.DATABASE_CLOUD, {
          useUnifiedTopology: true,
          useNewUrlParser: true
      })
      const birsDB = mongoose.createConnection(process.env.DATABASE_CLOUD_BIRS, {
          useUnifiedTopology: true,
          useNewUrlParser: true
      })
      return { jcDb, birsDB }
  } catch (error) {
      console.error(`Error:${error.message}`)
      process.exit(1)
  }
}
const { jcDb, birsDB } = connectDBs();


const entitySchema_birs = new mongoose.Schema({
    NIF: String,
    NOME: String,
    LOCALIDADE: String
});
const EntityData_birs = birsDB.model('entities_2023', entitySchema_birs);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
      const { year } = req.body;

      const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming your data starts from row 7 (index 6)
      const entities = data.slice(6).map(row => ({
          NIF: row[0],
          NOME: typeof row[1] === 'string' ? row[1].replace(/^"(.*)"$/, '$1') : row[1],
          LOCALIDADE: row[2]
      }));
      const collectionName = `entities_${year}`;
      const EntityData_birs = birsDB.model(collectionName, entitySchema_birs);
      await EntityData_birs.deleteMany();
      await EntityData_birs.insertMany(entities);
      // console.log(entities.slice(3,10));
      console.log(data.slice(3,10));

      res.status(200).send('Data uploaded successfully');
  } catch (error) {
      console.error('Error uploading file: ', error);
      res.status(500).send('Error uploading file');
  }
});

app.get('/api/birs/data', async (req, res) => {
    try {
      const data = await EntityData_birs.find();
      console.log(data)
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving data!');
    }
});

app.listen(process.env.PORT, () => console.log(`http server is ready at http://localhost:${process.env.PORT}`));
