import pandas as pd
import json

df = pd.read_csv("emoLexEng.csv")
df = df.iloc[:,1:]






def getEmotions(string):
    wordSentiments=[]
    words = string.split()

    for word in words:
        
        test = df.loc[df["English (en)"] == word]
        # test=df.rename(columns={"English (en)":"word"})
        parsed = json.loads(test.to_json(orient="split"))
        if (test.empty):
            continue
        else:
            # print(type(parsed['data'][0]))
            i=0
            sentimentObject = {}
            for column in parsed['columns']:
                sentimentObject[column]=parsed['data'][0][i]
                i = i+1
            wordSentiments.append(sentimentObject)
    return wordSentiments
WordEmotions = getEmotions("I hate all of yall")
print(WordEmotions)
totalPositive = 0
totalNegative = 0
totalAnger = 0
totalAnticipation=0
totalDisgust=0 
totalFear = 0
totalJoy=0
totalSadness=0
totalSurprise=0 
totalTrust=0
# total
# print(WordEmotions)
for i in WordEmotions:
    totalPositive += int(i["Positive"])
    totalNegative += i["Negative"]
    totalAnger += i["Anger"]
    totalAnticipation += i["Anticipation"]
    totalDisgust+= i["Disgust"]
    totalFear += i["Fear"]
    totalJoy+= i["Joy"]
    totalSadness+= i["Sadness"]
    totalSurprise+= i["Surprise"]
    totalTrust+= i["Trust"]
print("Total Words: "+ str(totalPositive+totalNegative))
print("Positive Words: "+ str(totalPositive))
print("Negative Words: "+ str(totalNegative))
print("Angry Words: "+ str(totalAnger))
print("Anticipation Words: "+ str(totalAnticipation))
print("Disgust Words: "+ str(totalDisgust))
print("Fear Words: "+ str(totalFear))
print("Joyful Words: "+ str(totalJoy))
print("Sadness Words: "+ str(totalSadness))
print("Suprise Words: "+ str(totalSurprise))
print("Trust Words: "+ str(totalTrust))
# print(df.iloc[:,1:])