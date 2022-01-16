import { useState,useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { postEvent } from '../api'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import TextDropdown from './inputs/textDropdownListbox'



const dynamicForm = () => {
    // I don't want to have to build a new form every single time
    // Essentially forms act as classes to create objects
    // Refrences, attributes
    const onSubmit = async (values) => {
        window.alert(JSON.stringify(values))
    };
    useEffect(()=>{
        
    })

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit,form }) => (
                <form className="grid" onSubmit={()=>{
                    handleSubmit().then(form.reset)
                }}>
                    <TextDropdown></TextDropdown>
                    {/* <h2>Simple Default Input</h2> */}
                    {/* <button type="button" onClick={()=>{console.log("time")}} className="cool-button">+</button> */}
                    {/* <Field className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none" name="time" component="input" placeholder="" /> */}
                    {/* <button type="submit" className="cool-button">Submit</button> */}
                </form>
            )}
        />

    )
}

export default dynamicForm;
