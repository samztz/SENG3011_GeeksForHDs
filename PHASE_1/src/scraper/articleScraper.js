import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import reportGenerator from './reportGenerator.js';

async function articleScraper(results) {
    let articles = [];
    let blockedArticles = [];

    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 10,
    });

    // Define a task
    await cluster.task(async ({ page, data }) => {
        //let { url, dateOfPublication } = data;
        let url = data.url;
        let dateOfPublication = data.datePublished;
        //console.log(dateOfPublication)
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
        await page.goto(url);
        // find article URL
        let event_date = ""; 
        let articleURL = await page.evaluate(async () => {
            let detailsTable = document.querySelectorAll("table table table");
            event_date = detailsTable[1].rows[0].cells[3].innerText; 


            return detailsTable[1].rows[3].cells[1].innerText;
        });

        // go to article url
        //console.log(articleURL);
        await page.goto(articleURL);

        const articleHTML = await page.evaluate(() => {
            return document.body.innerHTML
        });

        const dom = new JSDOM(articleHTML);
        const article = new Readability(dom.window.document).parse();

        let headline = article.title;
        let mainText = article.excerpt;

        // if headline or excerpt contains blocked, most likely blocked from scraping website
        if (headline.includes('blocked') || mainText.includes('blocked')) {
            blockedArticles.push({
                url: articleURL,
                date_of_publication: dateOfPublication,
            })
        
        // else can scrape from website 
        } else {
            let reports = reportGenerator(article.textContent, dateOfPublication)
            //console.log(reports)

            articles.push({
                url: articleURL,
                date_of_publication: dateOfPublication,
                headline: headline,
                main_text: mainText,
                reports: reports,
                //content: article
            });
        }
    });



    // add data source urls to queue
    for (let url of results) {
        cluster.queue(url);
    }

    // Wait for cluster to idle and close it
    await cluster.idle();
    await cluster.close();

    if (blockedArticles.length > 0) {
        articles.push(`${blockedArticles.length} article(s) could not be scraped from: ${JSON.stringify(blockedArticles)}`);
    }
    return articles;
}

// only for testing, remove once working with api
/*let testArray = [{
    url: 'http://outbreaks.globalincidentmap.com/eventdetail.php?ID=13315',
    datePublished: '2013-05-12 04:00:00'
  },
  {
    url: 'http://outbreaks.globalincidentmap.com/eventdetail.php?ID=39157',
    datePublished: '2021-07-28 00:49:00'
  },
  {
    url: 'http://outbreaks.globalincidentmap.com/eventdetail.php?ID=40901',
    datePublished: '2021-11-07 03:58:00'
  },
  {
    url: 'http://outbreaks.globalincidentmap.com/eventdetail.php?ID=12525',
    datePublished: '2013-02-09 02:30:00'
}]

/*let testArray = [{
    url: 'http://outbreaks.globalincidentmap.com/eventdetail.php?ID=43845',
    datePublished: '2013-02-09 02:30:00'
}]*/
//articleScraper(testArray).then(console.log).catch(console.error);

export default articleScraper;



