DROP TABLE IF EXISTS products;
CREATE TABLE products (
    product_id INT NOT NULL AUTO_INCREMENT,
    name_product VARCHAR(50) NOT NULL,
    acronym_product VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(product_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO products(product_id,name_product,acronym_product,created_at) VALUES
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
(NULL,"Autenticador empresas","ATE",now());

UPDATE products SET name_product = convert(cast(convert(name_product using latin1) as binary) using utf8);
