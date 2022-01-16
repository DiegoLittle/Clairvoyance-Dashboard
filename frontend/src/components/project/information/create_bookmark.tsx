import React, { useState } from 'react'
import { updateProject } from '../../api'
import { v4 as uuidv4 } from 'uuid';


const create_bookmark = ({ project,setProject}) => {


    //Updates Todo state on input change
    const handleChange = async (e) => {

    }
    // On Enter it adds the todo to the project state and then updates serverside
    const keyPress = (e) => {
        if (e.key == "Enter") {
            if(project.bookmarks==undefined){
                project.bookmarks = []
                project.bookmarks.push(e.target.value)
            }
            else{
                project.bookmarks.push(e.target.value)
            }
            console.log(project)
            setProject(project)
            updateProject(project)
            
            }
        }
            
    //TODO deletes from the project state and then updates serverside

    return (
        <div>
            <input required={true} autoComplete="off" autoFocus onKeyDown={keyPress} className="py-2 px-5 rounded-lg border border-blue-500 focus:outline-none" name="text" type="text" onChange={handleChange}></input>
        </div>
    )
}

export default create_bookmark
