import React, { useState } from 'react'
import { postEvent,updateEvent } from '../../api'

const base = ({log}) => {
    let logDefault = {
        title: "Medication Log",
        type: "log.health.medication",
        data: {}
    }
    let updating = false;
    if(log!=undefined){
        logDefault=log
        updating = true;
    }

    console.log(logDefault)
    const [currentMedLog, setCurrentMedLog] = useState(logDefault)
    const [state, setState] = useState(currentMedLog.data)

    const handleChange = (e) => {
        let newObj = { ...state }
        if (e.target.type == "checkbox"){
            newObj = Object.defineProperty(newObj, e.target.name, {
                value: e.target.checked,
                enumerable: true
            })
        }
        

        console.log(newObj)
        setState(newObj)
    }
    const handleSubmit = (e) => {
        let newObj = { ...currentMedLog }
        newObj.data = { ...state }
        console.log(newObj)
        if(updating){
            updateEvent(newObj)
        }
        else{
            postEvent(newObj)
        }
        
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">Skin</label>
            <input
                onChange={handleChange}
                defaultChecked={currentMedLog.data.skin}
                id="skin"
                aria-describedby="offers-description"
                name="skin"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">Sleep</label>

            <input
                onChange={handleChange}
                defaultChecked={currentMedLog.data.sleep}
                id="sleep"
                aria-describedby="offers-description"
                name="sleep"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">Custom</label>

            <input onChange={handleChange} defaultValue={currentMedLog.data.Custom} className="p-2 bg-gray-100 rounded-xl focus:outline-none" type="text" name="Custom" />
            <button
                type="submit"
                className="block justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
                Got it, thanks!
            </button>

        </form>
    )
}

export default base
