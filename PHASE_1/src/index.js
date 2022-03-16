import express from 'express';
import morgan from 'morgan';
import logger from './config/winston.js'
import 'dotenv/config';
import indexRouter from './routes/index.route.js';


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  logger.info(`App is listening on ${PORT}`);
});