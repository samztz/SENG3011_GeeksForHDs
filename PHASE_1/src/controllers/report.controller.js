import mainPageScraper from "../scraper/mainPageScraper.js";
import detailsScraper from "../scraper/detailsScraper.js";
import Country_city_scraper from "../scraper/country_city_scraper.js";

// return most recent report in default 30 days
const getReports = async (req, res) => {
  const result = await mainPageScraper();
  return res.json(result);
};

// get report from countryId, option start, end date in query parameter
const getReportsByCountryId = async (req, res) => {
  const { countryId } = req.params;
  const { start, end } = req.query;

  const result = await mainPageScraper();

  return res.json(result);
};

// get reports by city name, option start, end date in query parameter
const getReportsByCityName = async (req, res) => {
  const { cityName } = req.params;
  const { start, end } = req.query;
  const result = await mainPageScraper();
  return res.json(result);
};

// get JSON report detail from specific report Page
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
