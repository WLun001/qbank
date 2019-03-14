import * as bodyParser from 'body-parser';
import {MongoClient, MongoError} from 'mongodb';

const cors = require('cors');
const express = require('express');

const uri = 'mongodb+srv://admin:admin@cluster0-7odzu.mongodb.net/test?retryWrites=true';

const app = express();
const client = new MongoClient(uri, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/upload', (req, res) => {
  const data = req.body.data as string[];
  const sqData = readBody(data);
  saveToDatabase(sqData)
    .then(() => res.json({success: 'Saved into database'}))
    .catch((error => {
      res.sendStatus(400);
      res.json({error});
    }));
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);
  if (keyword) {
    client.connect((err: any, c: MongoClient) => {
      const collection = c.db('qbank').collection('questions');
      collection.find({'Payload.QuestionDescription': new RegExp(keyword, 'i')})
        .toArray().then(x => {
        // client.close().then(() => res.json(x));
        res.json(x);
        }
      ).catch(error => {
        res.sendStatus(400);
        res.json({error});
      });
    });
  } else {
    client.connect((err: any, c: MongoClient) => {
      const collection = c.db('qbank').collection('questions');
      collection.find().toArray().then(x => {
        // client.close().then(() => res.json(x));
        res.json(x);
        }
      ).catch(error => {
        res.sendStatus(400);
        res.json({error});
      });
    });
  }
});

app.listen(5000, () => {
  console.log('Example app listening on port 3000!');
});

function readBody(data: string[]) {
  // @ts-ignore
  const startIndex = data.indexOf(',');
  const formattedData = data.slice(startIndex).toString();
  const jsonData = JSON.parse(Buffer.from(formattedData, 'base64').toString());
  const sqData: {}[] = [];
  (jsonData.SurveyElements as Array<any>).forEach(value => {
    if (value.Element === 'SQ') {
      sqData.push(value);
    }
  });
  return sqData;
}

function saveToDatabase(sqData: {}[]) {
  return new Promise((resolve, reject) => {
    client.connect((err: MongoError) => {
      if (err) {
        reject(err);
      }
      client.db('qbank')
        .collection('questions').insertMany(sqData).then(() => {
        //client.close().then(x => resolve());
        resolve();
        }
      );
    });
  });
}
