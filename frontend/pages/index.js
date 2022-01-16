import React, { useEffect, useState } from "react";
import Week from "../src/components/Management/week";
import { fetchEvents, fetchBookmarks } from "../src/components/api";
import dayjs from "dayjs";
import Header from "../src/components/modules/header/searchDropdown";
import BookmarkForm from "../src/components/forms/bookmarkForm";
import Bookmarks from "../src/components/information/bookmarks_view.js";
// import Month from '../components/Management/Month'

import CreateEventModal from "../src/components/event/createEventModal";

import Feed from "../src/components/dashboard/queue";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../src/store/slices/eventsSlice";

// const Websocket = dynamic(()=> import('../components/modules/websocket'),{srr:false})

const tab = ({ eventsData, bookmarks }) => {
  const [showBookmark, setShowBookmark] = useState(false);
  const events = useSelector((state) => state.events);

  const dispatch = useDispatch();
  console.log(events);
  // let currentTime = dayjs().format("MM:D")
  let currentTime = dayjs().day();
  useEffect(() => {
    dispatch(setEvents(eventsData));
  }, []);

  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  // setInterval(() => {
  //     setTime(dayjs().add(1, 'second').format('HH:mm:ss'))
  // }, 1000);
  // UseEffect causing it to re-render everything

  return (
    <div className="grid grid-rows-2">
      <div>
        <Header></Header>
        <div>
          <div className=" text-xl font-bold mx-4 mt-4 xl:block">{time}</div>
          <CreateEventModal></CreateEventModal>
        </div>
        <div className="grid grid-cols-12">
          <Week
            data={events.filter((event) => {
              return event.tags.includes("Timeline");
            })}
          ></Week>
          <Feed events={events}></Feed>
        </div>
      </div>
      {/* <Month></Month> */}
      <div>
        <button
          className="cool-button ml-2"
          onClick={() => {
            setShowBookmark(!showBookmark);
          }}
        >
          Add Bookmark
        </button>
        {showBookmark ? <BookmarkForm></BookmarkForm> : ""}
        
        <Bookmarks bookmarks={bookmarks}></Bookmarks>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const eventsData = await fetchEvents();
  const bookmarks = await fetchBookmarks();
  // const data = await fetch('http://127.0.0.1:8000/api/stats/'
  // ).then((response) => response.json());
  return {
    props: { eventsData, bookmarks }, // will be passed to the page component as props
  };
}

export default tab;
