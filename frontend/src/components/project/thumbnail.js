import React, { useState,Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { deleteProject } from '../api'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {setProjects} from '../../store/slices/projectsSlice'



const thumbnail = ({ item, projectsList }) => {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const projects = useSelector(state=>state.projects)
    // const [projects, setProjects] = useState(projectsList)



    const router = useRouter()

    function handleDelete() {
        setOpenModal(false)
        deleteProject(item)
        
        let arr = projects.filter((project) => {
            return project.id != item.id
        })

        dispatch(setProjects(arr))
        
        
    }
    function toProject() {
        router.push(`projects/${item.id}`)
    }
    return (
        <div className="w-1/4 m-4 p-4 shadow-lg ring ring-blue-200 rounded-lg text-center bg-gradient-to-br from-themeBlue-100 to-themeBlue-200 hover:to-themeBlue-300">
            <div onClick={toProject} className="text-gray-800 font-semibold text-lg cursor-pointer">{item.name}</div>
            <div className="text-sm text-gray-700 my-4">{item.description}</div>
            {item.tags.map(tag =>
                <div className="inline-block mx-2 border border-blue-500 rounded text-sm p-1">{tag}</div>
            )}
            <button className="hover:bg-red-200 rounded-lg p-1" onClick={()=>setOpenModal(true)}>Delete</button>
            <Transition appear show={openModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => { setOpenModal(false) }}
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
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Delete Note
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this note? All of your data will be permanently removed
                                            from our servers forever. This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                setOpenModal(false);
                                            }}

                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    <div className="mt-4">
                                    </div>
                                </div>
                                


                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default thumbnail
