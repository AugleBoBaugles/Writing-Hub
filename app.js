const express = require('express');
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})

async function connect(){
    try{
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err){
        console.log('Error connecting to the database: ' + err);
    }
}

const app = express();
const PORT = process.env.PORT_NUM;



app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    
    const conn = await connect();
    data = await conn.query(`SELECT * FROM requests`);
    res.render('home', {data: data});
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.post('/submit', async (req, res) => {
    // console.log(req.body);
    const data = req.body;

    const conn = await connect();
    await conn.query(`INSERT INTO requests (title, content, author) VALUES ('${data.title}', '${data.content}', '${data.author}');`)

    res.render('submitted', {data: data});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})