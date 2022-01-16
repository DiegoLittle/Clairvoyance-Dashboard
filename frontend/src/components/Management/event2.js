import React, { useState } from 'react'
import { deleteEvent,updateEvent } from '../api'
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ArchiveIcon} from '@heroicons/react/solid'


const event = (props) => {

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

    const [state, setState] = useState(props.data)
    const [events, setEvents] = useRecoilState(eventsState);
    const [editMode,setEditMode] = useState(false)


    function handleArchive() {
        // Filtering events array by removing the current event and setting the result as the new state
        setEvents(events.filter((e) => {
            return e.id != state.id
        }))
        let newObj = {...state}
        newObj.archived = true
        //Deleting Event serverside 
        updateEvent(newObj);
    }
    function handleDel() {
        // Filtering events array by removing the current event and setting the result as the new state
        setEvents(events.filter((e) => {
            return e.id != state.id
        }))
        //Deleting Event serverside 
        deleteEvent(state);
    }

    const handleUpdate = ()=>{
        setEditMode(!editMode)
        updateEvent(state)
    }
    const handleChange =(e)=>{
        setState((old)=>{
            let newObj = {...old}
            Object.defineProperty(newObj,e.target.name,{
                value: e.target.value
            })
            return newObj
        })
    }
    const handleDateChange=(date)=>{
        setState((old)=>{
            let newObj = {...old}
            Object.defineProperty(newObj,"date",{
                value: date
            })
            return newObj
        })

    }
    return (
        <div className="flex flex-col border-2 border-blue-100 rounded-xl shadow p-3 my-2">
            <div className="flex flex-row justify-between">
                {editMode ? <input name="title" onChange={handleChange} defaultValue={state.title} className=""></input> : <div className="text-base">{state.title}</div>}
                
                <div className="flex flex-row">
                    {editMode ?
                    <img onClick={handleUpdate} className="mb-4 h-4 w-4 cursor-pointer mx-1" src="icons/check.svg"></img>:
                    <img onClick={()=>{setEditMode(!editMode)}} className="mb-4 h-4 w-4 mx-1 cursor-pointer" src="icons/edit.svg"></img>}
                    <ArchiveIcon onClick={handleArchive} className="mb-4 h-4 w-4 mx-1 cursor-pointer hover:text-blue-500"></ArchiveIcon>
                    <img onClick={handleDel} className="mb-4 h-4 w-4 mx-1 cursor-pointer" src="icons/close.svg"></img>
                </div>
            </div>
            {editMode ?
            <textarea name="text" onChange={handleChange} defaultValue={state.text} ></textarea>:
            <p className="">{state.text}</p>
        }   {editMode ? 
            <DatePicker
            selected={dayjs(state.date).toDate()}
            onChange={handleDateChange}
            showTimeInput
            customTimeInput={<ExampleCustomTimeInput />}></DatePicker> :
            <p className="">{state.date??dayjs(state.date).format("MM/DD HH:mm")}</p>
            }
        </div>
    )
}

export default event
