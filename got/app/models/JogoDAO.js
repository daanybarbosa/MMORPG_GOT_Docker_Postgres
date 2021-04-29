function JogoDAO(pool){
	this.pool = pool;
}

JogoDAO.prototype.gerarParametros = function(usuario){
	let insert = ' insert into jogo(id_usuario, moeda, suditos, temor, sabedoria, comercio, magia) '
		insert += ' values ($1, $2, $3, $4, $5, $6, $7); '

	let moeda = 15;
	let suditos = 10;
	let temor = Math.floor(Math.random() * 1000);
	let sabedoria = Math.floor(Math.random() * 1000);
	let comercio = Math.floor(Math.random() * 1000); 
	let magia = Math.floor(Math.random() * 1000);

	let params = [usuario.usuario, usuario.moeda, usuario.suditos, usuario.temor, usuario.sabedoria, usuario.comercio, usuario.magia];
	
	this.pool.query(insert, params, function(err, result){
		console.log("jogo salvo")
	});
};

/*
	this._connection(function(err, mongoclient){
		mongoclient.collection("jogo", function(err, collection){
			console.log('Erro: '+ err);

			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});

			mongoclient.close();
		});
	});
}
*/

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
	let sql = ' select * from jogo where id_usuario = $1 '
	console.log(usuario);
	this.pool.query(sql, [usuario.id_usuario], (err, result) => {
		console.log(result);
		res.render("jogo", {img_casa: casa, jogo: result.rows[0], msg : msg});
	})

	/*this._connection(function(err, mongoclient){
		mongoclient.collection("jogo", function(err, collection){
			collection.find({usuario : usuario}).toArray(function(err, result){
				res.render("jogo", {img_casa: casa, jogo: result[0], msg : msg});
				
				mongoclient.close();
			});
		});
	});
}
*/

JogoDAO.prototype.acao = function(acao){
	let insert = ' insert into acao(date, tempo, acao_termina_em) '
		insert += ' values($1, $2, $3); '

	let date = new Date();
	let tempo = null;

	switch(parseInt(acao.acao)){
		case 1: tempo = 1 * 60 * 60000; break;
		case 2: tempo = 2 * 60 * 60000; break;
		case 3: tempo = 5 * 60 * 60000; break;
		case 4: tempo = 5 * 60 * 60000; break;
	}	

	acao.acao_termina_em = date.getTime() + tempo;

	var moedas = null;

			switch(parseInt(acao.acao)){
				case 1: moedas = -2 * acao.quantidade; break;
				case 2: moedas = -3 * acao.quantidade; break;
				case 3: moedas = -1 * acao.quantidade; break;
				case 4: moedas = -1 * acao.quantidade; break;
			}	

	let params = [acao.acao, acao.date, acao.tempo, acao.acao_termina_em];

	this.pool.query(" select * from jogo where id_usuario = $1 ", [acao.idUsuario], function(e, r) {
		if (!e) {
			let usuario = r.rows[0];
		    console.log(usuario);
		}
	})

	this.pool.query(insert, params, function(err, result){
		console.log("acao Ok")

		let update = ' update jogo set (usuario, moeda) values ($1, $2) '
		update += ' where usuario = $1 '

		let newParams = [acao.idUsuario, moedas];

		this.pool.query(update, newParams, function(err, result){
			console.log("jogo atualizado")
		})
	});
}
	
	/*
	this._connection(function(err, mongoclient){
		mongoclient.collection("acao", function(err, collection){
			
			var date = new Date();

			var tempo = null;
			
			switch(parseInt(acao.acao)){
				case 1: tempo = 1 * 60 * 60000; break;
				case 2: tempo = 2 * 60 * 60000; break;
				case 3: tempo = 5 * 60 * 60000; break;
				case 4: tempo = 5 * 60 * 60000; break;
			}	

			acao.acao_termina_em = date.getTime() + tempo;
			collection.insert(acao);

		});

		mongoclient.collection("jogo", function(err, collection){

			var moedas = null;

			switch(parseInt(acao.acao)){
				case 1: moedas = -2 * acao.quantidade; break;
				case 2: moedas = -3 * acao.quantidade; break;
				case 3: moedas = -1 * acao.quantidade; break;
				case 4: moedas = -1 * acao.quantidade; break;
			}	

			collection.update(
				{ usuario: acao.usuario},
				{ $inc: {moeda: moedas}}
			);

			mongoclient.close();
		});
	});
}*/

JogoDAO.prototype.atualizaAcao = function(acao, callback){
	let date = new Date();
		let momento_atual = date.getTime();

		let sql = ' select * from acao where acao_termina_em > $1 and id_acao = $2'

		let params = [momento_atual, acao.id_acao];

		console.log('pool 2')
		console.log(this.pool);
		this.pool.query(sql, params, callback);
}
/*
JogoDAO.prototype.getAcoes = function(usuario, res){
	console.log("acoes")
	console.log(this.pool);
	console.log(usuario.id_usuario)
	let dao = new JogoDAO(this.pool);

	this.pool.query(" select * from acao where id_usuario = $1 ", [usuario.id_usuario], function(err, result) {
		let acao = result.rows[0];

		console.log('aqui')
		
		dao.atualizaAcao(acao, function(e, r) {
			console.log(e);
			res.render("pergaminhos", {acoes: {}});
			console.log("OK")
		});
	});
}
*/
/*
	let sql = ' select * from jogo where id_usuario = $1 '
	console.log(usuario);
	this.pool.query(sql, [usuario.id_usuario], (err, result) => {
		console.log(result);
		res.render("jogo", {img_casa: casa, jogo: result.rows[0], msg : msg});
	})
	*/
	/*this._connection(function(err, mongoclient){
		mongoclient.collection("acao", function(err, collection){
			
			var date = new Date();
			var momento_atual = date.getTime();

			collection.find({usuario : usuario, acao_termina_em: {$gt:momento_atual}}).toArray(function(err, result){
				
				res.render("pergaminhos", {acoes: result});
				
				mongoclient.close();
			});
		});
	});*/
}

JogoDAO.prototype.revogarAcao = function(_id, res){
	




	/*
	this._connection(function(err, mongoclient){
		mongoclient.collection("acao", function(err, collection){
			collection.remove(
				{_id : ObjectID(_id)},
				function(err, result){
					res.redirect("jogo?msg=D");
					mongoclient.close();
				}
			);			
		});
	});
	*/
}

module.exports = function(){
	return JogoDAO;
}