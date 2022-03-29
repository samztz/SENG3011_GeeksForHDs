const fetch = require('node-fetch');

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

const apikey = 'bb6df444d940439b833bdedce12d9fc9'

for ([key, val] of Object.entries(Disease_and_syndrome_keywords)) {
	for (var i = 0; i < val.length; i++) {
		let keyword = val[i]; 
		let target = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apikey}`;
		fetch(target).then((body) => {
			return body.json()
		}).then((data) => {
			data.articles.forEach(article => {
				console.log(article.title);
			})
		})
	}
}
