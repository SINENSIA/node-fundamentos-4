
// Necesitamos dotenv para cargar las credenciales
require('dotenv').config();

const mongoose = require('mongoose');

/** En esta url usamos una conexión con autenticación
 * Para configurar la base de datos curso con el usuario
 * que incluyan en el fichero .env
 * Debes abrir el cliente mongo e introducir las siguientes órdenes
 * 
> use curso
switched to db curso

> db.createUser({ user: "admin",
... pwd: passwordPrompt(),
... roles: [ "readWrite" ] })
Enter password:
Successfully added user: { "user" : "admin", "roles" : [ "readWrite" ] }
>
*/
 
const url = `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASS)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
console.log(url);
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log("Conectado");
});
const alumnoSchema = new mongoose.Schema({
    nombre: String,
    edad: Number
  });

alumnoSchema.methods.hola = function () {
    const saludo = this.nombre
    ? "Me llamo " + this.nombre
    : "Aún no tengo nombre";
   console.log(saludo);
}

const Alumno = mongoose.model('Alumno', alumnoSchema);

const david = new Alumno({ nombre: 'David', edad: 37 });
const carlos = new Alumno({ nombre: 'Carlos', edad: 37 });

david.save(function (err, david) {
    if (err) return console.error(err);
    david.hola();
});
carlos.save(function (err, carlos) {
    if (err) return console.error(err);
    carlos.hola();
});

Alumno.find(function (err, alumnos) {
    if (err) return console.error(err);
    console.log(alumnos);
});




