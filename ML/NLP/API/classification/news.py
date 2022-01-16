from typing import Optional
import onnx
from fastapi import FastAPI
import onnxruntime as ort
import numpy as np
app = FastAPI()
import torch
from torchtext.datasets import AG_NEWS
from torchtext.data.utils import get_tokenizer
from torchtext.vocab import build_vocab_from_iterator

ag_news_label = {1: "World",
                 2: "Sports",
                 3: "Business",
                 4: "Sci/Tec"}

tokenizer = get_tokenizer('basic_english')
train_iter = AG_NEWS(split='train')

def yield_tokens(data_iter):
    for _, text in data_iter:
        yield tokenizer(text)

vocab = build_vocab_from_iterator(yield_tokens(train_iter), specials=["<unk>"])
vocab.set_default_index(vocab["<unk>"])
text_pipeline = lambda x: vocab(tokenizer(x))
label_pipeline = lambda x: int(x) - 1


def predictNews(text):
    text = "Text from the news article"
    text = torch.tensor(text_pipeline(text))

    onnx_model = onnx.load("assets/ag_news_model.onnx")
    onnx.checker.check_model(onnx_model)

    ort_sess = ort.InferenceSession('assets/ag_news_model.onnx')
    outputs = ort_sess.run(None, {'input': text.numpy(),
                                'offsets':  torch.tensor([0]).numpy()})
    # Print Result
    result = outputs[0].argmax(axis=1)+1
    # print("This is a %s news" %ag_news_label[result[0]])
    return ag_news_label[result[0]]
