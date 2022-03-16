import express from 'express';
import {  getReportsByQuery, getReportDetailById } from '../controllers/report.controller.js';

const reportRouter = express.Router();
reportRouter.get('/', getReportsByQuery);
reportRouter.get('/detail/:id', getReportDetailById);

export default reportRouter;