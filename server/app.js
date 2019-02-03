import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import routes from './route/routes';
import winston from './config/winston';

// Create a top level instance of express
const app = express();


app.use(cors({ credentials: true, origin: true }));
// eslint-disable-next-line no-undef
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 6000;

app.use(cors());
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Politico',
}));

// Application home page
app.get('/api/v1', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Politico API V1',
}));

// valid route
app.use('/api/v1/', routes);

// invalid route
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'check documentation, "/docs"',
}));

app.listen(port, () => {
  winston.info(`Server is live on PORT👍 : ${port}`);
});

export default app;
