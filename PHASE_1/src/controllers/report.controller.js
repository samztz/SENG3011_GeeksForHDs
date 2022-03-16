import mainPageScraper from "../scraper/mainPageScraper.js";
import detailsScraper from "../scraper/detailsScraper.js";

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
 *                  - url: http://outbreaks.globalincidentmap.com/xxx
 *                    date_of_publication: '2022-02-23 16:07:00'
 *                    country: United Kingdom
 *                    city: London
 *                    eventType: Salmonella Outbreak (Suspected or Confirmed)
 *                    location:
 *                      latitude: 51.507
 *                      longitude: -0.128
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
const getReportsByQuery = async (req, res) => {
  const { start_date, end_date, city, country, key_tearm } = req.query;

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
  getReportsByQuery,
  getReportDetailById,
};
