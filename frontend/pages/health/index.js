import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import Check from '../../src/components/event/health/subjectiveCheckIn'
import { fetchEvents } from '../../src/components/api'
import Log from '../../src/components/event/baseLog'
import dayjs from 'dayjs'
import MedLog from '../../src/components/event/log-forms/medLog'
import PharmaLog from '../../src/components/forms/pharmaLog'
// import Foodlogger from '../../components/health/foodLogger'

// https://www.ibsdiets.org/fodmap-diet/fodmap-food-list/
let score = 50

let prebiotics = ["Leek", "Asparagus", "Banana", "Chicory", "Oats", "Wheat",]

let today = {
    day: "Saturday",
    diet: {
        breakfast: "Bagel & Cream Cheese",
        lunch: "Sandwich",
        dinner: "Dinner"
    },
    exercise: {
        strength: "Weight Lifting",
        mobility: "Yoga/PT"
    },
    sleep: {
        time: "8hrs"
    }
}
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const health = ({ events }) => {

    let healthLogs = events.filter((event) => {
        return event.type == 'log.health'
    })
    let todaysMedLog = events.filter((event) => {
        return ((event.type == 'log.health.medication') && (dayjs(event.created_at).format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")))
    })[0]
    let todaysDietLog = events.filter((event) => {
        return ((event.type == 'log.health.diet') && (dayjs(event.created_at).format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")))
    })[0]

    console.log(todaysMedLog)
    const [currentMedLog,setCurrentMedLog] = useState(todaysMedLog)
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div>
            <div className="m-4">
                <Tab.Group >
                    <Tab.List className="">
                        <Tab className={({ selected }) => classNames(
                            'p-2 mx-2',
                            selected
                                ? 'bg-blue-100 rounded-xl'
                                : 'text-black'
                        )}>Diet</Tab>
                        <Tab className={({ selected }) => classNames(
                            'p-2 mx-2',
                            selected
                                ? 'bg-blue-100 rounded-xl'
                                : 'text-black'
                        )}>Medication</Tab>
                        <Tab className={({ selected }) => classNames(
                            'p-2 mx-2',
                            selected
                                ? 'bg-blue-100 rounded-xl'
                                : 'text-black'
                        )}>Fitness</Tab>
                    </Tab.List>
                    <Tab.Panels className="">
                        <Tab.Panel>
                            <Log title="Food Log" type="log.health.diet">
                                <label htmlFor="Food" className="block text-sm font-medium text-gray-700">
                                    Food
                                </label>
                                <input className="p-2 bg-gray-100 rounded-xl focus:outline-none" type="text" name="food" />
                            </Log>
                        </Tab.Panel>
                        <Tab.Panel>
                            <PharmaLog ></PharmaLog>
                        </Tab.Panel>
                        <Tab.Panel>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                {/* <div className="ml-10 flex">
                Vitality Score: {score}
            </div> */}
                <div className="float-right">
                    <h1 className="text-center mb-4">Check In</h1>
                    <button className="cool-button mr-4">Objective</button>
                    <button className="cool-button" onClick={() => { setIsOpen(true) }}>Subjective</button>
                </div>
                <div className="w-1/4 mx-4">
                    <h1 className="text-center">Status</h1>
                    <div>Last Subjective</div>
                    {healthLogs[healthLogs.length - 1] != undefined ?
                        <div>
                            <div>Motivation: {healthLogs[healthLogs.length - 1].data.motivation}</div>
                            <div>
                                Physical: {healthLogs[healthLogs.length - 1].data.physical}
                            </div>
                        </div>
                        :
                        <div>
                            Error:
                            No Recent Health Log
                        </div>
                    }
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={() => { setIsOpen(false) }}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-md font-medium leading-6 text-gray-900"
                                    >


                                    </Dialog.Title>



                                    <div className="mt-4">
                                        <Check showModal={setIsOpen}></Check>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>

            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const events = await fetchEvents()
    // const data = await fetch('http://127.0.0.1:8000/api/events/'
    // ).then((response) => response.json());
    return {
        props: { events }, // will be passed to the page component as props
    }
}

export default health




