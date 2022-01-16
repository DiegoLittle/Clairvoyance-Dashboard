from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
doc = """
         Supervised learning is the machine learning task of 
         learning a function that maps an input to an output based 
         on example input-output pairs.[1] It infers a function 
         from labeled training data consisting of a set of 
         training examples.[2] In supervised learning, each 
         example is a pair consisting of an input object 
         (typically a vector) and a desired output value (also 
         called the supervisory signal). A supervised learning 
         algorithm analyzes the training data and produces an 
         inferred function, which can be used for mapping new 
         examples. An optimal scenario will allow for the algorithm 
         to correctly determine the class labels for unseen 
         instances. This requires the learning algorithm to  
         generalize from the training data to unseen situations 
         in a 'reasonable' way (see inductive bias).
      """
from sklearn.feature_extraction.text import CountVectorizer
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

print(keywordExtraction(doc))