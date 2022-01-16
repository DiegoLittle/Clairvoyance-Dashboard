import React,{useState} from 'react'
import { Dialog, Transition} from '@headlessui/react'
import CreateEvent from '../Management/createEvent'

const createEventModal = () => {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className="container">
                <button
                    className="cool-button"
                    onClick={() => {
                        setIsOpen(true)
                        }}>Add an Event</button>
            </div>
            <Transition appear show={isOpen}>
                <Dialog
                    as="div"
                    className="modal-dialog"
                    onClose={() => { setIsOpen(false) }}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
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
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >


                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h1"
                                    className="inline text-xl font-medium leading-6 text-gray-900"
                                >

                                </Dialog.Title>
                                <img
                                 onClick={() => { setIsOpen(false) }} 
                                src="icons/close.svg" className="inline cursor-pointer float-right w-4 h-4" />
                                <CreateEvent setIsOpen={setIsOpen}></CreateEvent>

                            </div>




                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default createEventModal
