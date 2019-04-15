// שימוש בספריית אקספרס
const express = require('express');
// יצירת אינסטנס לספרייה
const app = express();
// ספרייה שקוראת קבצים
const fs = require('fs').promises;
// ספרייה שנותנת גישה לשרת גם מחוצה לו
var cors = require('cors');
// ספרייה שקוראת json שמגיע מ body הקליינט
const bodyParser = require('body-parser');

const mongo = require('mongodb')

// הגדרת השימוש בספריות
app.use(bodyParser.json());
app.use(cors())

// const fileName = 'db.json';


let collection;
async function connectDB() {
const url = 'mongodb+srv://dvir:mT3xkcFzKNcFn4Q@cluster0-wcsxp.mongodb.net/test?retryWrites=true';
const connection = await mongo.connect(url);
const db = connection.db('tableScore');
collection = db.collection('table');
};
connectDB()

app.get('/', async (req, res) => {
    res.send(await collection.find().sort({score:-1}).limit(-10).toArray())
})

app.get('/:id', async (req, res) => {
    res.send(await collection.findOne({_id: +req.params.id}))
})

// מקבל מידע מהקליינט
app.post('/', async (req, res) => {
    const {name, score} = req.body;
    await collection.insertOne({name, score})
    res.status(200).json('ok')
})

// מעדכן מידע ספציפי
app.put('/:id', async (req, res) => {
    const {name, lest} = req.body;
    console.log(req.params.id);
    await collection.updateOne({name: req.params.id}, {$set: {name, lest}});
    res.status(200).json('okput')
})

app.delete('/:id', async (req, res) => {
    await collection.deleteOne({name: req.params.id});
    res.status(200).json('okput')
})

app.listen(8000, () => {
    console.log('listen...')
})

