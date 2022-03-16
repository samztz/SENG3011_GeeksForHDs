import mainPageScraper from "../scraper/mainPageScraper.js";
import detailsScraper from "../scraper/detailsScraper.js";

/**
 * @swagger
 * /report:
 *  get:
 *    tags: [Report]
 *    summary: get all report from main page (default past 30 days)
 *    responses:
 *      '201':
 *        description: Success returned
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              - diseaseName: Salmonella Outbreak (Suspected or Confirmed)
 *                diseaseReports:
 *                  - '{"dateTime":"2022-03-15 14:44:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43634","country":"China","city":"Beijing","description":"CHINA - Growing Trend Of Salmonella In Pork In China"}'
 *                  - '{"dateTime":"2022-03-12 15:54:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43580","country":"United Kingdom","city":"Scunthorpe","description":"UNITED KINGDOM - Dog Food Recalled From Stores After Salmonella Found"}'
 *                  - '{"dateTime":"2022-03-10 16:18:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43545","country":"Mexico","city":"Chihuahua","description":"MEXICO - Salmonella Victims Hospitalized After Consuming Onions - Numerous Salmonella Lawsuits Resu"}'
 *                  - '{"dateTime":"2022-03-06 21:05:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43462","country":"United Kingdom","city":"London (UK)","description":"UNITED KINGDOM - John Lewis And Morrisons Recall Popular Food Due To Salmonella Fears – Do Not Consu"}'
 *      '400':
 *        description: Duplicate key
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'error message'
 */
const getReports = async (req, res) => {
  const result = await mainPageScraper();
  return res.json(result);
};

/**
 * @swagger
 * /report/country/{countryId}:
 *  get:
 *    tags: [Report]
 *    summary: get all report query from countryId
 *    parameters:
 *      - name: countryId
 *        in: path
 *        required: true
 *        schema: object
 *    responses:
 *      '201':
 *        description: Success returned
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              - diseaseName: Salmonella Outbreak (Suspected or Confirmed)
 *                diseaseReports:
 *                  - '{"dateTime":"2022-03-15 14:44:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43634","country":"China","city":"Beijing","description":"CHINA - Growing Trend Of Salmonella In Pork In China"}'
 *                  - '{"dateTime":"2022-03-12 15:54:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43580","country":"United Kingdom","city":"Scunthorpe","description":"UNITED KINGDOM - Dog Food Recalled From Stores After Salmonella Found"}'
 *                  - '{"dateTime":"2022-03-10 16:18:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43545","country":"Mexico","city":"Chihuahua","description":"MEXICO - Salmonella Victims Hospitalized After Consuming Onions - Numerous Salmonella Lawsuits Resu"}'
 *                  - '{"dateTime":"2022-03-06 21:05:00","detail":"http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43462","country":"United Kingdom","city":"London (UK)","description":"UNITED KINGDOM - John Lewis And Morrisons Recall Popular Food Due To Salmonella Fears – Do Not Consu"}'
 *      '400':
 *        description: Duplicate key
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'error message'
 */
const getReportsByCountryId = async (req, res) => {
  const { countryId } = req.params;
  const { start, end } = req.query;

  const result = await mainPageScraper();

  return res.json(result);
};

/**
 * @swagger
 * /report/city/{cityId}:
 *  get:
 *    tags: [Report]
 *    summary: get all report query from given cityId
 *    parameters:
 *      - name: cityId
 *        in: path
 *        required: true
 *        schema: object
 *    responses:
 *      '201':
 *        description: Success returned
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              - diseaseName: Salmonella Outbreak (Suspected or Confirmed)
 *                diseaseReports:
 *                  - url: http://outbreaks.globalincidentmap.com/xxx
 *                    date_of_publication: '2022-02-23 16:07:00'
 *                    country: United Kingdom
 *                    city: London
 *                    eventType: Salmonella Outbreak (Suspected or Confirmed)
 *                    location:
 *                      latitude: 51.507
 *                      longitude: -0.128
 *      '400':
 *        description: Duplicate key
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'error message'
 */
const getReportsByCityName = async (req, res) => {
  const { cityName } = req.params;
  const { start, end } = req.query;
  const result = await mainPageScraper();
  return res.json(result);
};

/**
 * @swagger
 * /report/detail/{reportId}:
 *  get:
 *    tags: [Report]
 *    summary: get a single report base on report ID
 *    parameters:
 *      - name: reportId
 *        in: path
 *        required: true
 *        schema: object
 *    responses:
 *      '201':
 *        description: Success returned
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              url: http://outbreaks.globalincidentmap.com/xxx
 *              date_of_publication: '2022-02-23 16:07:00'
 *              country: United Kingdom
 *              city: London
 *              eventType: Salmonella Outbreak (Suspected or Confirmed)
 *              location:
 *                latitude: 51.507
 *                longitude: -0.128
 *      '400':
 *        description: Duplicate key
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'error message'
 */
const getReportDetailById = async (req, res) => {
  const { id } = req.params;
  const result = detailsScraper(
    `http://outbreaks.globalincidentmap.com/eventdetail.php?ID=${id}`
  );
  return res.json(result);
};

export {
  getReports,
  getReportsByCountryId,
  getReportsByCityName,
  getReportDetailById,
};
