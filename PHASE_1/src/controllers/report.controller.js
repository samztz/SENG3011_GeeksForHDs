import dataSourceScraper from "../scraper/dataSourceScraper.js";
import articleScraper from "../scraper/articleScraper.js";

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
 *              - url: https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/
 *                date_of_publication: 2020-01-17 xx:xx:xx
 *                headline: Novel Coronavirus – Japan (ex-China)
 *                main_text: On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.
 *                reports:
 *                  - event_date: 2020-01-03 xx:xx:xx to 2020-01-15
 *                    locations:
 *                      - country: China
 *                        location: Wuhan, Hubei Province
 *                      - country: Japan
 *                        location: ''
 *                    diseases:
 *                      - 2019-nCoV
 *                    syndromes:
 *                      - Fever of unknown Origin
 *              - url: https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/
 *                date_of_publication: 2020-01-17 xx:xx:xx
 *                headline: Novel Coronavirus – Japan (ex-China)
 *                main_text: On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.
 *                reports:
 *                  - event_date: 2020-01-03 xx:xx:xx to 2020-01-15
 *                    locations:
 *                      - country: China
 *                        location: Wuhan, Hubei Province
 *                      - country: Japan
 *                        location: ''
 *                    diseases:
 *                      - 2019-nCoV
 *                    syndromes:
 *                      - Fever of unknown Origin
 *              - url: https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/
 *                date_of_publication: 2020-01-17 xx:xx:xx
 *                headline: Novel Coronavirus – Japan (ex-China)
 *                main_text: On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.
 *                reports:
 *                  - event_date: 2020-01-03 xx:xx:xx to 2020-01-15
 *                    locations:
 *                      - country: China
 *                        location: Wuhan, Hubei Province
 *                      - country: Japan
 *                        location: ''
 *                    diseases:
 *                      - 2019-nCoV
 *                    syndromes:
 *                      - Fever of unknown Origin
 */
const getReportsByQuery = async (req, res) => {
  const { start_date, end_date, city, country, key_terms } = req.query;
  if (!start_date || !end_date || !city || !country || !key_terms) {
    return res.status(400).json({error:'input field missing.'});
  }
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
  const urls = await dataSourceScraper(
    keyTerms,
    new Date(start_date),
    new Date(end_date),
    country,
    city
  );
  const result = await articleScraper(urls)
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
 *        example: 43648
 *    responses:
 *      '201':
 *        description: Success returned
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              url: https://www.who.int/csr/don/17-january-2020-novel-coronavirus-japan-ex-china/en/
 *              date_of_publication: 2020-01-17 xx:xx:xx
 *              headline: Novel Coronavirus – Japan (ex-China)
 *              main_text: On 15 January 2020, the Ministry of Health, Labour and Welfare, Japan (MHLW) reported an imported case of laboratory-confirmed 2019-novel coronavirus (2019-nCoV) from Wuhan, Hubei Province, China. The case-patient is male, between the age of 30-39 years, living in Japan. The case-patient travelled to Wuhan, China in late December and developed fever on 3 January 2020 while staying in Wuhan. He did not visit the Huanan Seafood Wholesale Market or any other live animal markets in Wuhan. He has indicated that he was in close contact with a person with pneumonia. On 6 January, he traveled back to Japan and tested negative for influenza when he visited a local clinic on the same day.
 *              reports:
 *                - event_date: 2020-01-03 xx:xx:xx to 2020-01-15
 *                  locations:
 *                    - country: China
 *                      location: Wuhan, Hubei Province
 *                    - country: Japan
 *                      location: ''
 *                  diseases:
 *                    - 2019-nCoV
 *                  syndromes:
 *                    - Fever of unknown Origin
 *      '400':
 *        description: artical id not found
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'artical id not found'
 */
const getReportDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await articleScraper(
      [`http://outbreaks.globalincidentmap.com/eventdetail.php?ID=${id}`]
      );
      return res.json(result);
  } catch(e) {
    return res.status(404).json('artical id not found');
  }
};

export { getReportsByQuery, getReportDetailById };
