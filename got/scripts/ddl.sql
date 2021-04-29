CREATE USER postgres;

CREATE DATABASE got;
GRANT ALL PRIVILEGES ON DATABASE got TO postgres;

create table usuarios( 
	id_usuario serial primary key, 
	nome varchar(200) not null,
	usuario varchar(15) not null, 
	senha varchar(15) not null,
	casa varchar(30) not null
); 

create table jogo(
	id_jogo serial primary key,
	id_usuario int,
	moeda decimal(10,2),
	suditos int,
	temor float,
	sabedoria float,
	comercio float,
	magia float,
	foreign key (id_usuario) references usuarios (id_usuario)
);

create table acao(
	id_acao serial primary key,
	id_jogo int, 
	id_usuario int,
	date timestamp,
	tempo float,
	acao_termina_em timestamp,
	momento_atual timestamp,
	foreign key (id_jogo) references jogo (id_jogo),
	foreign key (id_usuario) references usuarios (id_usuario)
);

insert into jogo(id_usuario, moeda, suditos, temor, sabedoria, comercio, magia)
values (2, 15, 10, 1000, 1000, 1000, 1000);



