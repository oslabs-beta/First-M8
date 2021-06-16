const express = require('express');
const app = express();
const path = require('path');
const PORT = 3005;


const promClient = require('prom-client');
const promBundle = require('express-prom-bundle');
const promMetrics = promBundle({ 
  includePath: true,
  customLabels: { app: 'fm8-web-nodejs-app' },
  promClient:  { collectDefaultMetrics: {} }
});

app.use(promMetrics);

app.use(express.json());
// app.use('/web', webRouter);
// app.use(express.static(path.resolve(__dirname, "../client/src")));
// app.use(metricsMiddleware);


app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.resolve(__dirname, '../client/src')));

app.get('/', (req, res) => {
    // res.sendFile('../index.html')
    res.status(200).sendFile(path.resolve(__dirname, "../client/index.html"))
})

app.use('/api/greeting', (request, response) => {
  const end = histogram.startTimer();
  const name = request.query.name ? request.query.name : 'World';
  response.send({content: `Hello, ${name}!`});
  end({ method: request.method, 'status_code': 200 });
});

// app.get('*',  (req, res) => {
//     res.status(404).sendFile('.')
// })

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
});

