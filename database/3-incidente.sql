DROP TABLE IF EXISTS incidente;
create table incidente
(
id int(15) AUTO_INCREMENT,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
fk_incidente int,
relacionado varchar(50) not null,
usuario varchar(50) not null,
pkfk_id_producto int,
primary key (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE incidente ADD FOREIGN KEY (fk_incidente) REFERENCES incident_log(incident_log_id);
ALTER TABLE incidente ADD FOREIGN KEY (pkfk_id_producto) REFERENCES products(product_id);

insert into incidente (id,fecha,fk_incidente,relacionado,usuario,pkfk_id_producto)
values  (1,now(),1,'N/A','ER',1),
  		(2,now(),2,'N/A','ER',1),
  		(3,now(),3,'N/A','ER',2),
  		(4,now(),4,'N/A','JC',1),
  		(5,now(),5,'N/A','ER',1),
  		(6,now(),6,'N/A','JC',3),
  		(7,now(),7,'N/A','JC',4),
  		(8,now(),8,'N/A','JC',5),
  		(9,now(),9,'N/A','JC',4),
  		(10,now(),10,'N/A','ER',1),
  		(11,now(),11,'N/A','ER',4),
  		(12,now(),12,'N/A','ER',1),
  		(13,now(),13,'N/A','JC',3),
  		(14,now(),14,'N/A','JC',1),
  		(15,now(),15,'N/A','ER',1);