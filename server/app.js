import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';


// Create a top level instance of express
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 6000;
app.listen(port, () => {
  winston.info(`Server is live on PORT👍 : ${port}`);
});

export default app;
