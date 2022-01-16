import Create from './create_bookmark'
import { XIcon} from '@heroicons/react/solid'

export default function Bookmarks({project,setProject}) {
    let bookmarks = project.bookmarks

    function deleteBookmark(bookmark) {
        console.log(bookmark)
    }
    
    return (
        <div>
            {bookmarks.map(bookmark =>
            <div className='grid w-1/2 grid-cols-2'>
                <a className='' key={bookmark} target="_blank" href={bookmark}>
                    <div>
                        {bookmark}
                    </div>
                </a>
                <XIcon onClick={()=>{
                    deleteBookmark(bookmark)}} className=" ml-auto mr-2 h-5 w-5 text-blue-500 hover:text-blue-600 cursor-pointer" aria-hidden="true" />
                
            </div>
            )}
            <Create project={project} setProject={setProject}></Create>
        </div>
    )
}



