import {MongoClient, MongoError} from 'mongodb';

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

const uri = 'mongodb+srv://admin:admin@cluster0-7odzu.mongodb.net/test?retryWrites=true';

app.use(cors({origin: true}));


// app.get('/search', (req: { query: { keyword: any; }; }, res: any) => {
//   const keyword = req.query.keyword;
//   client.connect((err: any, c: MongoClient) => {
//     const db = c.db('qbank');
//     db.collection('questions').find();
//   });
//
//
// });


app.post('/upload', (req: { body: any; }, res: { end: (arg0: string) => void; }) => {
  // const ref = db.collection('data');
  const client = new MongoClient(uri, {useNewUrlParser: true});
  const data = req.body.data as Array<string>;
  const startIndex = data.indexOf(',');
  const formattedData = data.slice(startIndex).toString();
  const jsonData = JSON.parse(Buffer.from(formattedData, 'base64').toString());
  const sqData: {}[] = [];
  (jsonData.SurveyElements as Array<any>).forEach(value => {
    if (value.Element === 'SQ') {
      sqData.push(value);
    }
  });
  console.log(sqData);

  console.log(client.isConnected());
  client.connect((err: MongoError) => {
    const db = client.db('qbank');
    db.collection('questions').insertMany(sqData).then(() => {
        client.close();
        res.end('Received POST request!');
      }
    );
  });
});

exports.qsfReader = functions.https.onRequest(app);
