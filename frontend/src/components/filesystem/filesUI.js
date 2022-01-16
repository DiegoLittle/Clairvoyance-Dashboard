import React, { useState } from 'react'
import Link from 'next/link'
import { useDispatch,useSelector } from 'react-redux'
import { setNote } from '../../store/slices/noteSlice'
import {setDirectory} from '../../store/slices/directorySlice'
import Breadcrumb from './breadcrumb'



const filesUI = () => {
    const directory = useSelector((state)=>state.directory)
    const dispatch = useDispatch()


    async function handleOpen(item) {

            const res = await fetch("http://192.168.1.223:5000/api/files/open", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        })
        const data = await res.json()
        console.log(data)
        if(data.type=="File"){
            dispatch(setNote({filename:data.filename,contents:data.contents}))
        }
        else{
            // Set current directory redux
            dispatch(setDirectory(data))
        }
        
        
        
    
    }

    return (
        <div>
            <Breadcrumb></Breadcrumb>
        <div className="grid grid-cols-2 grid-rows-4">
            {directory.documents.map((item) =>
                <div className="grid mx-8">
                    <div onClick={()=>handleOpen(item)} className={item.type == "File" ? "bg-themeBlue-200 p-2 my-4 rounded-lg cursor-pointer" : "bg-red-100 p-2 my-4 rounded-lg cursor-pointer"}>
                        {/* <Link key={item.filename} href={`info/documents/${item.filename}`}>
                            <a> */}
                                <div className="font-semibold">
                                    {item.filename}
                                </div>
                            {/* </a>
                        </Link> */}
                        <div className="">
                            {/* <button onClick={() => handleRead(item)} className="hover:bg-themeBlue-300 rounded-lg ml-auto">Edit</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}

export default filesUI

export async function getServerSideProps(context){
    // let myFS = new Filesystem()
}