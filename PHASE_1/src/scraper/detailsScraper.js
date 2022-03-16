import puppeteer from 'puppeteer';

function detailsScraper(detailPage) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],	
			});

            const newPage = await browser.newPage();
            await newPage.goto(detailPage);
            console.log(detailPage);

            // get report details
            let report = await newPage.evaluate(async() => {
                let detailsTable = document.querySelectorAll("table table table");
                let diseaseName = detailsTable[1].rows[0].cells[1].innerText;
                let dateTime = detailsTable[1].rows[0].cells[3].innerText;
                let country = detailsTable[1].rows[1].cells[1].innerText;
                let city = detailsTable[1].rows[1].cells[3].innerText;
                let latitude = detailsTable[1].rows[2].cells[1].innerText;
                let longitude = detailsTable[1].rows[2].cells[3].innerText;
                let articleURL = detailsTable[1].rows[3].cells[1].innerText;
                let description = detailsTable[3].textContent;
                //console.log(`current report: ${detailsTable}`);
                return {
                    diseaseName: diseaseName,
                    dateTime: dateTime,
                    country: country,
                    city: city,
                    latitude: latitude,
                    longitude: longitude,
                    articleURL: articleURL,
                    description: description,
                };
            });
            browser.close();
            return resolve(report);
            //await newPage.close();
        } catch (e) {
            return reject(e);
        }

})}

// only for testing, remove once working with api
detailsScraper(process.argv.slice(2)[0]).then(console.log).catch(console.error);

export default detailsScraper;