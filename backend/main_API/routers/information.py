from fastapi import APIRouter,File,BackgroundTasks
from model import Bookmark,BookmarkResponse
from fastapi import HTTPException
import uuid
import datetime

from database import (
    search_query,
    create_bookmark,
    get_bookmarks,
    check_duplicate_bookmark,
    get_bookmark_data_task
)
router = APIRouter()


@router.get("/api/bookmarks")
async def get_events():
    response = await get_bookmarks()
    # print(response)

    return response

@router.post("/api/bookmarks",response_model=BookmarkResponse)
async def post_event(bookmark: Bookmark,background_tasks: BackgroundTasks):
    # event = dict(event)
    # print(event)
    bookmark = bookmark.dict()
    # print(bookmark)
    # event["id"] = str(uuid.uuid4())
    # event["created_at"]= datetime.datetime.now().isoformat()
    duplicate = await check_duplicate_bookmark(bookmark)
    
    if duplicate:
        return {"bookmark":bookmark,"duplicate":True}
    background_tasks.add_task(get_bookmark_data_task,bookmark)
    response = await create_bookmark(bookmark)
    if response.acknowledged:
        return {"bookmark":bookmark,"duplicate":False}
    # raise if response["message"]=="duplicate":
    raise HTTPException(400, "Something went wrong")

# @router.delete("/api/events/", response_model=Event)
# async def del_event(event:Event):
#     # 
#     dict = event.dict()
#     print(dict)
#     response = await delete_event(dict)
#     print(response.deleted_count)
#     if response:
#         return dict
#     else:
#          return "Error"

# @router.put("/api/events/", response_model=Event)
# async def put_todo(event:Event):
#     response = await update_event(event.dict())
#     if response:
#         return response
#     raise HTTPException(404, f"There is no todo with the title")

@router.post("/api/files/information")
async def create_file(file: bytes = File(...)):
    save = open('test.jpeg', 'wb')
    save.write(file)
    save.close()
    return {"file_size": len(file)}



@router.get("/api/search/")
async def search(query:str):
    # print(query)
    result = await search_query(query)
    # print(result)
    return result