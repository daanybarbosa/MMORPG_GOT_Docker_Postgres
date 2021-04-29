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

insert into jogo(id_usuario, moeda, suditos, temor, sabedoria, comercio, magia)
values (2, 15, 10, 1000, 1000, 1000, 1000);


