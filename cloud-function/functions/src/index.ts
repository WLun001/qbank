import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const qsfReader = functions.https.onRequest((request, response) => {
  console.log(request.body);
  response.send('Hello from Firebase!');
});