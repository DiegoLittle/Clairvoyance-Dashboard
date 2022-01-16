import Tags from './inputs/tags'
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

const bookmarkForm = ()=>{
    const [tags,setTags] = useState([])
    const [url,setURL] = useState("")
    const [error,setError] = useState({"isError":false,"message":""})
    async function handleSubmit(e){
        e.preventDefault();
        var bookmark={
            id:uuidv4(),
            title:"",
            url:url,
            tags:tags,
        }
    const res = await fetch(("http://127.0.0.1:8000/api/bookmarks"),{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(bookmark)
    })
    const data = await res.json()
    console.log(data)
    if(data.duplicate){
        setError({isError:true,message:"Duplicate Bookmark"})
    }
    else if(data.status_code==200){
        setTags([])
        setURL("")
    }
 
    
        
    }
    return(
    <form onSubmit={handleSubmit} className='mx-2'>
        <label>Bookmark URL</label>
        <input value={url} onChange={(e)=>setURL(e.target.value)} required={true} autoComplete="off" autoFocus className="block mb-1 py-1 px-2 rounded-lg border border-blue-500 focus:outline-none" name="text" type="text" ></input>
        <label className="block mb-1">Tags</label>
        <Tags tags={tags} bindTags={setTags}></Tags>
        <button className='block cool-button'>Submit</button>
        { error.isError ? <div>{error.message}</div>:""}
    </form>
    )
}

export default bookmarkForm