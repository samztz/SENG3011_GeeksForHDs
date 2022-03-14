import express from 'express';
import {getReports} from '../controllers/report.controller.js';


const reportRouter = express.Router();
reportRouter.get('/', reportController)
reportRouter.get('/country/:countryId', reportControllerById)
reportRouter.get('/city/:cityName', reportController)
reportRouter.get('/detail/:id', getreportByID)
