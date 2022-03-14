

// return most recent report
const getReports = async (req, res) => {
  const result = 'default query'
  return res.json(result);
  
}


const getReportByCountryCode = async (req, res) => {
  const { country } = req.params;
  const result = 'default query'

  return res.json(result);
}

const getReportsByCountryId = async (req, res) => {
  const { countryId } = req.params;
  const { start, end } = req.query; 

  const result = `query by Country Id ${countryId}`;

  return res.json(result);
}
const getReportsByCityName = async (req, res) => {
  const { cityName } = req.params;
  const { start, end } = req.query; 
  const result = `query by City Name: ${cityName}`;

  return res.json(result);
}

const getReportDetailById = async (req, res) => {
  const { reportId } = req.params;
  const result = `query detail from specific report ID: ${id}`;
  return res.json(result);
}

export default { getReports, getReportsByCountryId, getReportsByCityName };