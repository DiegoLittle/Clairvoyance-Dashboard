from typing import List, Optional
from pydantic import BaseModel


class Request(BaseModel):
    text:str
