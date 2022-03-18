import requests
import spacy
import json
from bs4 import BeautifulSoup
 
nlp = spacy.load('en_core_web_sm')
# scraping a wikipedia article
url_link = 'https://www.newindianexpress.com/nation/2022/mar/16/with-rise-in-temperature-bihar-reports-more-cases-of-acute-encephalitis-syndrome-among-kids-2430621.html'

hdr = {'User-Agent': 'Mozilla/5.0'}
request = requests.get(url_link,headers=hdr)
 
Soup = BeautifulSoup(request.text, 'lxml')

dict = {}
desc = []

 
# creating a list of all common heading tags
heading_tags = ["h1"]

for tags in Soup.find_all(heading_tags):
    #print(tags.text.strip())
    dict['topic'] = tags.text.strip()
    #sentence.append(tags.text.strip())

para_tag = ["p"]
    
for tags in Soup.find_all(para_tag):
    #print(tags.name + ' -> ' + tags.text.strip())
    #sentence.append(tags.text.strip())
    
    sentence = tags.text.strip()
    doc = nlp(sentence)
    for sent in doc.sents:
        if sent[0].is_title and sent[-1].is_punct:
            has_noun = 1
            has_verb = 1
            for token in sent:
                if token.pos_ in ["NOUN", "PROPN", "PRON"]:
                    has_noun -= 1
                elif token.pos_ == "VERB":
                    has_verb -= 1
            if has_noun < 1 and has_verb < 1:
                #print(sent.text)
                desc.append(sent.text)

desc = desc[0:6]
dict['description'] = desc
print(dict)
with open("sample.json", "w") as outfile:
    json.dump(dict, outfile)

# sentence = tuple(sentence)
# #print(sentence)
# para = nlp(sentence)
# print(para)

