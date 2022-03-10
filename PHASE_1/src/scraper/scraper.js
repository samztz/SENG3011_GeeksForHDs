import puppeteer from 'puppeteer';

function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            // removes timeout error
            await page.setDefaultNavigationTimeout(0); 
            
            await page.goto("http://outbreaks.globalincidentmap.com/");
            let urls = await page.evaluate(() => {
                let results = [];
                let tables = document.getElementsByTagName("center")[1].children[1].rows;
                //results.push({text: tables.innerHTML})
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
                        for (var j = 1; j < diseaseReportsAll.length; j++) {
                            let currDiseaseReport = diseaseReportsAll[j];
                            diseaseReports.push(JSON.stringify({report: currDiseaseReport.innerText}))
                        }
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
run().then(console.log).catch(console.error);