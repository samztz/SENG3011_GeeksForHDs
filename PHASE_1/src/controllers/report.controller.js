// return most recent report in default 30 days
const getReports = async (req, res) => {
  const result = 'default report query'
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