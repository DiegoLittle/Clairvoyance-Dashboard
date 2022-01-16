import React, { useEffect,useState } from 'react'
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import TTS from '../src/components/AI/textToSpeech';






const test = () => {

  

  const [prompt,setPrompt] = useState(`1. Create a CRUD API`)
  const [text,setText] = useState("")
  const [completionText,setCompletionText] = useState("")

  const setupSpeech = async (text) => {
    const res = await fetch("http://127.0.0.1:8000/api/get-speech-token")
    let data = await res.json()
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(data.token,data.region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync(result=>{
      if (result.reason === ResultReason.RecognizedSpeech) {
        console.log(result.text)
        setText(result.text)
        setPrompt(result.text)
    } else {
        setText('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.')
    }
    })
  
  }
  async function synthesizeSpeech(speech) {
    const res = await fetch("http://127.0.0.1:8000/api/get-speech-token")
    let data = await res.json()
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(data.token,data.region);
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();

    const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
      speech,
      result => {
          if (result) {
              synthesizer.close();
              return result.audioData;
          }
      },
      error => {
          console.log(error);
          synthesizer.close();
      });
}
  const getCodeComplete=async()=>{
    let format = `"""${prompt}"""`
    console.log(format)
    const res = await fetch('http://127.0.0.1:8000/api/ai/code',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({"prompt":format})
        
    })
    const data = await res.json()
    let arr=data.split("##")
    console.log(arr)
    setCompletionText(data)
    console.log(data)
  }

  const getConversation=async()=>{
    // let format = `"""${prompt}"""`
    // console.log(format)
    console.log(prompt)
    const res = await fetch('http://127.0.0.1:8000/api/ai/conversation',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify({"prompt":`Claire is an intelligent chatbot that is very helpful.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: ${prompt}\nAI:`})
        
    })
    const data = await res.json()
    // let arr=data.split("##")
    // console.log(arr)
    setCompletionText(data)
    console.log(data)
    synthesizeSpeech(data)

  }

  const handleChange = (e)=>{
    setPrompt(e.target.value)
  }
  return (
    <div className="m-8">
      <button onClick={setupSpeech} className="inline-flex py-2 px-5 text-sm rounded-xl items-center bg-blue-100 text-gray-700 hover:bg-blue-200 font-medium shadow focus:outline-none hover:text-black mx-2">Record Speech</button>
      {/* <button onClick={synthesizeSpeech} className="inline-flex py-2 px-5 text-sm rounded-xl items-center bg-blue-100 text-gray-700 hover:bg-blue-200 font-medium shadow focus:outline-none hover:text-black">Synthesize Speech</button> */}
      <div>{text}</div>
      {/* <Audio></Audio> */}
      {/* <input onChange={handleChange} className="m-2 p-2 border border-blue-500 rounded-lg"></input> */}
      <button onClick={getConversation} className="inline-flex py-2 px-5 text-sm rounded-xl items-center bg-blue-100 text-gray-700 hover:bg-blue-200 font-medium shadow focus:outline-none hover:text-black m-2">Get Completion</button>
      <button onClick={getCodeComplete} className="inline-flex py-2 px-5 text-sm rounded-xl items-center bg-blue-100 text-gray-700 hover:bg-blue-200 font-medium shadow focus:outline-none hover:text-black m-2">Get Code</button>
      <div className="flex max-w-full">
        <pre className="text-sm p-2 m-2">{completionText}</pre>
      </div>
      <TTS speechFunction={synthesizeSpeech}></TTS>
    </div>
  )
}



export default test
