from fastapi import APIRouter
from model import Project
from fastapi import HTTPException


router = APIRouter()

from database import (
    insert_project,
    find_project,
    find_all_projects,
    delete_project,
    update_project,
)

@router.get("/api/projects/{id}")
async def get_project(id):
    response = await find_project(id)
    return response

@router.get("/api/projects/")
async def get_all_projects():
    response = await find_all_projects()
    return response

@router.post("/api/projects/",response_model=Project)
async def create_project(project:Project):
    response = await insert_project(project.dict())
    print(response.acknowledged)
    if (response.acknowledged):
        return project.dict()
    raise HTTPException(404,"Error Creating Project")

@router.delete("/api/projects/", response_model=Project)
async def del_project(project:Project):
    # 
    dict = project.dict()
    print(dict)
    response = await delete_project(dict)
    if response:
        return dict
    else:
         return "Error"

@router.put("/api/projects/", response_model=Project)
async def put_project(project:Project):
    print(project)
    response = await update_project(project.dict())
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title")

@router.delete("/api/projects/bookmarks", response_model=Project)
async def del_project(project:Project):
    # 
    dict = project.dict()
    print(dict)
    response = await delete_project(dict)
    if response:
        return dict
    else:
         return "Error"


# @router.put("/api/projects/information/{id}")
# as