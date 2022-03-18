import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

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
        let { url, dateOfPublication } = data;
        await page.goto(url);
        // find article URL
        let articleURL = await page.evaluate(async () => {
            let detailsTable = document.querySelectorAll("table table table");
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
            let Disease_and_syndrome_keywords = {
                "disease": [

                    "unknown" ,
                    "other" ,
                    "anthrax cutaneous" ,
                    "anthrax gastrointestinous" ,
                    "botulism" ,
                    "brucellosis" ,
                    "chikungunya" ,
                    "cholera" ,
                    "cryptococcosis" ,
                    "cryptosporidiosis" ,
                    "crimean-congo haemorrhagic fever" ,
                    "dengue" ,
                    "diphteria" ,
                    "ebola haemorrhagic fever" ,
                    "ehec (e.coli)" ,
                    "enterovirus 71 infection" ,
                    "influenza a/h5n1",
                    "influenza a/h7n9",
                    "influenza a/h9n2",
                    "influenza a/h1n1",
                    "influenza a/h1n2",
                    "influenza a/h3n5",
                    "influenza a/h3n2",
                    "influenza a/h2n2",
                    "hand, foot and mouth disease" ,
                    "hantavirus" ,
                    "hepatitis a",
                    "hepatitis b",
                    "hepatitis c",
                    "hepatitis d",
                    "hepatitis e",
                    "histoplasmosis" ,
                    "hiv/aids" ,
                    "lassa fever" ,
                    "malaria" ,
                    "marburg virus disease" ,
                    "measles" ,
                    "mers-cov" ,
                    "mumps" ,
                    "nipah virus" ,
                    "norovirus infection" ,
                    "pertussis" ,
                    "plague",
                    "pneumococcus pneumonia",
                    "poliomyelitis" ,
                    "q fever" ,
                    "rabies" ,
                    "rift valley fever" ,
                    "rotavirus infection" ,
                    "rubella" ,
                    "salmonellosis" ,
                    "sars" ,
                    "shigellosis" ,
                    "smallpox" ,
                    "staphylococcal enterotoxin b" ,
                    "thypoid fever" ,
                    "tuberculosis",
                    "tularemia" ,
                    "vaccinia and cowpox" ,
                    "varicella" ,
                    "west nile virus" ,
                    "yellow fever" ,
                    "yersiniosis" ,
                    "zika" ,
                    "legionares" ,
                    "listeriosis" ,
                    "monkeypox" ,
                    "COVID-19" 
                ], 
                "syndrome": [
                    "Haemorrhagic Fever" ,
                    "Acute Flacid Paralysis" ,
                    "Acute gastroenteritis" ,
                    "Acute respiratory syndrome" ,
                    "Influenza-like illness" ,
                    "Acute fever and rash" ,
                    "Fever of unknown Origin" ,
                    "Encephalitis",
                    "Meningitis"
                ]
            };

            let diseases = ""; 
            let sydromes = ""; 


            for (let word of article.textContent) {
                if (Disease_and_syndrome_keywords.disease.includes(word)) {
                    diseases.concat(word); 
                }
                if (Disease_and_syndrome_keywords.syndrome.includes(word)) {
                    sydromes.concat(word);
                }
            }

            articles.push({
                url: articleURL,
                date_of_publication: dateOfPublication,
                headline: headline,
                main_text: mainText,
                reports: [
                    diseases, 
                    sydromes,
                    event_date,
                    locations = [],
                ],
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
let testArray = [{
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
articleScraper(testArray).then(console.log).catch(console.error);

export default articleScraper;



