import { ChevronRightIcon,ChevronLeftIcon, HomeIcon } from '@heroicons/react/solid'
import { useSelector,useDispatch } from 'react-redux'
import {setDirectory} from '../../store/slices/directorySlice'

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

export default function Breadcrumb() {
  const dispatch = useDispatch()
  const directory = useSelector((state:  any)=>state.directory)

  //Major issue with persisting the redux state.
  async function handleCD(path){
    // API post request to return documents for home directory
    // Then set state to result
    const res = await fetch("http://192.168.1.223:5000/api/files/open", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({"filename":path,"Type":"Directory"})
        })
        const data = await res.json()
        console.log(data)
        dispatch(setDirectory(data))
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon onClick={()=>{handleCD("")}} className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
            <ChevronLeftIcon onClick={()=>{
              let list = directory.cwd.split("/")
              list.length = list.length-2
              let dir =list.join('/')
              console.log(dir)
              // handleCD(dir)
              }}></ChevronLeftIcon>
          </div>
        </li>
        <div>
          {directory.cwd}
        </div>
      </ol>
    </nav>
  )
}