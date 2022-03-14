import puppeteer from 'puppeteer';

function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],	
			});
            const page = await browser.newPage();
            
            // removes timeout error
            await page.setDefaultNavigationTimeout(0); 
            
            await page.goto("http://outbreaks.globalincidentmap.com/");
            page.on('console', (msg) => console.log(msg.text()));

            let urls = await page.evaluate(async() => {
                let results = [];
                let tables = document.getElementsByTagName("center")[1].children[1].rows;
                //results.push({text: tables.innerHTML})
				let counter = 0;
				for (var i = 0; i < tables.length; i++) {
                    //results.push({text: tables[i].innerText})
                    // if table contains report content
                    if (tables[i].innerText != '') {
                        //results.push({text: tables[i].innerText})
                        let reportTable = tables[i].cells[0].getElementsByTagName("table")[0];
                        let diseaseName = reportTable.rows[0];
                        //results.push({text: diseaseName})
                        let diseaseReportsAll = reportTable.rows[1].getElementsByTagName("table")[1].rows;	
						// new line for each report
						let diseaseReports = [];
						let detail_pages = [];
						let flag = 0; 
						let index = 0; 
                        let latitude = 0; 
                        for (var j = 1; j < diseaseReportsAll.length; j++) {
							if (diseaseReportsAll[j].innerText == "No Event to Display") {
								flag = 1; 
								break; 
							}
							index = j-1+counter; 
                            let currDiseaseReport = diseaseReportsAll[j];	
                            
                            // detail_page can be printed out correctly here
							let detail_page = document.querySelectorAll(".tdline a")[index].href;

                            // the detail_page can't be printed out correctly in "extraction" function.
                            //latitude = await window.extraction(detail_page); 
                            //latitude = await extractReport(detail_page);
                            
                            diseaseReports.push(JSON.stringify({report: currDiseaseReport.innerText}))
							detail_pages.push({url: detail_page})
                        }
						if (flag == 0) {
							counter = counter + (diseaseReportsAll.length-1);
						}
                        results.push({
                            diseaseName: diseaseName.innerText,
                            //diseaseReports: diseaseReports,
							detail_page: detail_pages,
                            //height: latitude
                        })
                    }
                }
                return results;
            })
            await page.close();

            // go through results to find details of each report
            let extractReport = (detailPage) => new Promise(async(resolve, reject) => {
                // open new tab to report details
                let newPage = await browser.newPage();
                await newPage.goto(detailPage);
                //console.log(detailPage);

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

                resolve(report);
                await newPage.close();
            });

            let reportInfo = [];
            for (let disease of urls) {
                let diseaseReports = []
                //console.log(`getting reports for '${disease.diseaseName}'`);
                for (let details of disease.detail_page) {
                    //console.log(details.url);
                    diseaseReports.push(JSON.stringify({report: await extractReport(details.url)}))
                }
                reportInfo.push({
                    diseaseName: disease.diseaseName,
                    diseaseReports: diseaseReports,
                })
            }

            browser.close();
            return resolve(reportInfo);
            //return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
