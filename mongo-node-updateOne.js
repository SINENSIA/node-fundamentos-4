
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'curso';

const connection = mongo.connect(url);

connection
connection
.then(function (client) { 
    const db = client.db(dbName);
    // Código a ejecutar usando db
    insertDocuments(db, () => console.log("2-Insertados"))
    return db; //devolvemos db para usarla en el siguiente then
})
.then(function(db) {
   //Buscamos documentos
   findDocuments(db,() => console.log("4-Búsqueda finalizada"));
   return db;
})
.then(function (client) { 
    const db = client.db(dbName);
    // Código a ejecutar usando db
    updateDocument(db, () => console.log("6-Actualizada la edad de Juan"))
    return db;
})
.then(function(db) {
    //Buscamos documentos
    findDocuments(db,() => console.log("7-Búsqueda finalizada"));
    return db;
 })
.then(function(db) {
  // Eliminamos todos los documentos
  deleteDocuments(db,() => console.log("6-Borrados"));
  return db;
})
.then(async function(db) {
  //Otra operación a realizar
  findDocuments(db, () => console.log("9- fin búsqueda"));
  db.close();
})
.catch(function (err) { console.log(err)});

const updateDocument = function(db, callback) {
    // Obtenemso la colección
    const collection = db.collection('alumnos');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ nombre : "Juan" }
    , { $set: { edad : 24 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("5 - He actualizado la edad de Juan a 24 años");
    callback(result);
  });  
}

const insertDocuments = function(db, callback) {
    // Obtenemos la colección de documentos
    const collection = db.collection('alumnos');
    // insertamos algunos documentos
    collection.insertMany([
      {nombre : "Carlos", "edad" : 37}, {nombre : "Juan", edad: 23}, {nombre : "María", edad: 30}
    ], function(err, result) {
        
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("1-Agregados tres alumnos al curso");
      callback(result);
    });
  }

  const findDocuments = function(db, callback) {
    // Obtenemos la colección de documentos
    const collection = db.collection('alumnos');
    // Buscamos algunos documentos
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      if (docs.length == 0) {
        console.log("7-No se han encontrado documentos");
      } else {
        console.log("3-Encontrados los siguientes registros");
        console.log(docs);
      }
      callback(docs);
    });
  }

  const deleteDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('alumnos');
    // Find some documents
    collection.deleteMany({}, function(err, result) {
      assert.equal(err, null);
    console.log("5-Eliminados todos los documentos");
    callback(result);
  });
}


  