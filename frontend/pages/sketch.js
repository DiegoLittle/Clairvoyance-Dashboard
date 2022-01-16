import React, { useState } from 'react'
import { fetchEvents } from '../src/components/api';
import FilesUI from '../src/components/filesystem/filesUI'
// import {listDirectory} from '../src/lib/posts'
import { useSelector, useDispatch } from 'react-redux'
import { setNote,setNoteContents } from '../src/store/slices/noteSlice';
import { setDirectory } from '../src/store/slices/directorySlice';

const sketch = ({currentDir}) => {
    const note = useSelector((state)=>state.note)
    const dispatch = useDispatch()
    dispatch(setDirectory(currentDir))
    



    async function handleSave(savedNote){
        const res = await fetch("http://192.168.1.223:5000/api/files/save",{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(savedNote)
    })}
    
    

    const handleChange = async (e) => {
    if (e.target.name=="contents"){
        let test = dispatch(setNoteContents(e.target.value))
        handleSave({"filename":note.filename,"contents":e.target.value})
    }
    else if(e.target.name=="filename"){
        dispatch(setNote({filename:e.target.value,contents:note.contents}))
    }
    
 }

 function handleKey(e){
    //  console.log(e.key)
 }
    

    return (
        <div className="flex m-8">
            <div className="flex-col mr-3 w-1/2">
                <input autoComplete="off" value={note.filename} name="filename" onChange={handleChange} className="flex mb-4 focus:outline-white bg-gray-800 p-3 text-white rounded-xl"/>
                <textarea onKeyDown={handleKey} value={note.contents} name="contents" onChange={handleChange} className="flex w-full h-full focus:outline-white bg-gray-800 p-3 text-white rounded-xl">
                </textarea>
                {/* <button onClick={handleSave} className="cool-button mt-2">Save</button> */}
                {/* <button onClick={handleRead} className="cool-button mt-2">Read</button> */}
            </div>
            <FilesUI ></FilesUI>
            {/* <NotesList></NotesList> */}
            
        </div>
    )
}

export default sketch


export async function getServerSideProps(context) {
    let res = await fetch("http://192.168.1.223:5000/api/files/list")

    // let currentDir = await res.json()

    // const data = await fetchEvents()


    return {
        props: {
            currentDir,
        }, // will be passed to the page component as props
    }
}