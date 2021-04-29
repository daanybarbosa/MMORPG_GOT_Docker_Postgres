function UsuariosDAO(pool){
	this.pool = pool;
}

/*
UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection(function(err, mongoclient){
		mongoclient.collection("mongodb://localhost:27017/got", function(err, collection){
			if(err){
				console.log(err);
			}

			console.log(collection);

			if(connection){
				console.log("inserir usuario Ok ");
				var collectionName = "usuarios";
				var collection = collection.collection(collectionName);

				if(!connection){
					console.log("Erro na collection")
				}

				collection.insert(usuario), function(err, res){
					if(err) console.log(err);
					else console.log("ok");

				collection.close();
				}
			}
		});
	});
};*/


UsuariosDAO.prototype.inserirUsuario = function(usuario){
	let insert = 'insert into usuarios(nome, usuario, senha, casa)';
	    insert += 'values ($1, $2, $3, $4)';
	
	let params = [usuario.nome, usuario.usuario, usuario.senha, usuario.casa];

	this.pool.query(insert, params, function(error, result) {
		console.log("sucesso");
	});
};


UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	let sql = ' select * from usuarios where usuario = $1 and senha = $2 ';

	let params = [usuario.usuario, usuario.senha];

	this.pool.query(sql, params, function(error, result) {
		console.log(result.rows);
		if(result.rows[0] != undefined){
			let usuario = result.rows[0];

			req.session.autorizado = true;

			req.session.usuario = usuario;
			req.session.casa = usuario.casa
		}

		if(req.session.autorizado){
			res.redirect("jogo");
		} else {
			res.render("index", {validacao: {}});
		};

	});

	/*this._connection.open(function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray(function(err, result){

				if(result[0] != undefined){

					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}

				if(req.session.autorizado){
					res.redirect("jogo");
				} else {
					res.render("index", {validacao: {}});
				};
			});
			mongoclient.close();
		});
	});*/
};
module.exports = function(){
	return UsuariosDAO;
};