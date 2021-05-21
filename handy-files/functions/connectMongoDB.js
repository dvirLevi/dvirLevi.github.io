const mongo = require('mongodb')
require('custom-env').env();

let db;
let connectOne = async () => {
  const url = process.env.MONGO_URI_COURSES;
  const connection = await mongo.MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = connection.db('DBname');
};
connectOne()

let connectDB = (coll) => {
  return db.collection(coll);
};

module.exports = connectDB;
