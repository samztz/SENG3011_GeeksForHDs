import * as fs from 'fs';
import countryDetector from 'country-in-text-detector';
import chrono from 'chrono-node';

// import disease and syndrome lists
let diseaseList = JSON.parse(fs.readFileSync('./diseaseList.json'));
let syndromeList = JSON.parse(fs.readFileSync('./syndromeList.json'));

// map to replace disease name with scientific name
let diseaseMap = [
    {
        'articleDisease': 'salmonella',
        'scientificName': 'salmonellosis'
    },
    {
        'articleDisease': 'ebola',
        'scientificName': 'ebola haemorrhagic fever'
    },
    {
        'articleDisease': 'polio',
        'scientificName': 'poliomyelitis'
    },
]

// go through provided article text and create report based on content
function reportGenerator(articleText, datePublished) {
    //let reports = [];
    //console.log(diseaseList)
    let modifiedArticle = articleText.toLowerCase();

    // scan through article and replace disease names with scientific name
    for (let disease of diseaseMap) {
        let regExp = new RegExp(disease.articleDisease, "ig")
        modifiedArticle = modifiedArticle.replaceAll(regExp, disease.scientificName)
    }
    
    // if article mentions influenza type without influenza prefix, add influenza prefix
    modifiedArticle = modifiedArticle.replaceAll(/(?<! a\/)(h5n1|h7n9|h9n2|h1n1|h1n2|h3n5|h3n2|h2n2)/ig, "influenza a\/$1")

    // get all diseases mentioned in article
    let diseases = []
    for (let disease of diseaseList) {
        if (modifiedArticle.includes(disease.name.toLowerCase())) {
            diseases.push(disease.name)
        }
    }

    // get all syndromes mentioned in article
    let syndromes = []
    for (let syndrome of syndromeList) {
        if (modifiedArticle.includes(syndrome.name.toLowerCase())) {
            syndromes.push(syndrome.name)
        }
    }

    // get date of cases from article
    let parsedDate = chrono.parse(modifiedArticle, new Date(datePublished))
    //console.log(JSON.stringify(parsedDate, null, 2))

    // transform all dates to correct format
    let dateArray = []
    for (let date of parsedDate) {
        let knownValues = date.start
        let year, month, day, hour, minute, second;
        year = month = day = hour = minute = second = 'xx'
        if (knownValues.isCertain('year')) {
            year = knownValues.get('year')
        }
        if (knownValues.isCertain('month')) {
            month = `${knownValues.get('month')}`.padStart(2, '0')
        }
        if (knownValues.isCertain('day')) {
            day = `${knownValues.get('day')}`.padStart(2, '0')
        }
        if (knownValues.isCertain('hour')) {
            hour = `${knownValues.get('hour')}`.padStart(2, '0')
        }
        if (knownValues.isCertain('minute')) {
            minute = `${knownValues.get('minute')}`.padStart(2, '0')
        }
        if (knownValues.isCertain('second')) {
            second = `${knownValues.get('second')}`.padStart(2, '0')
        }
        dateArray.push(`${year}-${month}-${day} ${hour}:${minute}:${second}`)
    }

    // because chrono can't parse only years from text, need to manually parse and add
    // note: may add 4 digit numbers that arent years
    let yearRegExp = new RegExp("\\d{4}", "ig")
    let parsedYears = modifiedArticle.match(yearRegExp)
    //console.log(parsedYears)
    if (parsedYears) {
        for (let parsedYear of parsedYears) {
            let yearExists = dateArray.find(element => {
                if (element.startsWith(parsedYear)) {
                    return true;
                }
            })
            // add parsed year if it isn't isn't already in dateArray
            if (!yearExists) {
                dateArray.push(`${parsedYear}-xx-xx xx:xx:xx`)
            }
        }
    }

    // if only one date in array, that is exact date
    // if more than one date, date range
    dateArray.sort()
    let eventDate = dateArray[0];
    // filter out dates that dont have a year
    dateArray = dateArray.filter(element => {
        return !element.startsWith('xx')
    })
    //console.log(dateArray)
    let lastDate = dateArray[dateArray.length - 1]
    if (dateArray.length > 1) {
        eventDate += ` to ${lastDate}`
    }

    // get locations from article
    let locations = []
    let detectedLocations = countryDetector.detect(modifiedArticle)
    for (let loc of detectedLocations) {
        let locCountry = ''
        let locLoc = ''
        if (loc.type == 'city') {
            locCountry = loc.countryName
            locLoc = loc.name
        } else {
            locCountry = loc.name
        }

        // check for US cities, since country is not formatted correctly for these
        if (/US-\w+/g.test(loc.iso3166) && loc.countryName != 'United States') {
            locCountry = 'United States'
        }
        locations.push({
            country: locCountry,
            location: locLoc,
        })
    }

    // in some instances country in text detector labels a city as a country, while 
    /*console.log({
        diseases: diseases,
        syndromes: syndromes,
        event_date: eventDate,
        locations: locations
        //locations: JSON.stringify(locations, null, 2),
    })*/

    return {
        diseases: diseases,
        syndromes: syndromes,
        event_date: eventDate,
        locations: locations
        //locations: JSON.stringify(locations, null, 2),
    };

    /**
     * individual report format:
     * {
     *      diseases: [<string::disease>],
     *      syndromes: [<string::syndrome>],
     *      event_date: <string::date>,
     *      locations: [<object::location>],
     * }
     */
};

