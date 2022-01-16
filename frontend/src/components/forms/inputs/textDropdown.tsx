

import { Fragment, useState,useRef, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

const people = [
    { id: 1, name: 'Button' },
    { id: 2, name: 'Checkbox' },
    { id: 3, name: 'Color' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Datetime-local' },
    { id: 6, name: 'Email' },
    { id: 7, name: 'File' },
    { id: 8, name: 'Range' },
    { id: 9, name: 'Text' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [text, setText] = useState("")
    const [options,setOptions] = useState(people)

    let textInput = useRef(null)


    function handleText(e) {
        setText(e.target.value)
        let test = people.filter(item=>{
            return item.name.substr(0,e.target.value.length)==e.target.value
        })
        
        setOptions(test)
        console.log(test)
    }

    return (
        <div >
            <input
            onFocus={()=>{setShowDropdown(!showDropdown)}}
            onBlur={()=>{setTimeout(()=>{
                setShowDropdown(false)
            })}}
            ref={textInput}
            value={text} 
            onChange={handleText}
            type="text"
            className="border rounded-lg p-2 pl-3 focus:outline-none" />
            <button type="button" onClick={()=>{
                textInput.current.focus();
                console.log(textInput)
                }}>Focus Text</button>
            {showDropdown ?
                <div className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {options.map((person) => (
                        <div
                            key={person.id}
                            className={"cursor-default select-none relative py-2 pl-3 pr-9"}
                            // value={person}
                            onClick={() =>setText(person.name)}
                        >
                            {person.name}
                        </div>
                    ))}
                </div> :
                null
            }
        </div>
    )
}
