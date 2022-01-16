import { fetchBookmarks } from '../api'


const bookmarks = ({bookmarks}) => {
    console.log(bookmarks)
    return(
        <div>
            {bookmarks.map((b)=>
            <div className='bg-gray-50 p-2 m-2 rounded-xl text-sm'><a href={b.url} target="_blank">{b.title}</a></div>
            )}
        </div>
    )
}




export async function getServerSideProps(context) {
    
    console.log("TEST")
    // const data = await fetch('http://127.0.0.1:8000/api/stats/'
    // ).then((response) => response.json());
    return {
        props: { eventsData }, // will be passed to the page component as props
    }
}
export default bookmarks
