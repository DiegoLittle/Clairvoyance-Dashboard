from fastapi import APIRouter,File, UploadFile,Form
from model import Note,Event
from fastapi import HTTPException
import uuid
import datetime

from database import (
    get_all_events,
    insert_event,
    delete_event,
    update_event,
)
router = APIRouter()


@router.get("/api/notes/")
async def get_events():
    response = await get_all_events()
    # print(response)

    return response

@router.post("/api/notes/",response_model=Note)
async def post_event(note: Note):
    print(note)
    # event = event.dict()
    # event["id"] = str(uuid.uuid4())
    # event["created_at"]= datetime.datetime.now().isoformat()
    # response = await insert_event(event)
    # if response.acknowledged:
    #     return event
    # raise HTTPException(400, "Something went wrong")
    return note

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