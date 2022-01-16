import React from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


const eventModal = ({ openModal, setOpenModal, event,handleDelete }) => {
    const [deleteDialog,setDeleteDialog] = useState(false)
    const [state,setState] = useState(event)
    // const [isOpen, setIsOpen] = useState(openModal)
    const handleDeleteDialog = () => {
        setDeleteDialog(true)
        console.log(deleteDialog)
    }
    const handleChange = async (e) => {
        let newObj = { ...state }
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value,
            enumerable:true
        })
        setState(newObj)
        console.log(newObj)
    }
    const updateEvent = async (item) => {
        console.log(item)
        const res = await fetch('http://127.0.0.1:8000/api/events/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        })
        const data = await res.json()
    }

    return (
        <Transition appear show={openModal} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => { 
                    setOpenModal(false)
                 }}
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
                        {deleteDialog ?

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
                                            setTimeout(() => {
                                                setDeleteDialog(false)
                                            }, 200); }}

                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="mt-4">
                                </div>
                            </div>
                            :
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h1"
                                    className="inline text-xl font-medium leading-6 text-gray-900"
                                >
                                    {/* <input defaultValue={event.title}></input> */}
                                    <input autoComplete="off" name="title" onChange={handleChange} defaultValue={event.title} className="bg-gray-100 p-2 focus:outline-none rounded-xl"/>
                                </Dialog.Title>
                                <img src="icons/close.svg" onClick={handleDeleteDialog} className="inline cursor-pointer float-right w-4 h-4" />


                                <div>
                                    <span className="block">Created at: {event.created_at}</span>
                                    {/* <span>{event.text}</span> */}
                                    <textarea autoComplete="off" name="text" onChange={handleChange} defaultValue={state.text} className="bg-gray-100 p-2 focus:outline-none rounded-xl"/>
                                    {/* {JSON.stringify(event)} */}
                                </div>


                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => { 
                                            setOpenModal(false)
                                            updateEvent(state)
                                         }}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </div>

                        }


                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default eventModal
