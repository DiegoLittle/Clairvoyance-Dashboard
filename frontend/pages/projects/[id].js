import React, { useEffect, useState } from 'react'
// import BreadCrumb from '../../components/project/breadcrumb'
import { PlusIcon } from '@heroicons/react/solid'
import Todo from '../../src/components/project/todo'
import CreateTodo from '../../src/components/project/create_todo'
import Bookmarks from '../../src/components/project/information/bookmarks'
// import { getBuckets } from '../../src/lib/storage/minio_client'
import Tabs from '../../src/components/modules/tabs'
import { Tab } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'


const Project = ({ data }) => {
    // setProjectState(data)
    // const project = 
    // My main concern with creating a global project state is that what if you had 2 projects open
    // Could implement a reducer that takes in project state and updates the specific element in array
    // Selector 
    const [project, setProject] = useState(data)
    const [creatingTodo, setCreatingTodo] = useState(false)

    

    function TodosList() {
        let todos = project.todos.filter(todo => {
            return todo.completed != true
        })
        return (
            todos.map(todo =>
                <Todo setProject={setProject} project={project} item={todo} key={todo.id}></Todo>
            )
        )
    }
    // console.log()

    return (
        <div className="ml-8">

            <h1 className="mt-8 text-2xl font-bold">{project.name}</h1>
            <div className="mt-4 font-light text-base">{project.description}</div>
            <Tab.Group>
                <Tab.List>
                    <Tab className="project-tab">Work</Tab>
                    <Tab className="project-tab">Scope</Tab>
                    <Tab className="project-tab" >Information</Tab>
                </Tab.List>
                <Tab.Panels>
                    {/* Work Tab */}
                    <Tab.Panel>
                        <div className="">
                            <div className="list">
                                <TodosList></TodosList>
                                <div className="my-4">
                                    {creatingTodo ?
                                        <CreateTodo show={setCreatingTodo} setProject={setProject} data={project}></CreateTodo> :
                                        <button
                                            type="button"
                                            onClick={() => { setCreatingTodo(true) }}
                                            className="inline-flex py-2 px-5 text-sm rounded-xl items-center bg-blue-100 text-gray-700 hover:bg-blue-200 font-medium shadow focus:outline-none hover:text-black"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-blue-500" aria-hidden="true" />
                                            New Todo
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                    {/* Scope Tab */}
                    <Tab.Panel>
                        <div className="my-4">
                            <div className="text-lg font-semibold">
                                Milestones
                            </div>
                        </div>
                    </Tab.Panel>
                    {/* Project Information Tab */}
                    <Tab.Panel>
                        <div className="my-4">
                            <div className="text-lg font-semibold">
                                Bookmarks
                            </div>
                            <Bookmarks setProject={setProject} project={project}></Bookmarks>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>


            {/* <BreadCrumb></BreadCrumb> */}
        </div>
    )
}

export default Project

export async function getServerSideProps(context) {
    let params = context.params.id
    const res = await fetch(`http://127.0.0.1:8000/api/projects/${context.params.id}`);
    const data = await res.json()

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data,
        }, // will be passed to the page component as props
    }
}

