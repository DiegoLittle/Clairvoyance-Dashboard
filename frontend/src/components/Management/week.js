import React from 'react'
import styles from './week.module.css'
import dayjs from 'dayjs'
import Day from '../time-track/day'
import { getDayString } from '../../lib/util'
import Event from './eventViews/weekEvent'

const week = ({data}) => {
    let currentDate=dayjs().format()
    console.log(data)

    

    let currentDay=getDayString(dayjs().day())
    let monday = []
    let tuesday = []
    let wednesday =[]
    let thursday = []
    let friday = []
    let saturday = []
    let sunday = []
    // console.log(data + "THIS CODE IS BEING RAN OVER AND OVER AGAIN") 
    data.forEach(event => {
    switch (dayjs(event.date).day()) {
        case 0:
            sunday.push(event);
            break;
        case 1:
            monday.push(event);
            break;
        case 2:
            tuesday.push(event);
            break;
        case 3:
            wednesday.push(event);
            break;
        case 4:
            thursday.push(event);
            break;
        case 5:
            friday.push(event);
            break;
        case 6:
            saturday.push(event);
            break;
        default:
            break;
    }
        
    });

    return (
        <div className="grid col-span-9 grid-cols-7 m-2 p-2">
            <div className={styles.dayCol}>
                <div className={styles.day}>
                {currentDay=="Sunday"?
                    <div className="text-blue-600">Sunday {dayjs().format("M/DD")}</div>
                    :<div>Sunday</div>}
                </div>
                <div>{sunday.map(event=>
                <Event event={event} key={event.id}></Event>
                    
                    )}
                </div>
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                {currentDay=="Monday"?
                    <div className="text-blue-600">Monday {dayjs().format("M/DD")}</div>
                    :<div>Monday</div>}
                    </div>
                <div>{monday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}
                </div>
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                {currentDay=="Tuesday"?
                    <div className="text-blue-600">Tuesday {dayjs().format("M/DD")}</div>
                    :<div>Tuesday</div>}
                </div>
                <div>{tuesday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}</div>
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                {currentDay=="Wednesday"?
                    <div className="text-blue-600">Wednesday {dayjs().format("M/DD")}</div>
                    :<div>Wednesday</div>}
                </div>
                <div>{wednesday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}</div>
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                {currentDay=="Thursday"?
                    <div className="text-blue-600">Thursday {dayjs().format("M/DD")}</div>
                    :<div>Thursday</div>}
                    </div>
                <div>{thursday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}</div>
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                    {currentDay=="Friday"?
                    <div className="text-blue-600">Friday {dayjs().format("M/DD")}</div>
                    :<div>Friday</div>}
                </div>
                <div>{friday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}</div>
                {/* <Day></Day> */}
            </div>
            <div className={styles.dayCol}>
                <div className={styles.day}>
                    {currentDay=="Saturday"?
                    <div className="text-blue-600">Saturday {dayjs().format("M/DD")}</div>
                    :<div>Saturday</div>}
                </div>
                <div>{saturday.map(event=>
                <Event event={event} key={event.id}></Event>
                )}</div>
                {/* <Day data={saturday}></Day> */}
            </div>
        </div>
    )
}

export default week

