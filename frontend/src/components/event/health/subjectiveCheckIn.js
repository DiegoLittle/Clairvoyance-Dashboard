import React, { useState } from 'react'
import styles from './subjectiveCheckIn.module.css'
import { postEvent } from '../../api'

const checkIn = ({ showModal }) => {

    const [event, setEvent] = useState({
        title:"Subject Health Log",
        type:"log.health",
        data:{}
    })
    const [data,setData] = useState({})

    const handleChange = (e) => {
        let newObj= {...data}
        console.log(newObj)
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value,
            enumerable:true
        })
        console.log(newObj)
        setData(newObj)
    }
    const handleSubmit=()=>{
        let newObj ={...event}
        newObj.data = {...data}
        console.log(newObj)
        postEvent(newObj)
        showModal(false)
    }
    return (
        <div>
            <form>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
                    Motivation
                </label>
                <div className="mt-1">
                    <input name="motivation" onChange={handleChange} className={styles.customSlider} type="range" min="1" max="100" step="1" />
                </div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
                    Physical Wellbeing
                </label>
                <div className="mt-1">
                    <input name="physical" onChange={handleChange} className={styles.customSlider} type="range" min="1" max="100" step="1" />
                </div>
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmit}
                >
                    Got it, thanks!
                </button>

            </form>
        </div>
    )
}

export default checkIn
