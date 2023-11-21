require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = require("../private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
