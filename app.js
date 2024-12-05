const express = require('express');
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})



const app = express();
const PORT = process.env.PORT_NUM;



app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log("Hello, world - server!");

    res.render('home');
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.render('submitted');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})