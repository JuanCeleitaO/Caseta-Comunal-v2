/// ESTE ARCHIVO ES SOLO PARA GENERAR NUEVAS CONTRASEÑAR CON UN HASH
// EL HASH GENERADO SE DEBE COPIAR Y PEGAR EN LA BASE DE DATOS SQL PARA LOS ADMINS

const bcrypt = require('bcryptjs');

const password = 'contraseña123'; 
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log(`Contraseña: ${password}`);
console.log(`Nuevo Hash para SQL: ${hash}`);