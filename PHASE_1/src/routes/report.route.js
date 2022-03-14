import express from 'express';
import { getReports, getReportsByCountryId, getReportsByCityName, getReportDetailById } from '../controllers/report.controller.js';


const reportRouter = express.Router();
reportRouter.get('/', getReports)
reportRouter.get('/country/:countryId', getReportsByCountryId)
reportRouter.get('/city/:cityName', getReportsByCityName)
reportRouter.get('/detail/:id', getReportDetailById)
