import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def getCodeCompletion(prompt):

    response = openai.Completion.create(
    engine="davinci-codex",
    prompt=prompt,
    temperature=0,
    max_tokens=1000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    stream=True
    )
    
    text=""
    for x in response:
        text = text + x.choices[0].text
        # if(x.choices[0].finish_reason=="stop")

    return text

def getCompletion(prompt):
    start_sequence = "\nAI:"
    restart_sequence = "\nHuman: "

    response = openai.Completion.create(
    engine="davinci",
    prompt=prompt,
    temperature=0.9,
    max_tokens=150,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0.6,
    stop=["\n", " Human:", " AI:"]
    )
    print(response)

    return response.choices[0].text

