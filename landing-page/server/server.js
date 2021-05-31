const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
// app.use('/web', webRouter);
app.use(express.static(path.resolve(__dirname, "../client")))

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    // res.sendFile('../index.html')
    res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"))
})

app.get('/team', (req, res) => {
    // res.sendFile('../index.html')
    res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"))

})

// app.get('*',  (req, res) => {
//     res.status(404).sendFile('.')
// })

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
});

