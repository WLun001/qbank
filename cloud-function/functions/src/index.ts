// import * as functions from 'firebase-functions';
//
// import * as cors from 'cors';
// const corsHandler = cors({origin: true});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const qsfReader = functions.https.onRequest((request, response) => {
//   return corsHandler(request, response, () => {
//     console.log(request.body);
//     response.send('Hello from Firebase!');
//   });
//
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.use(cors({origin: true}));

app.post('/upload', (req: { body: any; }, res: { end: (arg0: string) => void; }) => {
  const ref = db.collection('data');
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
  sqData.forEach(element => {
    ref.add(element).then((reference: { id: any; }) => {
      console.log('function finish');
      console.log(reference.id);
      res.end('Received POST request!');
    }).catch((error: any) => console.log(error));
  });
});

exports.qsfReader = functions.https.onRequest(app);
