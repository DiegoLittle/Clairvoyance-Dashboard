import React, {useState,useEffect} from 'react'
import dayjs from 'dayjs'
import Five from './fiveMin'



const hour = (props) => {
    
    const [time,setTime] = useState(dayjs().format('HH:mm:ss'));

    useEffect(()=>{
        setInterval(() => {
            setTime(dayjs().add(1,'second').format('HH:mm:ss'))
        }, 1000);
    })

    return (
        <div className="flex p-4 w-1/2 flex-col border rounded m-6">
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'00'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'05'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'10'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'15'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'20'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'25'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'30'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'35'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'40'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'45'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <div className="flex w-full border-b">
                <div className="p-2 border w-1/6">{dayjs().format('HH:')+'50'}</div>
                <div className="p-2 border w-5/6">{props.data ? props.data : null}</div>
            </div>
            <Five data={props.data}></Five>
            
            
    </div>
    )
}

export default hour
