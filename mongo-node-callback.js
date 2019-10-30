const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'curso';

mongo.connect(url, function(err,client) {
    if (err) throw new Error('No se ha podido conectar ' + err);
    const db = client.db(dbName);
    insertDocuments(db, function() {
        console.log("2-Insertados");
        findDocuments(db, function() {
            console.log("4-Búsqueda finalizada");
            deleteDocuments(db, function() {
                console.log("6-Borrados");
                findDocuments(db, function() {
                    console.log("9- fin búsqueda");
                    db.close();
                });
            });
        });
    });
});



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
        console.log("8-No se han encontrado documentos");
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


  