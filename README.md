# controle-financeiro-react
Este repositório é o desafio final do curso Bootcamp IGTI: Desenvolvimento Full Stack, realizado entre Julho e Setembro de 2020.
O projeto consiste em criar uma aplicação web para Controle Financeiro Pessoal com MongoDB + Node.js + React e implantação no Heroku.

Veja o projeto implantado em https://tds-desafio-final.herokuapp.com/ (Aviso: o banco de dados pode não estar acessível).

## Como Usar

1. Clone o repositório

        git clone https://github.com/thiagodecasantiago/controle-financeiro-react.git
        cd controle-financeiro-react

2. Instale as dependências

        yarn

3. Crie um arquivo de configuração de ambiente .env. (É fornecido o arquivo example.env como exemplo)

        ##.env
        DB_CONNECTION="String de conexão com um servidor mongoDB"

4. Inicialize o servidor de dados

        yarn server

5. Inicialize a aplicação web

        cd client
        yarn start
        
6. TA-DA!

![Screenshot da tela principal do projeto](/assets/images/screenshot1.png)
