import React, { useEffect } from 'react'
import Hour from './hour-day'
import { fetchEvents,deleteEvent } from '../api'
import dayjs from 'dayjs'



const day = ({data}) => {
    const [events, setEvents] = useRecoilState(eventsState);
    setEvents(data)
    let today = dayjs().format("YYYY-MM-DD")

    let todays_events = events.filter((e)=>{
        return dayjs(e.date).format("YYYY-MM-DD") == today;
    })

    
    const getHourEvents = (hour) =>{
        let hEvents = todays_events.filter(event=>{
            let eventhour = dayjs(event.date).format("HH")
            return eventhour == hour;
        })
        return hEvents
    }
    // ForEach of todays_events
    // Get hour of event and assign it so Hour component receives its events
    
    // Variable for each hour hardcoded i.e hour1 = {}
    // Todays events

    useEffect(()=>{
        let hour = dayjs().format("HH")
        if (hour > 5){
            document.getElementById("container").scrollTop = hour*30;
        }
    })

    return (
        <div id="container" className="flex flex-col border-2 border-blue-100 w-full h-64 overflow-scroll">
            <Hour time="00:00" events={getHourEvents(0)}></Hour>
            <Hour time="01:00" events={getHourEvents(1)}></Hour>
            <Hour time="02:00" events={getHourEvents(2)}></Hour>
            <Hour time="03:00" events={getHourEvents(3)}></Hour>
            <Hour time="04:00" events={getHourEvents(4)}></Hour>
            <Hour time="05:00" events={getHourEvents(5)}></Hour>
            <Hour time="06:00" events={getHourEvents(6)}></Hour>
            <Hour time="07:00" events={getHourEvents(7)}></Hour>
            <Hour time="08:00" events={getHourEvents(8)}></Hour>
            <Hour time="09:00" events={getHourEvents(9)}></Hour>
            <Hour time="10:00" events={getHourEvents(10)}></Hour>
            <Hour time="11:00" events={getHourEvents(11)}></Hour>
            <Hour time="12:00" events={getHourEvents(12)}></Hour>
            <Hour time="13:00" events={getHourEvents(13)}></Hour>
            <Hour time="14:00" events={getHourEvents(14)}></Hour>
            <Hour time="15:00" events={getHourEvents(15)}></Hour>
            <Hour time="16:00" events={getHourEvents(16)}></Hour>
            <Hour time="17:00" events={getHourEvents(17)}></Hour>
            <Hour time="18:00" events={getHourEvents(18)}></Hour>
            <Hour time="19:00" events={getHourEvents(19)}></Hour>
            <Hour time="20:00" events={getHourEvents(20)}></Hour>
            <Hour time="21:00" events={getHourEvents(21)}></Hour>
            <Hour time="22:00" events={getHourEvents(22)}></Hour>
            <Hour time="23:00" events={getHourEvents(23)}></Hour>
    </div>
    )
}

export default day
