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

            // QUESTION 1: this detail_page parameter is not correct, weird???????????
            // QUESTION 2: Still haven't figured out how to go to one page and go back to previous page. 
            // But using page.goto() and page.goback() for sure, the problem is how to go to switch between pages under page.evaluate(.........).

            await page.exposeFunction('extraction', detail_page => {
                return new Promise((resolve, reject) => {

                    // console.log(detail_page); 
                    //page.goto(detail_page); 
                    //  text = detail_page;
                    //  if (err) reject(err);
                    resolve(detail_page);
                    //page.goback();           
                });
            });

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
                            latitude = await window.extraction(detail_page); 
                            
                            diseaseReports.push(JSON.stringify({report: currDiseaseReport.innerText}))
							detail_pages.push(JSON.stringify({url: detail_page}))
                        }
						if (flag == 0) {
							counter = counter + (diseaseReportsAll.length-1);
						}
                        results.push({
                            diseaseName: diseaseName.innerText,
                            diseaseReports: diseaseReports,
							detail_page: detail_pages,
                            height: latitude
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
run().then(console.log).catch(console.error);
