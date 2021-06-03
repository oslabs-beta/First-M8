const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
// app.use('/web', webRouter);
app.use(express.static(path.join(__dirname, "../client")))

app.get('/', (req, res) => {
    // res.sendFile('../index.html')
    res.sendFile(path.join(__dirname, "../index.html"))
})

app.get('/team', (req, res) => {
    // res.sendFile('../index.html')
    res.sendFile(path.join(__dirname, "../index.html"))

})

app.get('*',  (req, res) => {
    res.status(404).sendFile('../error.html')
})

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
});