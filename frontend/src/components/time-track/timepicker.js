import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {eventState} from '../Management/createEvent'
import dayjs from 'dayjs'


const timepicker = ({event,setEvent}) => {




    const [startDate, setStartDate] = useState(new Date());
    // setEvent(old=>{
    //     let newState = {...old}
    //     console.log(newState)
    // })

    const ExampleCustomTimeInput = ({ date, value, onChange }) => (
        // <input
        // value={value}
        // onChange={(e) => onChange(e.target.value)}
        // style={{ border: "solid 1px pink" }}
        // />
        <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="time" id="time" className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none"></input>
    );
    
    function handleDateChange(date){

        setEvent(old=>{
            let newObj = {...old}
            Object.defineProperty(newObj,"date",{
                value: dayjs(date).format()
            })
            return newObj
        })

    }
    return (

        <DatePicker
        selected={dayjs(event.date).toDate()}
        onChange={handleDateChange}
        showTimeInput
        customTimeInput={<ExampleCustomTimeInput />}
      />
    )
}

export default timepicker
