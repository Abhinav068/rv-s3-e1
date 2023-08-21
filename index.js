const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./router/user.router');
const { doctorRouter } = require('./router/doctor.router');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

app.use('/user',userRouter);
app.use('/doctor',doctorRouter);

const port = process.env.port;

app.get('/', (req, res) => {
    res.send('Masai Hospital');
})

app.listen(port, async () => {
    await connection;
    console.log(`running at http://localhost:${port}`);
})