import feedparser
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://diego:nkQWoC3YAntfdkDc@cluster0.5p5h1.mongodb.net')
import asyncio

database = client.Clairvoyance
news = database.news


def get_articles(url,category,source):
    NewsFeed = feedparser.parse(url)

    # entry = NewsFeed.entries[1]
    # print(entry.keys())
    

    for entry in NewsFeed.entries:
        print(entry)
        entry["category"]= category
        entry["source"] = source
        news.insert_one(entry)

def main():
    get_articles("https://hnrss.org/frontpage","Technology","hackernews")
    # get_articles("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml","Technology","nytimes")
    # get_articles("https://news.mit.edu/rss/feed","Technology","MITNews")
    # get_articles("https://www.nextgov.com/rss","Technology","Nextgov")

async def deleteDuplicated():
    distinct = await news.distinct("title")
    for document in distinct:
        i=0
        cursor = news.find({ "title": document })
        async for x in cursor:
            if(i):
                news.delete_one({"_id":x["_id"]})
            i+=1

loop = asyncio.get_event_loop()
main()
loop.run_until_complete(
    deleteDuplicated()
)
