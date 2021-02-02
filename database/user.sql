DROP  TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_names VARCHAR(60) NOT NULL,
    user_surnames VARCHAR(60) NOT NULL,
    name_user VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    password_user VARCHAR (225) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


