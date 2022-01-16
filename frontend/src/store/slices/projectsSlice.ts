import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
      addProject: (state,action)=>{
        state.push(action.payload)
        return state
      },
      setProjects: (state,action)=>{
        console.log(action.payload)
          state = action.payload
          return state
      }
      
  }
})

// Action creators are generated for each case reducer function
export const { addProject,setProjects} = projectsSlice.actions

export default projectsSlice.reducer