import React from 'react'
import dayjs from 'dayjs'
import {postEvent,fetchEvents} from '../api'

const fiveMin = (props) => {
    let event = {
        title:"Duolingo",
        type:"Plan",
    }
    function handleClick(){
        fetchEvents().then(d=>{console.log(d)})
    }
    return (
        <div className="flex w-full border-b">
            <div className="p-2 border w-1/6">{dayjs().format('HH:') + '55'}</div>
            <div className="flex flex-row p-2 border w-5/6">
                {(parseInt(dayjs().format('mm')) >= 55 & parseInt(dayjs().format('mm')) < 60) ? <h1>Here</h1> : null}
                <div>{props.data ? props.data : null}</div>
                {/* <input className="" value={props.data}></input> */}
                {/* <button onClick={handleClick} className="flex text-right mx-2">Edit</button> */}
            </div>
        </div>
    )
}

export default fiveMin
