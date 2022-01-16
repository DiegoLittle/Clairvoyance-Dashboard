import React, { useState } from 'react'
import { updateProject } from '../api'
import { v4 as uuidv4 } from 'uuid';

const create_todo = ({ show ,data,setProject}) => {

    //Todo State
    const [state, setState] = useState({
        id:uuidv4(),
        text:'',
        completed:false
    })

    //Updates Todo state on input change
    const handleChange = async (e) => {
        let newObj = { ...state }
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value,
            enumerable:true
        })
        setState(newObj)
    }
    // On Enter it adds the todo to the project state and then updates serverside
    const keyPress = (e) => {
        if (e.key == "Enter") {
            if(state.text.length > 0){
            let newArray
            let project = {...data}
            if(project.todos == undefined){
                newArray=[]
            }
            else{
                newArray = [...project.todos]
            }
            
            newArray.push(state)
            Object.defineProperty(project,"todos",{
                value: newArray,
                enumerable:true
            })
            setProject(project)
            
                
            updateProject(project).then(d=>{
                // console.log("Updated project")
                // console.log(d)
            })
            show(false)
        }

            
            
            
            //Submit Todo
            //Get rid of Input Box
            
        }

        if(e.key=="Escape"){
            show(false)
        }
    }
    //TODO deletes from the project state and then updates serverside

    return (
        <div>
            <input required="true" autoComplete="off" autoFocus onKeyDown={keyPress} className="py-2 px-5 rounded-lg border border-blue-500 focus:outline-none" name="text" type="text" onChange={handleChange}></input>
        </div>
    )
}

export default create_todo
