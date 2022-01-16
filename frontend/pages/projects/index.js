import React,{useEffect,useState} from 'react'
import Empty from '../../src/components/project/empty'
import Thumbnail from '../../src/components/project/thumbnail'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { setProjects } from '../../src/store/slices/projectsSlice'

const index = ({data}) => {
    // console.log(data)
    const projects = useSelector((state)=>state.projects)
    const dispatch = useDispatch()
    // State is updated before the API deletes project
    // This re renders and resets the state back
    useEffect(()=>{
        dispatch(setProjects(data))
    },[])


    
    // const [projects,setProjects] = useState(data)


    return (
        <div className="h-full">
            {projects.map(project => 
                <Thumbnail key={project.id} item={project}></Thumbnail>
            )}
            {projects.length == 0 ? <Empty></Empty> : <Link href='/projects/create'><a className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded m-4">Create a new Project</a></Link>}
        </div>
    )
}

export default index


export async function getServerSideProps(context) {
    const res = await fetch(`http://127.0.0.1:8000/api/projects/`);
    const data = await res.json()

    if(!data){
        return{
            notFound:true
        }
    }

    return {
      props: {
          data
      }, // will be passed to the page component as props
    }
  }