from fastapi import APIRouter,File, UploadFile,Form
from model import Event
from fastapi import HTTPException
import uuid
import datetime

from database import (
    get_all_events,
    insert_event,
    delete_event,
    update_event,
    search_query
)
router = APIRouter()


@router.get("/api/events/")
async def get_events():
    response = await get_all_events()
    # print(response)

    return response

@router.post("/api/events/",response_model=Event)
async def post_event(event: Event):
    # event = dict(event)
    # print(event)
    event = event.dict()
    print(event)
    # event["id"] = str(uuid.uuid4())
    event["created_at"]= datetime.datetime.now().isoformat()
    response = await insert_event(event)
    if response.acknowledged:
        return event
    raise HTTPException(400, "Something went wrong")

@router.delete("/api/events/", response_model=Event)
async def del_event(event:Event):
    # 
    dict = event.dict()
    print(dict)
    response = await delete_event(dict)
    print(response.deleted_count)
    if response:
        return dict
    else:
         return "Error"

@router.put("/api/events/", response_model=Event)
async def put_todo(event:Event):
    response = await update_event(event.dict())
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title")

@router.post("/api/files/")
async def create_file(file: bytes = File(...)):
    save = open('test.jpeg', 'wb')
    save.write(file)
    save.close()
    return {"file_size": len(file)}


@router.post("/api/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

# @router.get("/api/search/")
# async def search(query:str):
#     # print(query)
#     result = await search_query(query)
#     # print(result)
#     return result