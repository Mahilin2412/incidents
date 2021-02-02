DROP TABLE IF EXISTS operations;
CREATE TABLE operations (
    Id_operation        INT PRIMARY KEY auto_increment,
    Name                VARCHAR(40) NOT NULL,
    Initials            VARCHAR(10) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


