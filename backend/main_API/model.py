from typing import Any, Optional,List
from pydantic import BaseModel
from pydantic.types import UUID4

class SentimentRequest(BaseModel):
    text: str

class Event(BaseModel):
    id:str
    created_at:str
    tags: Optional[List[str]]
    title:str
    text:str
    date=str
    data = {}

class Note(BaseModel):
    id:UUID4
    name:str
    email:str
    body:str

class Project(BaseModel):
    id: str
    name:str
    description=""
    tags: list
    todos= []
    bookmarks=[]

class Pattern(BaseModel):
    id:str
    name:str
    context:str
    problem:str
    examples: Any

class Bookmark(BaseModel):
    id:str
    title:str
    url:str
    tags: List

class BookmarkResponse(BaseModel):
    bookmark:Bookmark
    duplicate:bool



# class Log(BaseModel):
