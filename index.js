import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from './assets/docs/doc.js';

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /docs e veja a documentação',
  });
});

/**
 * Rota da documentação
 */
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/**
 * Rotas de erro
 */
app.get('/transaction/', (_, response) => {
  response.send({
    message: "Você quis dizer '/api/transaction' ? ",
  });
});
app.get('/docs/', (_, response) => {
  response.send({
    message: "Você quis dizer '/api/docs' ? ",
  });
});

const dbConnectionMiddleware = function (_, res, next) {
  if (connectedToMongoDB) next();
  else {
    res.status(404).send({
      error: 'O serviço não está conectado ao banco de dados.',
    });
  }
};

app.use(dbConnectionMiddleware);

/**
 * Rotas principais do app
 */
app.use('/api/transaction', routes);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;
let connectedToMongoDB;

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');
});
/**
 * Definição de porta e
 * inicialização do app
 */
const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
