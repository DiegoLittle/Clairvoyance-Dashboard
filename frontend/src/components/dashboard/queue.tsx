import {useState} from 'react'
import Event from '../Management/eventViews/queueEvent'



export default function Example({events}) {
  let items = events.filter((event)=>{
    return event.tags.includes("Queue");
  })
  let [list,setList] = useState([])
  console.log(items)
  return (
      <div className="col-span-2 bg-blue-100 rounded-xl">
        
        {/* <form onSubmit={(e)=>{
          e.preventDefault()

          setList(list=>{
            list.push({text:e.target[0].value})
            return list
          })
        }} >
          <input type="text" />
          <button type="submit" >Enter</button>
        </form> */}
      {items.map((item)=>
      <div className="text-center p-1 border-blue-300">
        {/* {item.title} */}
        <Event event={item}></Event>
      </div>)}
      </div>
  )
}