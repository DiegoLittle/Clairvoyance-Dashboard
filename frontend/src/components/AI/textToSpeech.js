import React,{useState} from 'react'

const textToSpeech = ({speechFunction}) => {
    const [state,setState] = useState("")
    const handleChange = (e) => {
    setState(e.target.value)
    }
    const handleSubmit = ()=>{
        speechFunction(state)
    }
    return (
        <div>
            <textarea value={state} name="text" onChange={handleChange} className="flex w-1/4 h-full focus:outline-white bg-gray-800 p-3 text-white rounded-xl">
            </textarea>
            <button onClick={handleSubmit}>Get Speech</button>
        </div>
    )
}

export default textToSpeech
