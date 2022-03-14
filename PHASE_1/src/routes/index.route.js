import express from 'express';
import IndexController from '../controllers/index.controller.js';
import reportRouter from './report.route.js';

const indexRouter = express.Router();
indexRouter.get('/', IndexController);
indexRouter.use('/report', reportRouter);

export default indexRouter;

