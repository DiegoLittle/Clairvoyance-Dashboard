import requests
from bs4 import BeautifulSoup
# from sklearn.feature_extraction.text import CountVectorizer
# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity

def getTitle(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    return soup.title.text

def keywordExtraction(doc):
      n_gram_range = (1, 1)
      stop_words = "english"

      # Extract candidate words/phrases
      count = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([doc])
      candidates = count.get_feature_names()
      print(count.vocabulary_)

      # Embed documents and candidate words/phrases using distilbert
      model = SentenceTransformer('all-MiniLM-L6-v2')
      doc_embedding = model.encode([doc])
      candidate_embeddings = model.encode(candidates)


      # Cosine Similarity between doc and candidate 
      top_n = 5
      distances = cosine_similarity(doc_embedding, candidate_embeddings)
      keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]]
      return keywords