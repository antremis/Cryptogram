const admin = require("firebase-admin");
require('dotenv').config()
const serviceAccount = require(`${process.env.FBCONFIG_PATH}/fbconfig.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `cryptogram-d1a77.appspot.com`
});

module.exports = admin