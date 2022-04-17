const admin = require('firebase-admin')

const serviceAccount = require('./tech-novation-firebase-adminsdk-8uqk6-53b6859956.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tech-novation.firebaseio.com',
})

exports.messaging = admin.messaging()
