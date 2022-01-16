import React,{useState,Fragment,useEffect,useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Timepicker from '../time-track/timepicker'
import {postEvent,fetchEvents} from '../api'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { addEvent } from '../../store/slices/eventsSlice';
import Tags from '../forms/inputs/tags'


const createEvent = ({setIsOpen}) => {
    let formRef = useRef(null)
    const dispatch = useDispatch()
    const [tags,setTags] = useState([])
    const [event,setEvent] = useState({
        created_at : '',
        type : '',
        title: '',
        text:'',
        date:dayjs().format(),
        tags: ["Timeline"]
    })



    const handleSubmit = (e)=>{
            let newState = {...event}
            newState.id = uuidv4()
            newState.created_at = dayjs().format()
            newState.tags = tags
            // newState.title=e.target.title.value,
            // newState.text= e.target.text.value,
            // newState.date = event.date
            console.log(newState)
            dispatch(addEvent(newState))
            setEvent(newState)

            postEvent(newState).then(d=>{
                console.log("posted!")
                console.log("Post Response: ")
                console.log(d)
                console.log("Event: " + event)
            })
            e.preventDefault()
            e.target.reset()
            setIsOpen(false);

    }

    const handleChange = (e)=>{


        setEvent((old)=>{
            let newObj = {...old}
            Object.defineProperty(newObj,e.target.name,{
                value: e.target.value
            })
            return newObj
        })
    }

    return (
             <form ref={formRef} onSubmit={handleSubmit} className="w-full pr-10">
                <h1 className="text-base font-semibold">Add an Event</h1>
              <div className="my-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input required={true} onChange={handleChange} type="text" autoComplete="off" id="title" name="title" className="border rounded-lg p-2 pl-3 h-8 focus:outline-none w-full"></input>
              </div>


               <div className="my-2">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                    <textarea onChange={handleChange} name="text" autoComplete="off" id="text" className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none"></textarea>
               </div>
               <Tags tags={tags} bindTags={setTags}></Tags>

               <div className="my-2">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <Timepicker event={event} setEvent={setEvent}></Timepicker>
                    {/* <input type="time" id="time" className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none"></input> */}
               </div>
               <input type="submit" value="Submit" className="block bg-blue-500 p-2 rounded shadow-sm w-full text-white font-bold hover:bg-blue-400 cursor-pointer "></input>
            </form>
    )
}

export default createEvent
