from model import Event,Project,Pattern

#MongoDB Driver
import motor.motor_asyncio

# client= motor.motor_asyncio.AsyncIOMotorClient('localhost:27017')
client = motor.motor_asyncio.AsyncIOMotorClient('')


database = client.Clairvoyance
events = database.events
projects = database.projects
stats = database.stats
patterns = database.patterns
news = database.news
bookmarks = database.bookmarks

async def get_all_events():
    arr = []
    # Creates MongoDB Cursor
    cursor = events.find({})
    # Loops through documents in cursor and appends to events array
    async for document in cursor:
        # document["_id"]=str(document["_id"])
        arr.append(Event(**document))
    # print(events)
    return arr

async def insert_event(event):
    # Sets the event input into a MongoDB Document
    document = event
    # Inserts the Document into the events
    result = await events.insert_one(document)
    return result

async def delete_event(event):
    print(event)
    result = await events.delete_one({"id":event["id"]})
    print(result.acknowledged)
    return result

async def update_event(event):
    await events.update_one({"id":event["id"]},{"$set":event})
    # await collection
    document = await events.find_one(event)
    return document

async def insert_project(project):
    res = await projects.insert_one(project)
    return res

async def find_project(id):
    doc = await projects.find_one({'id':id})
    if doc:
        doc = Project(**doc)
    return doc

async def find_all_projects():
    arr = []
    cursor =  projects.find({})
    async for document in cursor:
        arr.append(Project(**document))
    return arr

async def delete_project(project):
    result = await projects.delete_one(project)
    return result

async def update_project(project):
    await projects.update_one({"id":project["id"]},{"$set":project})
    # await collection
    document = await projects.find_one(project)
    return document

async def create_progress(progress):
    document = progress
    result = await stats.insert_one(document)
    return result

async def find_progress(id):
    doc = await stats.find_one({'id':id})
    print(doc)
    doc.pop("_id")
    return doc

async def update_progress(progress):
    await stats.update_one({'id':progress['id']},{'$set':progress})
    doc = await stats.find_one(progress)
    doc.pop('_id')
    return doc

async def delete_progress(progress):
    result = await stats.delete_one(progress)
    return result

async def find_all_patterns():
    arr = []
    cursor =  patterns.find({})
    async for document in cursor:
        arr.append(Pattern(**document))
    return arr


async def read_pattern(id):
    doc = await patterns.find_one({'id':id})
    doc.pop('_id')
    return doc

async def create_pattern(pattern):
    result = await patterns.insert_one(pattern)
    return result

async def search_query(query):
    arr=[]
    docs = news.find({"title":{"$regex" :query,'$options' : 'i'}}).limit(10)
    async for document in docs:
        document.pop('_id')
        arr.append(document)
    return arr

from .utils.bookmarks import getTitle,keywordExtraction

async def create_bookmark(bookmark):
    document = bookmark
    result = await bookmarks.insert_one(document)
    return result
    # TODO Keyword Extraction
    # doc = await bookmarks.find_one({'url':bookmark["url"]})
    # if doc:
    #     return {"error":"duplicate"}
    # else:

    
    return result

async def check_duplicate_bookmark(bookmark):
    doc = await bookmarks.find_one({'url':bookmark["url"]})
    
    if (doc):
        doc.pop('_id')
        return True
    else:
        return False

async def get_bookmark_data_task(bookmark):
    print("Starting data task")
    bookmark.pop("_id")
    bookmark["title"]= getTitle(bookmark["url"])

    result = bookmarks.update_one({'id':bookmark['id']},{'$set':bookmark})
    return result

async def get_bookmark(bookmark):
    doc = await stats.find_one({'id':bookmark["id"]})
    print(doc)
    doc.pop("_id")
    return doc
async def get_bookmarks():
    arr = []
    cursor =  bookmarks.find({})
    async for document in cursor:
        document.pop("_id")
        arr.append(document)
    return arr

async def update_bookmark(bookmark):
    await bookmarks.update_one
