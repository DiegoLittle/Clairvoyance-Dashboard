import React,{useState} from 'react'
import {postEvent} from '../api'

const base = ({children,title,type}) => {

    const [event,setEvent] = useState({
        title:title,
        type:type,
        data:{}
    })
    const [state,setState] = useState({})
    const handleChange = (e) => {
        let newObj = { ...state }
        console.log(e.target.name)
 
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value,
            enumerable:true
        })
        console.log(newObj)
        setState(newObj)
    }
    const handleSubmit=(e)=>{
        let newObj ={...event}
        newObj.data = {...state}
        console.log(newObj)
        postEvent(newObj)
        e.preventDefault()
        e.target.reset()
    }
    return (
        <form onSubmit={handleSubmit}>
            {children.map((e)=>{
                if(e.type=="input"){
                    return(
                    React.cloneElement(e, { onChange: handleChange })
                    )
                }
                else{
                    return(
                    React.cloneElement(e)
                    )
                }
            })}
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
