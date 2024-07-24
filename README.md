# Cadastro de Pets usando Spring Boot e React

Este é um projeto de cadastro de pets desenvolvido com Spring Boot para o backend e React para o frontend.

## Como rodar o projeto?

Para rodar o projeto, siga os passos abaixo:

### Pré-requisitos:

- Java JDK (Versão mínima 17)
- IDE de sua preferência (Eclipse, IntelliJ, etc.)
- Maven
- Lombok
- Docker
- Node.js (Versão 18.17.0 ou superior)

### Passos:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/NKLzT/Cadastro-de-Pets-Spring-Bot---React.git
   cd Cadastro-de-Pets-Spring-Bot---React
   
2. **Construção da Imagem Docker:**
Certifique-se de que você está no diretório onde está o Dockerfile e execute o comando para construir a imagem Docker:

bash
docker-compose up --build .
Substitua nome-da-imagem pelo nome que você deseja dar à sua imagem Docker.

Executando o Contêiner:
Depois que a imagem for construída com sucesso, você pode executar o contêiner:


Certifique-se de ajustar os caminhos e comandos conforme necessário.
Isso deve resolver o problema do diretório não encontrado e permitir que seu aplicativo React seja executado corretamente dentro do contêiner Docker.
