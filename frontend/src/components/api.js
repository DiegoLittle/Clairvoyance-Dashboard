

async function postEvent(event){
    const res = await fetch(("http://127.0.0.1:8000/api/events/"),{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(event)
    })
    const data = await res.json()
    return data
    // return "Test";
}

async function deleteEvent(event){
    const res = await fetch('http://127.0.0.1:8000/api/events/',{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(event)
    })
    const data = await res.json()
    return data
    // return "Test";
}

const fetchEvents = async () =>{
    const res = await fetch("http://127.0.0.1:8000/api/events/");
    const data = await res.json()
    // console.log(data)
    return data
}
const fetchBookmarks = async () =>{
    const res = await fetch("http://127.0.0.1:8000/api/bookmarks");
    const data = await res.json()
    return data
}

async function updateEvent(event){
    const res = await fetch('http://127.0.0.1:8000/api/events/',{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(event)
    })
    const data = await res.json()
    return data
    // return "Test";
}

async function postProject(project){
    const res = await fetch('http://127.0.0.1:8000/api/projects/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(project)
    })
    const data = await res.json()
    return data
    // return "Test";
}
async function deleteProject(project){
    const res = await fetch('http://127.0.0.1:8000/api/projects/',{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(project)
    })
    const data = await res.json()
    return data
    // return "Test";
}

const fetchProject = async (slug) =>{
    const res = await fetch(`http://127.0.0.1:8000/api/projects/${slug}`);
    const data = await res.json()
    return data
}
async function updateProject(project){
    const res = await fetch(`http://127.0.0.1:8000/api/projects/`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(project)
    })
    const data = await res.json()
    return data
    // return "Test";
}

export {postEvent,
    fetchBookmarks,
    fetchEvents,
    deleteEvent,
    updateEvent,
    postProject,
    deleteProject,fetchProject,updateProject};