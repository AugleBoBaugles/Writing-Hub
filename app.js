const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log("Hello, world - server!");

    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})