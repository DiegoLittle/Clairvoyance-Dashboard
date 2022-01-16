import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import Link from 'next/link'
import { postProject } from '../../src/components/api'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {addProject} from '../../src/store/slices/projectsSlice'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const create = () => {
    const projects = useSelector(state=>state.projects)
    const dispatch = useDispatch()
    const router = useRouter()
    const [project, setProject] = useState({ id:uuidv4(),name: "", description: "", tags: [],todos:[] })

    const handleSubmit = (e) => {
        
        postProject(project)

        e.preventDefault()
        router.push("/projects")
        dispatch(addProject(project))

    }
    const handleChange = (e) => {
        if (e.target.name == "tags") {
            let arr = e.target.value.split(" ")
            let obj = Object.defineProperty(project, e.target.name, {
                value: arr
            })
            setProject(obj)
        }
        else {
            let obj = Object.defineProperty(project, e.target.name, {
                value: e.target.value
            })
            setProject(obj)
        }

    }

    return (
        <div>
            <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-lg leading-6 font-medium text-gray-900">Project Settings</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Let’s get started by filling in the information below to create your new project.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Project Name
                            </label>
                            <div className="mt-1">
                                <input
                                    autoComplete="off"
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    onChange={handleChange}
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1"
                                    defaultValue={''}
                                />
                            </div>
                        </div>





                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <input
                                autoComplete="off"
                                onChange={handleChange}
                                type="text"
                                name="tags"
                                id="tags"
                                className="mt-1 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link href="/projects">
                                <a
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </a>
                            </Link>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create this project
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default create
