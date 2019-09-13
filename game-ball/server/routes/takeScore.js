var express = require('express');
const router = express.Router();
const connectDB = require('../connectDB.js');

router.put('/', function (req, res, next) {
  const obj = req.body;

  await connectDB.updateOne({
    name: score
  }, {
    $set: {
      table: obj
    }
  });

  res.status(200).json('okput')
});

module.exports = router;