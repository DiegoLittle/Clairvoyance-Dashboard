import { createSlice } from '@reduxjs/toolkit'

export const directorySlice = createSlice({
  name: 'directory',
  initialState: {
      cwd:"./",
      documents:[]
  },
  reducers: {
      setDirectory: (state,action)=>{
          state.documents=action.payload.documents
          state.cwd = action.payload.cwd
      }
  }
})

// Action creators are generated for each case reducer function
export const { setDirectory} = directorySlice.actions

export default directorySlice.reducer