import React from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDrag } from 'react-dnd'
import { deleteEvent } from '../../api'


const Note = ({ data,deleteNote }) => {
    const [editable, setEditable] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    let note = {
        title: "",
        text: ""
    }
    let arr = data.title.split(" ")

    const handleChange = (e) => {
        let newObj = { ...state }
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value
        })
        setState(newObj)
    }



    // I'm trying to limit the title of the note to a certain length so it doesnt spam but ends on a complete word rather than character
    if (arr.length > 10) {
        console.log("test")
        for (let step = 0; step < 10; step++) {
            note.title = note.title + " " + arr[step]
            // console.log(note.title)
        }
        note.title = note.title + "..."
        //   Remove the title from the text
        for (let step = 10; step < arr.length; step++) {
            note.text = note.text + " " + arr[step]
            // console.log(note.text)
        }
        note.text = note.text
    }
    else {
        note.title = data.title
        note.text = data.text
    }

    const [state, setState] = useState({
        title: note.title
    })

    const handleDelete = ()=>{
        // console.log(data)
        deleteEvent(data).then((e)=>{
            console.log(e)
            deleteNote(data)
        })
        
        
        setIsOpen(false)
    }
    return (
        <div className="border p-4 rounded my-2">
            <img src="icons/close.svg" onClick={() => { setIsOpen(true) }} className="cursor-pointer float-right w-4 h-4" />
            {editable ? <input onDoubleClick={() => { setEditable(false) }} autoComplete="off" name="title" onChange={handleChange} value={state.title}></input> : <div name="title" onDoubleClick={() => { setEditable(true) }} className="text-lg font-semibold">{note.title}</div>}

            <div className="text-sm font-normal">{note.text}</div>
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
                                        onClick={() => setIsOpen(false)}

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

export default Note
