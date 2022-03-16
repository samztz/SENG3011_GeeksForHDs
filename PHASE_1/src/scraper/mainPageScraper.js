import puppeteer from 'puppeteer';

function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
				args: ['--no-sandbox', '--disable-setuid-sandbox'],	
			});
            const page = await browser.newPage();
            page.on('pageerror', (err) => {
                console.error(err);
            });
            
            // removes timeout error
            await page.setDefaultNavigationTimeout(0); 
            
            await page.goto("http://outbreaks.globalincidentmap.com/");

            // ensures that reports on page are from all time
            /*await page.waitForNavigation({waitUntil: 'domcontentloaded',}),
            //page.on('console', (msg) => console.log(msg.text()));
            await page.select('select[name="TimeScale"]', "ALL");
            await Promise.all([
                //page.select('select[name="TimeScale"]', "ALL"),
                page.click('input[name="Submit"]'),
                page.waitForNavigation({waitUntil: 'domcontentloaded',}),
            ]);*/

            let urls = await page.evaluate(async() => {
                let results = [];

                // get all tables that contain reports
                let tables = document.getElementsByTagName("center")[1].children[1].rows;
				for (var i = 0; i < tables.length; i++) {
                    // if table contains report content
                    if (tables[i].innerText != '') {
                        let reportTable = tables[i].cells[0].getElementsByTagName("table")[0];
                        let diseaseName = reportTable.rows[0];
                        let diseaseReportsAll = reportTable.rows[1].getElementsByTagName("table")[1].rows;	
						
                        // new line for each report
						let diseaseReports = [];
                        for (var j = 1; j < diseaseReportsAll.length; j++) {
                            // if no reports for disease
							if (diseaseReportsAll[j].innerText == "No Event to Display") {
								break; 
							}

                            // get basic details of report
                            let currDiseaseReport = diseaseReportsAll[j];
                            let dateTime = currDiseaseReport.cells[0].textContent;
                            let detail = currDiseaseReport.cells[1].children[0].href;
                            let country = currDiseaseReport.cells[2].textContent;
                            let city = currDiseaseReport.cells[3].textContent;
                            let description = currDiseaseReport.cells[5].textContent;

                            diseaseReports.push(JSON.stringify({
                                dateTime: dateTime,
                                detail: detail,
                                country: country,
                                city: city,
                                description: description,
                            }))
                        }

                        // get name of disease and all reports for that disease
                        results.push({
                            diseaseName: diseaseName.innerText,
                            diseaseReports: diseaseReports,
                        })
                    }
                }
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

// only for testing, remove once working with api
run().then(console.log).catch(console.error);
