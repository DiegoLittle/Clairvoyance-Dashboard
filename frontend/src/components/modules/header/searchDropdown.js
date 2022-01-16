import React,{useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'


const search = () => {
    let baseSuggestions = ["Hi","good","energy","llama"]

    
    let [showDropdown,setShowDropdown] = useState(false)
    let [suggestions,setSuggestions] = useState(baseSuggestions)
    let [dropIndex,setDropIndex]=useState(-1)
    const router = useRouter()
    let [state,setState] = useState("")
    let [search_results,Setsearch_results]=useState([])
    const handleChange = async(e) => {
        setState(e.target.value)
        const res = await fetch(`http://127.0.0.1:8000/api/search/?query=${e.target.value}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
        })
        const data = await res.json()
        Setsearch_results(data)
        data.forEach(e =>{
            console.log(e.title)
            setSuggestions(old=>{
                old.push(e.title)
                return old
            })
        })
        setSuggestions(old=>{
            return old.filter(item=>{
                // 
                return item.substr(0,e.target.value.length).toUpperCase()==e.target.value.toUpperCase()
            })
        })
        if (e.target.value ==""){
            setSuggestions(baseSuggestions)
            setShowDropdown(false)
        }
        else{
            setShowDropdown(true)
        }
        console.log(e.target.value)
    }
    const keyPress = (e)=>{
        if (e.key == "Enter") {
            router.push(search_results[dropIndex].link)
            // handleSearch()
        }
        if(e.key=="ArrowDown"){
            console.log(e.target.value)
            setDropIndex(dropIndex+=1)
            console.log(dropIndex)
        }
        if(e.key=="ArrowUp"){
            console.log(e.target.value)
            setDropIndex(dropIndex-=1)
            console.log(dropIndex)
        }
    }
    const handleSearch = async (query) =>{
        const data = await res.json()
        Setsearch_results(data)
        // router.push('/info/serp')
        
}
    return (
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div className="w-full">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        // onFocus={()=>{setShowDropdown(true)}}
                        onBlur={()=>{setShowDropdown(false)}}
                        value={state}
                        onChange={handleChange}
                        onKeyDown={keyPress}
                        autoComplete="off"
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                    />
                </div>
                {showDropdown?
                <div className="absolute w-11/12 z-10 mt-1 py-1 bg-white shadow-lg  max-h-60 rounded-md  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {
                    search_results.map((item) => (
                        <div
                            // If item index == dropIndex then set it active
                            className={`${search_results[dropIndex]==item ? "bg-blue-50":""} cursor-pointer hover:bg-blue-50 active:bg-blue-50 select-none relative py-2 pl-3 pr-9`}
                            // value={person}
                            // onClick={() =>setText(person.name)}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                :"" }
                {/* {suggestions.map(suggestion=><div>
                <div>{suggestion}</div>
            </div>)} */}
            </div>

        </div>
    </div>
    )
}

export default search
