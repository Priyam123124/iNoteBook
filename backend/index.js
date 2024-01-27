const connectToMongo = require('./db.js');
const express = require('express')
const cors = require('cors')
let app = express();
app.use(cors());

app.use(express.json())

const port = 5000;

connectToMongo();

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`The app is listening on http://localhost:${port}`);
})