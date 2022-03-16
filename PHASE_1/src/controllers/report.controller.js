// import mainPageScraper from "../scraper/mainPageScraper.js";
// import detailsScraper from "../scraper/detailsScraper.js";
// import Country_city_scraper from "../scraper/country_city_scraper.js";

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
 *              _id: 61da409632c8196efc5dd789
 *              email: ante@aol.net
 *              firstName: Caleb Collins
 *              lastName: Baxter Burt
 *              dob: '1996-02-28T00:00:00.000Z'
 *              phone: (06) 5828 5812
 *              notification:
 *                - email
 *              address:
 *                street: '245 George St'
 *                city: 'Syndey'
 *                state: 'NSW'
 *                postcode: '2000'
 *              gender: Male
 *              totalSpent: 0
 *              orderAccumulation: 0
 *              __v: 0
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
  // const result = await mainPageScraper();
  return res.json(result);

}

// get report from countryId, option start, end date in query parameter
const getReportsByCountryId = async (req, res) => {
  const { countryId } = req.params;
  const { start, end } = req.query; 

  const result = `query by Country Id ${countryId}`;

  return res.json(result);
}

// get reports by city name, option start, end date in query parameter
const getReportsByCityName = async (req, res) => {
  const { cityName } = req.params;
  const { start, end } = req.query; 
  const result = `query by City Name: ${cityName}`;

  return res.json(result);
}

// get JSON report detail from specific report Page
const getReportDetailById = async (req, res) => {
  const { id } = req.params;
  const result = `query detail from specific report ID: ${id}`;
  return res.json(result);
}

export { getReports, getReportsByCountryId, getReportsByCityName, getReportDetailById };