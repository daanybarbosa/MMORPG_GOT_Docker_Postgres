const Pool = require('pg').Pool;
const database = require('./dbConnection');
const connectPg = database.connectPg;

var client = new pg.Client(connectPg);
client.connect();

client.query("CREATE TABLE usuarios(id_usuario serial primary key, ",
    query += " nome varchar(200) not null, ",
    query += " usuario varchar(15) not null, ", 
    query += " senha varchar(15) not null, ",
    query += " casa varchar(30) not null " 
);

client.query(" CREATE TABLE create table jogo( ",
    query += " id_jogo serial primary key, ",
    query += " id_usuario int, ",
    query += " moeda decimal(10,2), ",
    query += " suditos int, ",
    query += " temor float, ",
    query += " sabedoria float, ",
    query += " comercio float, ",
    query += " magia float, ",
    query += " foreign key (id_usuario) references usuarios (id_usuario) ",
);

client.query(" INSERT INTO jogo(id_usuario, moeda, suditos, temor, sabedoria, comercio, magia) ",
    query += " values (2, 15, 10, 1000, 1000, 1000, 1000); " 
);

var query = client.query("SELECT * FROM usuarios");

query.on('row', function(row) {
    console.log(row);
});

console.log('DB Feito!');

query.on('end', function() {
    client.end();
});