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

//ChartSetting schema
//rename
//holding state of ChartSettings setup
  //if added in functionality to edit, pull this data
  //users can see what's currently selected
const ChartSettingSchema = new Schema({
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

//second ChartSetting schema
//store all table and ChartSettings the user has created
  //on primary dashboard page, display all ChartSettings
const displaySchema = new Schema({
  display: reqArray,
})

const Input = mongoose.model('input', inputSchema);
const Data = mongoose.model('data', dataSchema);
const ChartSetting = mongoose.model('chartSetting', ChartSettingSchema);
const Display = mongoose.model('display', displaySchema);

module.exports = {
    db,
    Input,
    Data,
    ChartSetting,
    Display
}