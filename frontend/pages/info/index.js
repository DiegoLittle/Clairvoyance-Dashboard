import React,{useState} from 'react'
// import Header from '../../components/nav/search'
import Search from '../../src/components/modules/header/search'
import TextDropdown from '../../src/components/forms/inputs/textDropdown'
import SearchDropdown from '../../src/components/modules/header/searchDropdown'
import BookmarkForm from '../../src/components/forms/bookmarkForm'
import Bookmarks from '../../src/components/information/bookmarks_view.js'
import { fetchBookmarks } from '../../src/components/api'

const dashboard = ({ bookmarks }) => {
    const [showBookmark,setShowBookmark]=useState(false)
    return (
        <div className="flex flex-col w-full">
            <div className="p-2">
                <SearchDropdown></SearchDropdown>
            </div>
            <div>
                <button className='cool-button ml-2' onClick={()=>{setShowBookmark(!showBookmark)}}>Add Bookmark</button>
                {showBookmark?
                <BookmarkForm></BookmarkForm>:""
            }
            <Bookmarks bookmarks={bookmarks}></Bookmarks>
            </div>
        </div>
    )
}

export default dashboard

export async function getServerSideProps() {
    const bookmarks = await fetchBookmarks()
    return {
        props: {bookmarks
        }
    }
}