const mongoose = require('mongoose')

const MONGO_URI = 'mongodb+srv://lime:thisIsAnewPa44wordF0rMonG0@cluster0.eikq3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const db = mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Production_Database'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const inputSchema = new Schema({

});



const dataSchema = new Schema({
  name: {
      type: String,
      required: true
  },

  ipAddress: {
      type: Number,
      required: true,
  },

  port: {
      type: Number,
      required: true
  },  
});


const Input = mongoose.model('input', inputSchema);
const Data = mongoose.model('data', dataSchema);

module.exports = {
    db,
    Input,
    Data
}