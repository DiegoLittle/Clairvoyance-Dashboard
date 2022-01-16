import enum
import os
import subprocess
from fastapi import FastAPI,File,UploadFile
import torch
import torchaudio
import requests
from fastapi.middleware.cors import CORSMiddleware
# from transformers import pipeline
from nltk.corpus import words
import matplotlib.pyplot as plt

# unmasker = pipeline('fill-mask', model='bert-base-uncased')

app = FastAPI()
origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods =["*"],
    allow_headers =["*"],
    )

torch.random.manual_seed(0)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# bundle = torchaudio.pipelines.WAV2VEC2_ASR_BASE_960H
bundle = torchaudio.pipelines.HUBERT_ASR_LARGE
model = bundle.get_model().to(device)

class GreedyCTCDecoder(torch.nn.Module):
  def __init__(self, labels, ignore):
    super().__init__()
    self.labels = labels
    self.ignore = ignore

  def forward(self, emission: torch.Tensor) -> str:
    """Given a sequence emission over labels, get the best path string
    Args:
      emission (Tensor): Logit tensors. Shape `[num_seq, num_label]`.

    Returns:
      str: The resulting transcript
    """
    indices = torch.argmax(emission, dim=-1)  # [num_seq,]
    indices = torch.unique_consecutive(indices, dim=-1)
    print(self.labels)
    print(indices)
    indices = [i for i in indices if i not in self.ignore]
    
    return ''.join([self.labels[i] for i in indices])

def sampleInput(SPEECH_FILE):
  waveform, sample_rate = torchaudio.load(SPEECH_FILE)
  waveform = waveform.to(device)

  if sample_rate != bundle.sample_rate:
    waveform = torchaudio.functional.resample(waveform, sample_rate, bundle.sample_rate)
  with torch.inference_mode():
    emission, _ = model(waveform)
  
  decoder = GreedyCTCDecoder(
    labels=bundle.get_labels(),
    ignore=(0, 1, 2, 3),
  )
  transcript = decoder(emission[0])
  
  

  return " ".join(transcript.split("|"))
  
@app.post("/api/files/")
async def create_file(file: bytes = File(...)):
    save = open('assets/speech.wav', 'wb')
    save.write(file)
    save.close()
    transcript = sampleInput('assets/speech.wav')

    return {"transcript": transcript}

@app.post("/api/webaudio")
async def create_file(file: bytes = File(...)):
    try:
      save = open('assets/speech.webm', 'wb')
    except FileNotFoundError:
      save = open('assets/speech.webm', 'x')
    save.write(file)
    save.close()
    convert_webm_to_wav('assets/speech.webm')
    os.remove('assets/speech.webm')
    transcript = sampleInput('assets/speech.wav')
    os.remove('assets/speech.wav')


    # BERT Masked tokens for unknown words
    # arr_transcript = transcript.split()
    # new_transcript = arr_transcript
    # for index, token in enumerate(arr_transcript):
    #   print(index)
    #   if not (token.lower() in words.words()):
    #     print(token.lower())
    #     new_transcript[index] = "[MASK]"
    #     new_transcript[index] = unmasker(" ".join(new_transcript))[0]['token_str']
    #     print(new_transcript[index])
    #     print(" ".join(new_transcript))
      
      # If unknown word
      # Mask and fill accordingly
    # print(" ".join(new_transcript))
    return {"transcript": transcript}


def convert_webm_to_wav(file):
    command = ['ffmpeg', '-i', file, '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000', file[:-5] + '.wav']
    subprocess.run(command,stdout=subprocess.PIPE,stdin=subprocess.PIPE)


