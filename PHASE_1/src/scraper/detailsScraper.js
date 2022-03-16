import puppeteer from 'puppeteer';
//import js from 'js'

function Country_city_scraper(country1, city1) {
    return new Promise(async (resolve, reject) => {
		try {
			const browser = await puppeteer.launch({
				args: ['--no-sandbox', '--disable-setuid-sandbox'],	
			});

            const newPage = await browser.newPage();

			
			await newPage.goto("http://outbreaks.globalincidentmap.com/");
			newPage.on('console', (msg) => console.log(msg.text()));

			const a = country1; 
			const b = city1; 
			let report = await newPage.evaluate(async(a,b) => {

			    let country_list = document.getElementsByClassName('textbox')[2].options;
				let city_list = document.getElementsByClassName('textbox')[3].options;

			    let data = [];
				
				const country_array = []; 
				const city_array = [];
				for (let i = 0; i < country_list.length; i++) { 
					country_array.push(country_list[i].value); 
				}
				for (let i = 0; i < city_list.length; i++) {
					city_array.push(city_list[i].value); 
				}
				
				data.push(JSON.stringify({
					country: country_array, 
					city: city_array, 
				}))
				
				var json = JSON.parse(data); 

				await newPage.close(); $

				if (json["country"].includes(a) && json["city"].includes(b)) {
				    
                    await extractInformation(a, b); 

					//console.log(w);

					// The target table we want to scrape after clicking search button. 

					//document.getElementsByTagName("table")[18];

				}
				
				//js.writeFile("../JSON/country_city.json", data); 

                //console.log(`current report: ${detailsTable}`);

                return {
					//data: data,
                };
            }, a, b);


			let extractInformation = (country, city ) => new Promise(async(resolve, reject) => {
				// open new tab to report details
				let page = await browser.page();
				await page.goto("http://outbreaks.globalincidentmap.com/home.php#searchlist");
				await page.close(); 
			
				//document.querySelector('#search').click(); 
			});


			browser.close(); 
			return resolve(report); 

		} catch (e) {
			return reject(e);
		}
	})
}





Country_city_scraper('AE', 'Antigua').then(console.log).catch(console.error);

