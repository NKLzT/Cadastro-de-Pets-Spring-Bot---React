CREATE TABLE animal (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nome VARCHAR(255) NOT NULL,
                        descricao TEXT,
                        url_imagem VARCHAR(255),
                        categoria VARCHAR(50),
                        data_nascimento DATE,
                        status VARCHAR(20)
);
