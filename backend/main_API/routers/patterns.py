from fastapi import APIRouter
from model import Pattern
from fastapi import HTTPException
import uuid


from database import (
    find_all_patterns,
    read_pattern,
    create_pattern,
    # update_event,
)
router = APIRouter()


@router.get("/api/patterns")
async def get_events():
    response = await find_all_patterns()
    # print(response)

    return response

@router.post("/api/patterns",response_model=Pattern)
async def post_pattern(pattern:Pattern):
    
    
    pattern=pattern.dict()
    pattern["id"] = str(uuid.uuid4())

    response = await create_pattern(pattern)
    if response.acknowledged:
        return pattern
    raise HTTPException(400, "Something went wrong")