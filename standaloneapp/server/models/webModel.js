const mongoose = require('mongoose')
// const Data =  require('../schemas/data-schema')

//make secure soon
//port 27017
const MONGO_URI = 'mongodb://localhost/First-M8';
const db = mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Production_Database'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));
  mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true
}

const reqNum = {
  type: Number,
  required: true
}

const reqArray = {
  type: Array,
  required: true
}

const inputSchema = new Schema({

});

//basic data schema
const dataSchema = new Schema({
  name: reqString,

  ipAddress: reqString,

  port: reqNum,  
});

const chartSchema = new Schema({
  name: reqString,

  columns: {
    aggregationOptions: {
      name: reqString,
      title: reqString,
      list: reqArray
    },
    aggregationSelected: {
      name: reqString,
      title: reqString,
      list: reqArray
    },
    metricsOptions: {
      name: reqString,
      title: reqString,
      list: reqArray
    },
    metricsSelected: {
      name: reqString,
      title: reqString,
      list: reqArray
    }
  }
})

const Input = mongoose.model('input', inputSchema);
const Data = mongoose.model('data', dataSchema);
const Chart = mongoose.model('chart', chartSchema);

module.exports = {
    db,
    Input,
    Data,
    Chart
}