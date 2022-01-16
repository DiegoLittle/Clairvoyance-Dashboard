import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
    name:'note',
    initialState:{
        filename:"",
        contents:""
    },
    reducers: {
        setNote: (state, action) => {
            state.filename = action.payload.filename
            state.contents = action.payload.contents
          },
        setNoteContents: (state,action) =>{
            state.contents = action.payload
        }
    }
})

export const { setNote,setNoteContents } = noteSlice.actions

export default noteSlice.reducer