import React from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'



const todo = ({ item,project,setProject}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState(item)

    const deleteTodo = async (item) => {
        setIsOpen(false)
        let newObj = { ...project }
        newObj.todos = newObj.todos.filter(todo => {
            return todo.text != state.text
        })
        setProject(newObj)
        const res = await fetch('http://127.0.0.1:8000/api/projects/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
        const data = await res.json()
    }
    const updateTodo = async (item) => {
        let newObj = { ...project }
        let itemIndex = newObj.todos.findIndex(todo => {
            return todo.id == item.id
        })
        newObj.todos[itemIndex] = item
        setProject(newObj)
        const res = await fetch('http://127.0.0.1:8000/api/projects/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
        const data = await res.json()
    }
    function closeModal() {
        updateTodo(state)
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function completeTodo(){
        let newObj = { ...state }
        newObj.completed = true
        setState(newObj)
        updateTodo(newObj)
        setIsOpen(false)
        
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

    return (
        <div className="my-4">
            
            <div>
                {/* <div className="fixed inset-0 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={openModal}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        Open dialog
                    </button>
                </div> */}
                <div tabIndex="-1" onClick={openModal} className="text-center cursor-pointer p-2  rounded-xl w-1/6">{item.text}</div>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
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
                                        <input autoComplete="off" name="text" onChange={handleChange} defaultValue={item.text} className="bg-gray-100 p-2 focus:outline-none rounded-xl"/>
                                        
                                        <button onClick={deleteTodo} className="float-right">Delete</button>
                                        <button onClick={completeTodo} className="mr-3  mt-1 float-right focus:outline-none"><img src="../icons/check.svg" className="h-4 w-4 ml-1 focus:outline-none"></img></button>

                                    </Dialog.Title>
                                    <textarea autoComplete="off" name="description" onChange={handleChange} defaultValue={item.description} className="mt-2 bg-gray-100 p-2 focus:outline-none rounded-xl text-xs w-3/4">
                                    </textarea>
    

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
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

export default todo

