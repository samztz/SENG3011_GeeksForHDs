import express from 'express';
import IndexController from '../controllers/index.controller.js'

const indexRouter = express.Router();
indexRouter.get('/', IndexController);

export default indexRouter;

