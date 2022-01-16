from bs4 import BeautifulSoup
import json
import requests
from keybert import KeyBERT
from keyword_extraction import keywordExtraction

kw_model = KeyBERT()
# Ignores directory hierarchy
# Finds all bookmarks and 
def baseBookmarks(bookmarks_file):
    soup = BeautifulSoup(open(bookmarks_file), 'html.parser')
    bookmarks=[]
    for link in soup.find_all('a'):
        bookmark={}
        bookmark["title"]= link.get_text()
        bookmark["url"]=link.get('href')
        bookmarks.append(bookmark)
    return bookmarks

bookmarks = baseBookmarks('bookmarks.html')

for bookmark in bookmarks:
    try:
        r=requests.get(bookmark['url'])
    except:
        continue
    soup = BeautifulSoup(r.text, 'html.parser')
    doc =soup.get_text()
    print(keywordExtraction(doc))
    keywords = kw_model.extract_keywords(doc)
    bookmark["keywords"] = keywords
    print(bookmark)

    