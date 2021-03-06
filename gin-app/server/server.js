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
// ספרייה שיוצרת id
const uuidv1 = require('uuid/v1');

const mongo = require('mongodb')

// הגדרת השימוש בספריות
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())

// const fileName = 'db.json';


let collection;
async function connectDB() {
const url = 'mongodb://localhost:27017';
const connection = await mongo.connect(url);
const db = connection.db('ginAppDB');
collection = db.collection('ginAppCOL');
};
connectDB()

app.post('/conect', async (req, res) => {
    const {userName, password} = req.body;
    const ifUserName = await collection.findOne({userName: userName});
    const obj = {
        userName: ifUserName.userName,
        userId: ifUserName.userId,
}
    if(password == ifUserName.password){
        res.status(200).json(obj)
    }else{
        res.status(400).json(400)
    }
})

app.get('/:id', async (req, res) => {
    res.send(await collection.findOne({userId: req.params.id}))
})

// מקבל מידע מהקליינט
app.post('/', async (req, res) => {
    const {userName, password} = req.body;
    const userId = uuidv1();
    const arrPlant = [];
    const ifAlreadyName = await collection.findOne({userName: userName});
    if (ifAlreadyName){
        res.status(400).json(400)
    }else{
        await collection.insertOne({userName, password, userId, arrPlant});
        const obj = {
            userName: userName,
            userId: userId,
    }
            res.status(200).json(obj)
    }
})

// מעדכן מידע ספציפי
app.put('/:id', async (req, res) => {
    const arr = req.body;
    await collection.updateOne({userId: req.params.id}, {$set: {arrPlant: arr}});
    res.status(200).json('okput')
})

app.delete('/:id', async (req, res) => {
    await collection.deleteOne({name: req.params.id});
    res.status(200).json('okput')
})

app.listen(8000, () => {
    console.log('listen...')
})

