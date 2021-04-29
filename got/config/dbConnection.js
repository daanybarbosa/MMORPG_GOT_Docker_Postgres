//importar o MongoDB
/*const mongoose = require('mongoose');

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=got`;

mongoose.connect(url, options).then( function() {
    console.log('MongoDB está conectado');
  })
    .catch( function(err) {
    console.log(err);
  });

module.exports = function(){
	return connMongoDB;
}*/


// importar o MongoDB
/*const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });

var mongoClient = function() {
	return client;
}

module.exports = function(){
	return mongoClient;
}

*/

/*
const mongo = require('mongodb');

var connMongoDB = function(){
	console.log('Entrou na função de conexão');
	var db = new mongo.Db(
		'got',
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			27017, //porta de conexão
			{}
		),
		{}
	);
	return db;
}
module.exports = function(){
	return connMongoDB;
}*/
const Pool = require('pg').Pool;

var connectPg = function() {
	const pool = new Pool({
  		user: 'postgres',
  		host: 'localhost',
  		database: 'got',
  		password: '123456',
  		port: 5432
	});
	return pool;
};

module.exports = function(){
    return connectPg;
}
