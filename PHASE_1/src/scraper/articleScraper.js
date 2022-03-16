import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import { extract } from 'article-parser';
import { Readability } from '@mozilla/readability';

async function articleScraper(results) {
    let articles = [];

    // Create a cluster with 2 workers
    /*const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    // Define a task
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        // find article URL
        let articleURL = await page.evaluate(async () => {
            let detailsTable = document.querySelectorAll("table table table");
            return detailsTable[1].rows[3].cells[1].innerText;
        });

        // go to article url
        //console.log(articleURL);
        await page.goto(articleURL);

        let article = await page.evaluate(async(articleURL) => {
            let headline = document.getElementsByTagName('h1')[0].textContent;

            return {
                url: articleURL,
                //date_of_publication: dateOfPublication,
                headline: headline,
                //main_text: mainText,
                //reports: [],
            }
        });
        //console.log(pageTitle);
        //articles.push({title: articleURL});
        //return pageTitle;

        articles.push(article);
    });

    // add data source urls to queue
    for (let url of results) {
        cluster.queue(url);
    }

    // Wait for cluster to idle and close it
    await cluster.idle();
    await cluster.close();
    return articles;*/

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

    for (let url of results) {
        await page.goto(url);
        let articleURL = await page.evaluate(async () => {
            let detailsTable = document.querySelectorAll("table table table");
            return detailsTable[1].rows[3].cells[1].innerText;
        });

        //let article = await extract(articleURL);

        // go to article url
        //console.log(articleURL);
        await page.exposeFunction('getReadability', (doc) => {
            const article = new Readability(doc).parse();
            return article;
        });
        const doc = await page.evaluate(() => {
            const article = window.getReadability(document.documentElement.innerHTML);
            return article;
        });
        //let article = new Readability(articleDoc.body).parse();

        articles.push({
            url: articleURL,
            //date_of_publication: dateOfPublication,
            headline: doc,
            //main_text: mainText,
            //reports: [],
        });
    }
    browser.close();
    return articles;
}

// only for testing, remove once working with api
articleScraper(["http://outbreaks.globalincidentmap.com/eventdetail.php?ID=12525", "http://outbreaks.globalincidentmap.com/eventdetail.php?ID=35543"]).then(console.log).catch(console.error);

//export default articleScraper;