import urllib3
from googlesearch import search
import autoscraper
from bs4 import BeautifulSoup

http = urllib3.PoolManager()



def simpleSearch(query):
    result = []
    resp = http.request('GET', "https://google.com/search?q="+query)
    # for i in search(query, tld='com', lang='en', num=10, start=0, stop=None, pause=2.0):
    #     result.append(i)
    #     print(i)
    # print(resp.data)
    soup = BeautifulSoup(resp.data,'lxml')
    print(soup)
    for s in soup.find_all(id="res"):
        print(s)

    return result

simpleSearch("test")