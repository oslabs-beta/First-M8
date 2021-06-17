const express = require('express');
const path = require('path');
const webRouter = require('./routes/webRouter');
const dashboardRouter = require('./routes/dashboardRouter');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/settings', webRouter);
app.use('/dashboard', dashboardRouter);
// app.use('/history', historyRouter);

app.use(express.static(path.resolve(__dirname, '../client')));

// if (process.env.NODE_ENV === 'production') {
app.use('/build', express.static(path.join(__dirname, '../build')));
// }
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// app.get('*',  (req, res) => {
//     res.status(404).send()
// })

// fix
// app.use((err, req, res) => {
//     res.status(500).send("There was an error: " + err.message)
// })
// make a global error handler, console.log
// the getall error

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});
