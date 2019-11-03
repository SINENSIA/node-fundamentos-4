const mysql = require('mysql');

const options = {
    user: 'usrcurso',
    password: '_@Object00',
    database: 'curso',
    insecureAuth: true
}

const connection = mysql.createConnection(options);

connection.connect(function(error) {
    if(error) {
        return console.error(error.message);
    }
    console.log("Conexión satisfactoria");
});

/*var sql = "CREATE TABLE alumnos (nombre VARCHAR(255), edad INT)";
connection.query(sql, function (error, result) {
  if (error) return console.error(error);
  console.log("Tabla creada");
});*/

const alumno = {
    nombre : 'Carlos',
    edad: 37
}
connection.query('INSERT INTO alumnos SET ?', alumno, (error, results, fields) => {
  if (error) {
    return console.error('Ha ocurrido un error al ejecutar la consulta: ' + error.message)
     
  }
  connection.end();
});

const query = connection.query(
  'SELECT * FROM alumnos WHERE nombre=?',alumno.nombre, (error, result, fields) => {
    if (error) {
        return console.error('Ha ocurrido un error al ejecutar la consulta: ' + error.message + " " + error.sql)
    }
    console.log(result);
  })
  console.log(query.sql); // POdemos registrar la consulta resultante con query.sql

  
  connection.query('DELETE FROM alumnos WHERE nombre=?', alumno.nombre, (error, result, fields) => {
    if (error) {
        return console.error('Ha ocurrido un error al ejecutar la consulta: ' + error.message + " " + error.sql)
    }
    console.log("Filas afectadas: " + result.affectedRows);
  })

  

