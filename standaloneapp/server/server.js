const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const webRouter = require('./routes/webRouter');

app.use(express.json());

//finish setting up routes
app.use('/web', webRouter);

//next to work on
app.use('/prometheus')
app.use('/database')
app.use(express.static(path.resolve(__dirname, "../client")))

//EDIT THESE BOIS
//create routes for dashboard components and app


app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    // res.sendFile('../index.html')
    res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"))
})

// app.get('*',  (req, res) => {
//     res.status(404).sendFile('.')
// })


app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
});
