const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'curso';

const connection = mongo.connect(url);

connection
.then(async function (client) { 
    const db = client.db(dbName);
    await insertDocuments(db, () => console.log("2-Insertados"));
    await findDocuments(db,() => console.log("4-Búsqueda finalizada"));
    await deleteDocuments(db,() => console.log("6-Borrados"));
    await findDocuments(db, () => console.log("8- fin búsqueda"));
    db.close();
})
.catch(function (err) { console.log(err)});

const insertDocuments = async function(db, callback) {
    // Obtenemos la colección de documentos
    const collection = db.collection('alumnos');
    // insertamos algunos documentos
    await collection.insertMany([
      {nombre : "Carlos", "edad" : 37}, {nombre : "Juan", edad: 23}, {nombre : "María", edad: 30}
    ], function(err, result) {
        
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("1-Agregados tres alumnos al curso");
      callback(result);
    });
  }

  const findDocuments = async function(db, callback) {
    // Obtenemos la colección de documentos
    const collection = db.collection('alumnos');
    // Buscamos algunos documentos
    await collection.find({}).toArray(function(err, docs) {
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
  const deleteDocuments = async function(db, callback) {
    // Get the documents collection
    const collection = db.collection('alumnos');
    // Find some documents
    await collection.deleteMany({}, function(err, result) {
      assert.equal(err, null);
    console.log("5-Eliminados todos los documentos");
    callback(result);
  });
}


  