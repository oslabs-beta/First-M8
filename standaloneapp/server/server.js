const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
const webRouter = require('./routes/webRouter');
const dashboardRouter = require('./routes/dashboardRouter');



app.use(express.json());

//finish setting up routes
//instead of web, make one settings, dashboard, history
app.use('/settings', webRouter);
app.use('/dashboard', dashboardRouter);
//app.use('/history', historyRouter);

//next to work on
// app.use('/prometheus')
// app.use('/database')
app.use(express.static(path.resolve(__dirname, "../client")))


//EDIT THESE BOIS
//create routes for dashboard components and app

app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  // res.sendFile('../index.html')
  res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"));
});

// app.get('*',  (req, res) => {
//     res.status(404).send()
// })


//fix
// app.use((err, req, res) => {
//     res.status(500).send("There was an error: " + err.message)
// })
//make a global error handler, console.log
//the getall error

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
