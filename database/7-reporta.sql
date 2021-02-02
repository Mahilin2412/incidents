DROP TABLE IF EXISTS reporta;
CREATE TABLE reporta (
pro_id INT NOT NULL AUTO_INCREMENT,
name_pro VARCHAR(50) NOT NULL,
acronym_product VARCHAR(3) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY(pro_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO reporta (pro_id,name_pro,acronym_product,created_at) VALUES
(NULL,"Banca Móvil","BM",now()),
(NULL,"Banca Virtual","BV",now()),
(NULL,"CDT","CDT",now()),
(NULL,"Equipo de seguridad","SG",now()),
(NULL,"Crédiservice","CS",now()),
(NULL,"Credito de consumo/Libre destino","CC",now()),
(NULL,"Cuentas digitales/Ahorro","CD",now()),
(NULL,"DevOps","DO",now()),
(NULL,"Desarrollos transversales","DT",now()),
(NULL,"Financiación de vivienda","HC",now()),
(NULL,"Libranza","PL",now()),
(NULL,"Mobilidad de Microfinanzas/Microcrédito","MM",now()),
(NULL,"Seguros digitales","SD",now()),
(NULL,"Servicio Pos-venta en Oficinas","PV",now()),
(NULL,"Tarjetas de crédito","TC",now()),
(NULL,"Vehículos","VD",now()),
(NULL,"Digitalización","DG",now()),
(NULL,"PYMES","PY",now()),
(NULL,"Transferencias Moviles/Transfiya","TM",now()),
(NULL,"Soluciones Aliados e-commerce","AE",now()),
(NULL,"Omnicanalidad","OC",now()),
(NULL,"PSE (Pagos en linea)","PSE",now()),
(NULL,"Portal empresas","PE",now()),
(NULL,"Autenticador empresas","ATE",now()),
(NULL,"staf","",now()),
(NULL,"staff","",now()),
(NULL,"IMPACTO DIGITAL","",now()),
(NULL,"Microfinanza","",now()),
(NULL,"DUCC","",now()),
(NULL,"MANTIZ","",now()),
(NULL,"DVOPS","",now()),
(NULL,"Contraloria","",now()),
(NULL,"staf","",now()),
(NULL,"staff","",now()),
(NULL,"IMPACTO DIGITAL","",now()),
(NULL,"Microfinanza","",now()),
(NULL,"DUCC","",now()),
(NULL,"MANTIZ","",now()),
(NULL,"DVOPS","",now()),
(NULL,"Contraloria","",now());