import React from 'react'
import dayjs from 'dayjs'

const hour = (props) => {
    // console.log(props.events)
    let hour = dayjs().format("HH")+":00"



    return (
        <div className="flex w-full">
            <div className={`text-center w-1/6 text-xs ${hour==props.time ? "border-r border-blue-500" : "border"}`}>{props.time.split(":",1)}</div>
        {/* {props.data ? props.data : null} */}
            <div className="p-2 w-5/6">
            {props.events ? props.events.map((e)=><div key={e.id}>{e.title}</div>): ""
        }
            </div>
    </div>
    )
}

export default hour
