window.indexedDB = window.indexedDB || window.mozIndexDB || window.webkitIndexedDB || window.msIndexedDB;

if (!('indexedDB' in window)) {
  console.warn('IndexedDB not supported'); return
}

//currently global - may need to change later
//                                 //db name  //version
let request = window.indexedDB.open("database", 1),

  db,
  tx,
  store,
  index;

  //add put
  //add delete
  //etc

    //when creating a brand new database or opening a db
  //fires every time new DB is created
  request.onupgradeneeded = (e) => {
    //grab the database
    let db = request.result, 
    //set up a store, pass in the name 1st
    store = db.createObjectStore("store", {
      //choose a key, increment that key
      //this auto increments, and assigns to the ID in question
      keyPath: "ID" });
      
      //index allows to get data by entering text of the data
      //         "questionText", "questionText", {optional information}
      //                                         {unique: false}
      index = store.createIndex("name", "name", {unique: true});
}

  //catch alls handlers(?)
  //error handler
  //               event object
  request.onerror = (e) => {
    console.log("error" + e.target.errorCode);
  }

  //success event - used to work with database
  //most important
  //if upgradeneeded succeeds, this fired
  request.onsuccess = (e) => {
    //assign database to DB variable
    //on a success, get the result
    db = request.result;
    //fill in predetermined variables
    //reference from the transaction
    //ex:
    tx = db.transaction("", "readwrite");
  }
  
