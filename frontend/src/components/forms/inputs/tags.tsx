import {useState} from 'react'
const tagsInput = ({bindTags,tags}) => {
    
    const [tag,setTag] = useState("")
    function keyPress(e){

        if (e.key==" " && tag!=" "){
            bindTags(tags=>[...tags,e.target.value])
            setTag("")
        }
        if (e.key=="Backspace" && tag==""){
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            bindTags(tagsCopy)
            setTag(poppedTag)
        }
       }

    const deleteTag = (index) => {
        bindTags(prevState => prevState.filter((tag, i) => i !== index))
        // console.log(index)
      }
    return(
        <div className="inline h-auto w-1/2 p-2 border rounded-xl bg-blue-50 ">
            {tags.map((tag,index)=>
            <div className="inline mx-2 bg-white p-1 rounded-l my-auto">
                {tag}
                <button className="mx-1 text-blue-600 hover:text-blue-800" onClick={()=>deleteTag(index)}>x</button>
                </div>
            )}
        <input value={tag} onChange={(e)=>{setTag(e.target.value)}} onKeyDown={keyPress} className="w-auto cursor-auto my-1 rounded-l bg-blue-50">
        </input>
        </div>
    )
}

export default tagsInput;