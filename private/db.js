const mongoose = require("mongoose");



// Exports
exports.create = function (dbname, collection, data, schema, availability, property, value) {
  //connect(dbname);

  let model = mongoose.model(collection, schema, collection);
  let modelData = new model(data);


  validate(model, property, value)
  .then(res =>{ //callback function
    if (availability) { // if it has to check for and occurrence in the db
      if (res == false) {
        saveData(modelData);
      } else {
        console.log("exists")
      }
    } else {
      saveData(modelData);
    }
  })
}


exports.initPassport = function() {

//  let model = mongoose.model(collection, schema, collection);

  initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  );
}









exports.retrieve = function (dbname) {

}



exports.update = function (dbname) {

}



exports.delete = function (dbname) {

}



// Functions
/*
function connect(dbname) { // Connects to db
  var constr = `mongodb://localhost:27017/${dbname}`;
  var conparam = { useNewUrlParser: true, useUnifiedTopology: true };

  mongoose.connect(constr, conparam);
  const db = mongoose.connection;
  db.once("open", function() {
      console.log("Connected to server by mongoose")
  });
}*/

async function validate(model, property, value) { // Checks if value exists

  let obj = {};
  obj[property] = value;
  const docs = await model.find(obj);//Finds the property and value in the db
  if (docs.length <= 0) {// if it dosn't exist
    return false;
  }
}

function saveData(data) {
  data.save(function(error, savedDocument) {
      if (error) console.log(error);
      console.log(savedDocument);
  })
}