// for testing
//let testArticle = `CAGAYAN DE ORO CITY—The Department of Health in Region 10 (DOH-10) on Wednesday noted an increase of deaths related to rabies infection in 2021.DOH-10 senior health program officer for rabies Jenny Alabado said the 18 rabies deaths in 2021 were much higher compared to the seven deaths in 2020. Most of the deaths were recorded in Bukidnon.“There are a lot of factors why the deaths have increased. Maybe because of the pandemic, the vaccination (for rabies) is difficult, and maybe the others choose not to visit the Animal Bite Treatment Center (ABTC),” Alabado said in a media forum here.She also noted that most of the areas in Bukidnon are identified as geographically isolated disadvantaged areas (GIDA), which might be one of the causes the residents are having a hard time availing of the rabies vaccination.Aside from the number of deaths, the DOH-10 also recorded an increase in the number of individuals that have been bitten by animals, tallying 67,186 cases in 2021—higher by 1,116 cases compared to the cases in 2020.Alabado said DOH has always considered rabies a health problem, reiterating that rabies is a deadly virus, although it is 100 percent preventable with complete vaccination.A person who is manifesting the signs and symptoms of rabies such as fever, spitting, afraid of light and water, and has not received the vaccine doesn’t have the chance to survive, Alabado said.For this year, DOH-10 has allocated a minimal budget of PHP500,000 for rabies vaccines as it is only tasked to augment local supplies.Northern Mindanao has 29 ABTC facilities operated by the government, and three Animal Bite Centers which are operated by private companies.Alabado said achieving the rabies-free area is not easy, and that DOH and the Department of Agriculture (DA) have been coordinating with the different LGUs to assist in their rabies program.According to DOH, only the province of Camiguin has achieved rabies-free status since 2013.Alabado encouraged other LGUs in the region to improve local policies on rabies and enhance their rabies programs, as well as the availability of vaccines.Under Executive Order No. 84, March is declared as the Rabies Awareness Month. (PNA)`
//let testArticle = "h7n9 is Ho Chi Minh City in 2021 in this Meningitis sentence. Sydney salmonella influenza a/h7n9 influenza a/h7n9 New York, bangladesh zika salmonellosis 3 March 1986 6pm"
//let testArticle = 'Salmonella dominated reported outbreaks in Australia in 2016 '
//let testArticle = 'B2022 is the suite number in 1932'
//reportGenerator(testArticle, '2022-03-24 08:58:00').then(console.log).catch(console.error);

export default reportGenerator;