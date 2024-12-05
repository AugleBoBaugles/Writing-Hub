const express = require('express');
const app = express();
const PORT = 3000;

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