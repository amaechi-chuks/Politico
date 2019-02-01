import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './route/routes';
import winston from './config/winston';


// Create a top level instance of express
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 6000;

app.use(cors());
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Politico',
}));
app.get('/api/v1', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Politico API V1',
}));
app.use('/api/v1/', routes);

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Wrong endpoint. Such endpoint does not exist',
}));

app.listen(port, () => {
  winston.info(`Server is live on PORT👍 : ${port}`);
});

export default app;
