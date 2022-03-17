import dataSourceScraper from "../scraper/dataSourceScraper.js";
import detailsScraper from "../scraper/detailsScraper.js";

/**
 * @swagger
 * /report:
 *  get:
 *    tags: [Report]
 *    summary: get all report query from countryId
 *    parameters:
 *      - name: start_date
 *        in: query
 *        required: true
 *        type: string
 *        example: '2011-04-19T11:48:00'
 *      - name: end_date
 *        in: query
 *        required: true
 *        type: string
 *        example: '2022-03-16T09:38:00'
 *      - name: city
 *        in: query
 *        required: true
 *        type: string
 *        example: Canberra
 *      - name: country
 *        in: query
 *        required: true
 *        type: string
 *        example: AU
 *      - name: key_terms
 *        in: query
 *        required: true
 *        type: string
 *        example: Outbreak,Hantavirus
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
 */
const getReportsByQuery = async (req, res) => {
  const { start_date, end_date, city, country, key_terms } = req.query;
  const keyTerms = key_terms.split(",");
  console.log(
    `input = ${keyTerms} | ${start_date} | ${end_date} | ${city} | ${country}`
  );
  console.log(keyTerms);
  try {
    // const result = await dataSourceScraper(
    //   keyTerms,
    //   new Date(start_date),
    //   new Date(end_date),
    //   city,
    //   country
    // );
    // return res.json(result);
  } catch (e) {
    console.log(e.massage);
    return res.status(400).json(e.message);
  }
  const result = await dataSourceScraper(
    keyTerms,
    new Date(start_date),
    new Date(end_date),
    city,
    country
  );
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

export { getReportsByQuery, getReportDetailById };
