import React,{useState} from 'react'
import dayjs from 'dayjs'
import Modal from '../../event/eventModal'
import { deleteEvent } from '../../api'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const weekEvent = ({ event }) => {
    const [deleted,setDeleted] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const handleDelete = ()=>{
        deleteEvent(event)
        setOpenModal(false)
        setDeleted(true)
        
    }
    return (
        <div onClick={()=>{setOpenModal(true)}} className={classNames(
            'text-sm bg-blue-100 p-2 rounded-xl my-2',
            deleted
                ? 'invisible'
                : ''
        )}>
            <div className="font-semibold">{event.title}</div>
            <div className="bg-gray-50 mt-1 inline-block p-1 rounded">{dayjs(event.date).format("M/DD")}</div>
            <Modal handleDelete={handleDelete} event={event} openModal={openModal} setOpenModal={setOpenModal}></Modal>
        </div>
    )
}

export default weekEvent
