DROP TABLE IF EXISTS internos;
create table internos
(
	id_internos int(15) AUTO_INCREMENT,
	pkfk_id_reporta varchar(50) not null,
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    incidente varchar(50) not null,
	pkfk_id_producto varchar(50) not null,
	origen varchar(50) not null,
	tramito varchar(20) not null,
	primary key (id_internos)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

insert into internos (id_internos,pkfk_id_reporta,fecha,incidente,pkfk_id_producto,origen,tramito)
values (1,1,now(),'IM2113432',4,'CORREO','LN'),
	   (2,2,now(),'IM2113507',2,'CORREO','LN'),
	   (3,3,now(),'IM2113518',1,'WH','LN');