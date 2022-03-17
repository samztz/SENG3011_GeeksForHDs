import puppeteer from 'puppeteer';

async function scraper(page, keyTerm, country) {
    // wait until dropdowns are loaded
    await page.waitForSelector("select[name='type'], select[name='country']");

    // using xpath here because this dropdown is stupid and need to select by text instead of value
    if (keyTerm != '') {
        const option = (await page.$x(`//select[@name="type"]/option[text() = "${keyTerm}"]`))[0];
        const value = await (await option.getProperty('value')).jsonValue();
        await page.select("select[name='type']", value);
    }

    // select country
    await page.select("select[name='country']", country);
    await page.click('input#search');
    console.log("waiting for page reload");
    await page.waitForTimeout(5000);
    console.log("page reloaded!");

    // scrape results
    let scraped = await page.evaluate(async() => {
        let items = [];
        let table = document.getElementsByTagName("table")[18].rows;
        
        for (let i = 1; i < table.length; i++) {
            let currRow = table[i];
            let type = currRow.cells[0].textContent;
            let detail = currRow.cells[1].children[0].href;
            let dateTime = currRow.cells[2].textContent;
            let country = currRow.cells[3].textContent;
            let city = currRow.cells[4].textContent;
            let description = currRow.cells[5].textContent;

            items.push({
                type: type,
                detail: detail,
                dateTime: dateTime,
                country: country,
                city: city,
                description: description,
            })
        }
        return items;
    });
    return scraped;
}

/**
 * 
 * @param {String[]} keyTerms - array of key terms to search for, can be generic or specific
 * @param {Date} timeStart - start date and time of time period to search for
 * @param {Date} timeEnd - end date and time of time period to search for
 * @param {String} country - country to search for
 * @param {String} city - city to search for
 * @returns - array of links to articles matching input params
 */

function dataSourceScraper(keyTerms, timeStart, timeEnd, country, city) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: true,
				args: ['--no-sandbox', '--disable-setuid-sandbox'],	
			});
            const page = await browser.newPage();
            page.on('pageerror', (err) => {
                console.error(err);
            });
            
            // removes timeout error
            await page.setDefaultNavigationTimeout(0); 
            
            await page.goto("http://outbreaks.globalincidentmap.com/");

            // array to store all links to articles that match search terms
            let results = [];
            //let keyTermsString = ;
            let keyTermsJSON = {
                "generic": [
                    "Outbreak",
                    "Infection",
                    "Fever",
                    "Virus",
                    "Epidemic",
                    "Infectious",
                    "Illness",
                    "Bacteria",
                    "Emerging",
                    "Unknown virus",
                    "Mysterious disease",
                    "Mystery disease"
                ],
                "specific": [
                    "Zika",
                    "MERS",
                    "Salmonella",
                    "Legionnaire",
                    "Measles",
                    "Anthrax",
                    "Botulism",
                    "Plague",
                    "Smallpox and other related pox viruses",
                    "Tularemia",
                    "Junin Fever",
                    "Machupo Fever",
                    "Guanarito Fever",
                    "Chapare Fever",
                    "Lassa Fever",
                    "Lujo Fever",
                    "Hantavirus",
                    "Rift Valley Fever",
                    "Crimean Congo Hemorrhagic Fever",
                    "Dengue",
                    "Ebola",
                    "Marburg"
                ]
            };

            // for each keyTerm in keyTerms, check if keyTerm is generic or specific
            // if generic keyTerm, scrape whole page based on what matches key term
            // if specific keyTerm, change dropdown

            // check if keyterm is generic or specific
            for (let keyTerm of keyTerms) {
                let searchTerm;

                // if keyTerm is specific
                if (keyTermsJSON.specific.includes(keyTerm)) {
                    console.log("specific term");
                    searchTerm = keyTerm;

                // if keyterm is generic/none given
                } else if (keyTerm == '' || keyTermsJSON.generic.includes(keyTerm)) {
                    console.log("generic/no term");
                    searchTerm = '';

                // if unknown keyTerm given
                } else {
                    console.log(`error, keyterm is: ${keyTerm}`);
                    return;
                }

                // scrape page
                // first filter results by country, then scrape only results that match city (if given) and time period
                let scrapedResults = await scraper(page, searchTerm, country);

                // select results that match time period, then city (if given)
                for (let article of scrapedResults) {
                    let currDateTime = new Date(article.dateTime);
                    let currCity = article.city;

                    // check if article within time period
                    if (currDateTime >= timeStart && currDateTime <= timeEnd) {
                        // if within time period, check if city matches
                        if ((city != '' && currCity == city) || city == '') {
                            // if city matches, and generic term given, check if generic term in description
                            if ((keyTermsJSON.generic.includes(keyTerm) && article.description.includes(keyTerm)) || !keyTermsJSON.generic.includes(keyTerm)) {
                                results.push(article.detail);
                            }
                        }
                    }
                }
            }

            browser.close();
            return resolve(results);
        } catch (e) {
            return reject(e);
        }
    })
}

// only for testing, remove once working with api
//dataSourceScraper(["Outbreak", "Hantavirus"], new Date("2011-04-19T11:48:00"), new Date("2022-03-16T09:38:00"), 'AU', 'Canberra').then(console.log).catch(console.error);

export default dataSourceScraper;