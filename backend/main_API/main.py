from logging import info
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from requests.api import delete, head
from model import Event,Project
from dotenv import load_dotenv
import os
import requests
from routers import projects,events,patterns,notes,information
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


load_dotenv()

speechKey = os.getenv("SPEECH_KEY")
speechRegion = os.getenv("SPEECH_REGION")



app = FastAPI()
app.include_router(projects.router)
app.include_router(events.router)
app.include_router(patterns.router)
app.include_router(notes.router)
app.include_router(information.router)


from database import (
    create_progress,
    find_progress,
    update_progress,
    delete_progress
)
from ai import (
    getCodeCompletion,
    getCompletion
)

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods =["*"],
    allow_headers =["*"],
    )


@app.get("/api/get-speech-token")
async def get_speech_token():
    headers = {'Ocp-Apim-Subscription-Key': speechKey,'Content-Type': 'application/x-www-form-urlencoded'}
    res = requests.post(url="https://%s.api.cognitive.microsoft.com/sts/v1.0/issueToken"%(speechRegion), headers=headers)
    return { "token": res.text, "region": speechRegion }


