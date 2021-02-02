DROP TABLE IF EXISTS services;
CREATE TABLE services (
    Id_service          INT PRIMARY KEY auto_increment,
    incident_log_id     INT,  
    fallo               TEXT NOT NULL,
    Id_operation        INT,
    start_dates         TIMESTAMP NOT NULL,
    end_date            TIMESTAMP NOT NULL,
    comments            TEXT
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE services ADD FOREIGN KEY (Id_operation) REFERENCES operations(Id_operation);

ALTER TABLE services ADD FOREIGN KEY (incident_log_id) REFERENCES incident_log(incident_log_id);