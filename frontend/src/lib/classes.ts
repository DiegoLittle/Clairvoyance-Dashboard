class Event {
    id: string
    created_at: string
    
}

class Project {
    id: string
    name: string
    tags: []
    description: string
    todos: []

    constructor(id,name,tags,description,todos){
        this.id = id
        this.name = name
        this.tags=tags
        this.description=description
        this.todos=todos

    }
}

export default {Event,Project}