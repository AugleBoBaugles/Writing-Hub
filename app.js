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
    requests = await conn.query(`SELECT * FROM requests ORDER BY interest_num DESC, timestamp DESC;`);
    responses = await conn.query(`SELECT * FROM responses ORDER BY timestamp DESC;`)

    console.log(responses)
    res.render('home', {requests: requests, responses: responses});
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.post('/submit-request', async (req, res) => {
    // console.log(req.body);
    const data = req.body;

    const conn = await connect();
    await conn.query(`INSERT INTO requests (title, content, author) VALUES ('${data.title}', '${data.content}', '${data.author}');`)

    res.render('submitted', {data: data});
});

app.post('/init-response', async (req, res) => {
    const requestId = req.body.request_id;

    const conn = await connect();
    const data = await conn.query(`SELECT * FROM requests WHERE request_id = ${requestId};`);
    console.log(data);
    
    res.render('response', {data: data});
})

app.post('/submit-response', async (req, res) => {
    const data = req.body;

    const conn = await connect();
    await conn.query(`INSERT INTO responses(message, response, author, request_id) VALUES ('${data.message}', '${data.content}', '${data.author}', '${data.req_id}');`)
})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})