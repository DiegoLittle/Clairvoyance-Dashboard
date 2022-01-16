from fastapi import FastAPI,File,UploadFile,Depends
import models
# from transformers import pipeline
# from nltk.sentiment import SentimentAnalyzer

from sentiment.main import getEmotions
from classification.news import predictNews
from ner.main import NER


app = FastAPI()
origins = ['http://localhost:3000']


@app.post("/api/sentiment")
async def test(request:models.Request):
    return {"Test":getEmotions(request.text)}

@app.post("/api/newscategory")
async def test(request:models.Request):
    
    return {"Test":predictNews(request.text)}

@app.post("/api/ner")
async def test(request:models.Request):
    return {"Test":NER(request.text)}