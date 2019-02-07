import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import routes from './route/routes';
import winston from './config/winston';
import swaggerDocument from '../swagger.json';

// Create a top level instance of express
const app = express();


// set port for server to listen on
const port = process.env.PORT || 6000;

// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '50mb' }));

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use(cors());

app.get('/', (req, res) => res.sendFile('../frontend/index.html'));


app.use('/api/v1/', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// invalid route
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'check documentation, "/docs"',
}));

app.listen(port, () => winston.info(`Application started on port👍 ${port}, ${process.cwd()}, ${__dirname}`));

export default app;
