import React from 'react'
import dayjs from 'dayjs'
import { getDayString } from '../util'


const Month = () => {
    let currentDate = dayjs().format("DD")
    let daysInMonth=dayjs().daysInMonth()
    let daysInMonthPrior=dayjs("2021-08-31").daysInMonth()
    let currentDay = getDayString(dayjs().day())

    // console.log(currentDate)
    // console.log(currentDay)
    // console.log(daysInMonth)
    
    // Calculate first weekday of month and then +7 if less than days in month
    //

    let firstWeek ={
        sunday:29,
        monday:30,
        tuesday:31,
        wednesday:1,
        thursday:2,
        friday:3,
        saturday:4
    }
    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-row">
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.sunday}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.monday}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.tuesday}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.wednesday}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.thursday}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.friday}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.saturday}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.sunday+7)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.monday+7)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.tuesday+7)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.wednesday+7}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.thursday+7}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.friday+7}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.saturday+7}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.sunday+14)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.monday+14)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.tuesday+14)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.wednesday+14}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.thursday+14}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.friday+14}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.saturday+14}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.sunday+21)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.monday+21)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.tuesday+21)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.wednesday+21}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.thursday+21}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{firstWeek.friday+21}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{currentDate==firstWeek.saturday+21?
                    <div className="bg-blue-200 rounded-xl p-1 text-sm">{currentDate}</div>:
                    <div>{firstWeek.saturday+21}</div>
                    }</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.sunday+28)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.monday+28)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{(firstWeek.tuesday+28)%daysInMonthPrior}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.wednesday+28}</div>
                </div>
                <div className="border h-24 w-24">
                <div className="float-right p-2">{firstWeek.thursday+28}</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.friday+28) %daysInMonth }</div>
                </div>
                <div className="border h-24 w-24">
                    <div className="float-right p-2">{(firstWeek.saturday+28) %daysInMonth }</div>
                </div>
            </div>
        </div>
    )
}

export default Month
